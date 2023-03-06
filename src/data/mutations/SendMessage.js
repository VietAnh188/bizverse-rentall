// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { SendMessageType } from '../types/ThreadItemsType';
// Sequelize models
import { ThreadItems, Threads, User, Reservation, UserProfile, Listing, ReservationPreApproved } from '../../data/models';
import { sendNotifications } from '../../helpers/sendNotifications';
import { sendServerEmail } from '../../core/email/sendServerEmail';
import moment from 'moment';
import { updateReservation } from '../../core/reservation/updateReservation';
import { getNFTInformationFromReservation } from '../../core/NFT/getNFTInformationFromReservation';
import { mintAndSaveNFT } from '../../core/NFT/mintAndSaveNFT';
import checkUserAuthentication from '../../core/auth/checkUserAuthentication'
import getLocaleMessage from '../../helpers/message/getLocaleMessage';
const sendMessage = {
  type: SendMessageType,
  args: {
    threadId: { type: new NonNull(IntType) },
    threadType: { type: StringType },
    content: { type: StringType },
    type: { type: StringType },
    startDate: { type: StringType },
    endDate: { type: StringType },
    personCapacity: { type: IntType },
    reservationId: { type: IntType },
  },
  async resolve({ request, response }, {
    threadId,
    threadType,
    content,
    type,
    startDate,
    endDate,
    personCapacity,
    reservationId
  }) {
    try {
      // authentication request
      const { status: authStatus, errorMessage: authErrorMessage } = await checkUserAuthentication(request);
      if(authStatus !==200 ){
        return {
          status: authStatus,
          errorMessage: authErrorMessage
        }
      }
      // check host of reservation;
      if(reservationId){
        const _reservation = await Reservation.findOne({
          where: {
              id: reservationId,
              hostId: request.user.id
          },
          raw: true
        });
        if(!_reservation){
          return {
            status: 400,
            errorMessage: await getLocaleMessage({ messageId: "error.notHostOfReservation", locale: request.language })
          }
        }
      }

      // Create NFT for reservation
      let canContinue = true;

      if (type === 'approved') {
        const { success, data: nftData } = await getNFTInformationFromReservation(reservationId)

        if (!success) {
          return {
            status: 500,
            errorMessage: await getLocaleMessage({ messageId: "error.createNFTForReservationFail", locale: request.language })
          }
        } else {
          const { status: mintNFTStatus } = await mintAndSaveNFT({ payload: nftData, isMintByReservation: true })

          canContinue = mintNFTStatus === 200
        }
      }

      if (!canContinue) {
        return {
          status: 400,
          errorMessage: await getLocaleMessage({ messageId: "error.createNFTForReservationFail", locale: request.language })
        }
      }

      // Update reservation state and send email, notification
      const userId = request.user.id;
      let notifyUserId, guestId, hostId, notifyUserType;
      let userName, listId, emailContent;
      const convertedStartDate = moment(startDate).format('YYYY-MM-DD');
      const convertedEndDate = moment(endDate).format('YYYY-MM-DD');

      // Create a thread item
      const threadItems = await ThreadItems.create({
        threadId,
        sentBy: userId,
        content,
        type,
        startDate: convertedStartDate,
        endDate: convertedEndDate,
        personCapacity,
        reservationId
      });

      // Change thread to unread
      Threads.update({
        isRead: false,
        messageUpdatedDate: new Date()
      },
        {
          where: {
            id: threadId
          }
        }
      );

      const getThread = await Threads.findOne({
        attributes: ['host', 'guest', 'listId'],
        where: {
          id: threadId
        },
        raw: true
      });

      if (getThread?.host && getThread?.guest && getThread?.listId) {
        if (getThread.host === userId) {
          notifyUserId = getThread.guest;
          notifyUserType = 'guest';
          guestId = getThread.guest;
          hostId = getThread.host;
        } else {
          notifyUserId = getThread.host;
          notifyUserType = 'host';
          guestId = getThread.host;
          hostId = getThread.guest;
        }
        listId = getThread.listId;
      }

      const [ hostProfile, guestProfile ] = await Promise.all([
        UserProfile.findOne({
          attributes: ['displayName', 'picture', 'profileId', 'firstName'],
          where: {
            userId: getThread.host
          },
          raw: true
        }),
        UserProfile.findOne({
          attributes: ['displayName', 'picture', 'profileId', 'firstName'],
          where: {
            userId: getThread.guest
          },
          raw: true
        })
      ])

      if (hostProfile && guestProfile && getThread) {
        userName = getThread.host === userId ? (hostProfile && hostProfile.firstName) : (guestProfile && guestProfile.firstName);
      }

      let messageType = 'newMessage';

      let notifyContent = {
        "screenType": "message",
        "title": "New Message",
        "userType": notifyUserType.toString(),
        "threadId": threadId.toString(),
        "guestId": guestId.toString(),
        "guestName": guestProfile && ((guestProfile.firstName).toString()),
        "guestPicture": (guestProfile && guestProfile.picture) ? ((guestProfile.picture).toString()) : '',
        "hostId": hostId.toString(),
        "hostName": hostProfile && ((hostProfile.firstName).toString()),
        "hostPicture": (hostProfile && hostProfile.picture) ? ((hostProfile.picture).toString()) : '',
        "guestProfileId": guestProfile && ((guestProfile.profileId).toString()),
        "hostProfileId": hostProfile && ((hostProfile.profileId).toString()),
        "listId": listId.toString(),
        "userName": userName,
        "content": content
      };

      if (type == 'preApproved') {
        messageType = 'newBooking';
        notifyContent = {
          "screenType": "message",
          "title": "New Booking",
          "userType": "guest",
          "threadId": threadId.toString(),
          "guestId": guestId.toString(),
          "guestName": guestProfile && ((guestProfile.firstName).toString()),
          "guestPicture": (guestProfile && guestProfile.picture) ? ((guestProfile.picture).toString()) : '',
          "hostId": hostId.toString(),
          "hostName": hostProfile && ((hostProfile.firstName).toString()),
          "hostPicture": (hostProfile && hostProfile.picture) ? ((hostProfile.picture).toString()) : '',
          "guestProfileId": guestProfile && ((guestProfile.profileId).toString()),
          "hostProfileId": hostProfile && ((hostProfile.profileId).toString()),
          "listId": listId.toString(),
          "userName": userName,
        };

        const listData = await Listing.findOne({
          attributes: ['id', 'title'],
          where: {
            id: listId
          },
          raw: true
        });

        // Email template - Pre-Approve
        emailContent = {
          guestName: guestProfile && guestProfile.firstName,
          hostName: hostProfile && hostProfile.firstName,
          listTitle: listData && listData.title,
          threadId,
        };

        sendServerEmail(getThread.guest, 'bookingPreApproval', emailContent);
        const threadItems = await ThreadItems.findAll({
          where: { 
            threadId: threadId,
            type: 'inquiry'
          },
          limit: 1,
          order: [['createdAt', 'DESC']]
        });
        
        if (threadItems[0]) {
          const threadItemsDetail = threadItems[0].dataValues;
          await ReservationPreApproved.update({
            status: 'completed',
          },{
            where: {
              listId: listId,
              hostId: hostId.toString(),
              guestId: guestId.toString(),
              status: 'pending',
              checkIn: new Date(threadItemsDetail.startDate).toISOString().split('T')[0], 
              checkOut: new Date(threadItemsDetail.endDate).toISOString().split('T')[0]
            }
          })
        } else {
          return {
            status: "Request pre-approved not found!"
          }
        }
      }

      if (type !== 'approved' && type !== 'declined') {
        sendNotifications(messageType, notifyContent, notifyUserId);
      }

      if (type === 'message') { // Send Message - Email template
        emailContent = {
          receiverName: (notifyUserType === 'guest' ? (guestProfile && guestProfile.firstName) : (hostProfile && hostProfile.firstName)),
          senderName: (notifyUserType === 'guest' ? (hostProfile && hostProfile.firstName) : (guestProfile && guestProfile.firstName)),
          receiverType: notifyUserType,
          type: notifyUserType,
          message: content,
          threadId
        };

        sendServerEmail(notifyUserId, 'message', emailContent);
      }

      if (reservationId) {
        updateReservation({ userId, reservationId, threadId, threadType, reservationState: type })
      }

      return {
        status: 200,
        threadItems
      }
    } catch (error) {
      return {
          status: 400,
          errorMessage: error.message
      }
  }
    
  },
};
export default sendMessage;
