// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ThreadItemsType from '../types/ThreadItemsType';

// Sequelize models
import { Threads, ThreadItems, UserProfile, ReservationPreApproved } from '../../data/models';
import { sendNotifications } from '../../helpers/sendNotifications';
import { sendServerEmail } from '../../core/email/sendServerEmail';
import moment from 'moment';

const CreateThreadItems = {

  type: ThreadItemsType,

  args: {
    listId: { type: new NonNull(IntType) },
    host: { type: new NonNull(StringType) },
    content: { type: new NonNull(StringType) },
    type: { type: StringType },
    startDate: { type: StringType },
    endDate: { type: StringType },
    personCapacity: { type: IntType },
  },

  async resolve({ request, response }, {
    listId,
    host,
    content,
    type,
    startDate,
    endDate,
    personCapacity
  }) {

    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;

      let notifyUserId, notifyGuestId, notifyHostId, notifyUserType;
      let userName, emailContent;
      let convertedStartDate, convertedEndDate;
      convertedStartDate = moment(startDate).format('YYYY-MM-DD');
      convertedEndDate = moment(endDate).format('YYYY-MM-DD');
      // Check if a thread is already there or create a new one
      const thread = await Threads.findOrCreate({
        where: {
          listId,
          host,
          guest: userId,
        },
        defaults: {
          //properties you want on create
          listId,
          host,
          guest: userId,
          messageUpdatedDate: new Date(),
          isRead: false
        }
      });

      if (thread) {
        // Create a thread item
        const threadItems = await ThreadItems.create({
          threadId: thread[0].dataValues.id,
          sentBy: userId,
          content,
          type,
          startDate: convertedStartDate,
          endDate: convertedEndDate,
          personCapacity
        });

        if (threadItems) {
          const updateThreads = await Threads.update({
            isRead: false,
            messageUpdatedDate: new Date()
          },
            {
              where: {
                id: thread[0].dataValues.id
              }
            }
          );

          const getThread = await Threads.findOne({
            attributes: ['host', 'guest'],
            where: {
              id: thread[0].dataValues.id
            },
            raw: true
          });

          if (getThread && getThread.host && getThread.guest) {
            notifyUserId = getThread.host === userId ? getThread.guest : getThread.host;
            notifyUserType = getThread.host === userId ? 'guest' : 'host';
            notifyGuestId = getThread.host === userId ? getThread.guest : getThread.host;
            notifyHostId = getThread.host === userId ? getThread.host : getThread.guest;
          }

          const guestProfile = await UserProfile.findOne({
            attributes: ['displayName', 'firstName', 'picture', 'profileId'],
            where: {
              userId
            }
          });

          const hostProfile = await UserProfile.findOne({
            attributes: ['displayName', 'firstName', 'picture', 'profileId'],
            where: {
              userId: host
            }
          });

          if (guestProfile) {
            userName = guestProfile.firstName ? guestProfile.firstName : guestProfile.displayName;
          }

          let notifyContent = {
            "screenType": "message",
            "title": "New Inquiry",
            "userType": notifyUserType.toString(),
            "threadId": (thread[0].dataValues.id).toString(),
            "guestId": notifyGuestId.toString(),
            "guestName": guestProfile && ((guestProfile.firstName).toString()),
            "guestPicture": (guestProfile && guestProfile.picture) ? ((guestProfile.picture).toString()) : '',
            "hostId": notifyHostId.toString(),
            "hostName": hostProfile && ((hostProfile.firstName).toString()),
            "hostPicture": (hostProfile && hostProfile.picture) ? ((hostProfile.picture).toString()) : '',
            "guestProfileId": guestProfile && ((guestProfile.profileId).toString()),
            "hostProfileId": hostProfile && ((hostProfile.profileId).toString()),
            "listId": listId.toString(),
            "userName": userName,
            "content": content
          };

          sendNotifications('newEnquiry', notifyContent, notifyUserId);

          // Email to the host for inquiry
          emailContent = {
            receiverName: hostProfile && ((hostProfile.firstName).toString()),
            senderName: userName,
            type: 'host',
            message: content,
            threadId: thread && thread[0] && thread[0].dataValues && thread[0].dataValues.id,
            checkIn: startDate,
            checkOut: endDate,
            personCapacity
          };

          sendServerEmail(host, 'inquiry', emailContent);

            if (type == 'inquiry') {
                const threadItems = await ThreadItems.findAll({
                    where: { 
                        threadId:  thread[0].dataValues.id,
                        type: 'inquiry'
                        },
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                })
                
                if (threadItems.length) {
                    const threadItemsDetail = threadItems[0].dataValues
                    let reservationPreApproved = await ReservationPreApproved.create({
                        listId: listId,
                        hostId: host.toString(),
                        guestId: threadItemsDetail.sentBy.toString(),
                        status: 'pending',
                        checkIn: new Date(threadItemsDetail.startDate).toISOString().split('T')[0], 
                        checkOut: new Date(threadItemsDetail.endDate).toISOString().split('T')[0]
                    });
                }    
            }

          return threadItems;
        } else {
          return {
            status: 'failed to create thread items'
          }
        }
      } else {
        return {
          status: 'failed to create a thread'
        }
      }
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default CreateThreadItems;

/**
mutation CreateThreadItems(
  $listId: Int!,
  $host: String!,
  $content: String!,
  $type: String,
  $startDate: String,
  $endDate: String,
  $personCapacity: Int
){
    CreateThreadItems(
      listId: $listId,
      host: $host,
      content: $content,
      type: $type,
      startDate: $startDate,
      endDate: $endDate,
      personCapacity: $personCapacity
    ) {
        id
        sentBy
        content
        type
        startDate
        endDate
        personCapacity
        createdAt
    }
}
**/
