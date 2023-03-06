// Graphql
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import {
  Reservation,
  ListBlockedDates,
  CancellationDetails,
  ThreadItems,
  Threads,
  UserProfile,
  Listing,
  NFT,
  Cancellation
} from '../../models';
import { sendNotifications } from '../../../helpers/sendNotifications';
import { sendServerEmail } from '../../../core/email/sendServerEmail';
import { ADMIN_WALLET, CHECK_IN_START_DEFAULT } from '../../../config'

// Helpers
import { getUserProfile } from '../../../core/auth/getUseProfile';
import { burnNFTs as burnNFTsAPI } from '../../../helpers/NFT/burnNFTs';
import { calculateRefund } from '../../../helpers/cancallation/calculatRefund';
import { getDateUsingTimeZone, setDateWithTimeZone } from '../../../helpers/dateHelper'
import dateRange from '../Payment/dateRange';
import getLocaleMessage from '../../../helpers/message/getLocaleMessage'
import { convert } from '../../../helpers/currencyConvertion';
import { getBaseAndRatesCurrency } from '../../../helpers/reservation/getBaseAndRatesCurrency';
const cancelReservation = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType) },
    cancellationPolicy: { type: new NonNull(StringType) },
    refundToGuest: { type: new NonNull(FloatType) },
    payoutToHost: { type: new NonNull(FloatType) },
    guestServiceFee: { type: new NonNull(FloatType) },
    hostServiceFee: { type: new NonNull(FloatType) },
    total: { type: new NonNull(FloatType) },
    currency: { type: new NonNull(StringType) },
    threadId: { type: new NonNull(IntType) },
    cancelledBy: { type: new NonNull(StringType) },
    message: { type: new NonNull(StringType) },
    checkIn: { type: new NonNull(StringType) },
    checkOut: { type: new NonNull(StringType) },
    guests: { type: new NonNull(IntType) },
  },

  async resolve({ request }, {
    reservationId,
    cancellationPolicy,
    refundToGuest,
    payoutToHost,
    guestServiceFee,
    hostServiceFee,
    total,
    currency,
    threadId,
    cancelledBy,
    message,
    checkIn,
    checkOut,
    guests
  }) {
    try {
      let isReservationUpdated = false, emailContent;
      // Check if user already logged in
      if (request.user && !request.user.admin) {

        const userId = request.user.id;
        const userProfile = await getUserProfile(userId)
        const userWallet = String(userProfile.wallet).toLowerCase()
        let skipValidateIfPayLater = false;
        let notifyUserId, notifyUserType, notifyContent;
        let userName;

        const getThread = await Threads.findOne({
          attributes: ['host', 'guest'],
          where: {
            id: threadId
          },
          raw: true
        });

        const reservationData = await Reservation.findOne({
          where: {
            id: reservationId,
            $or: [
              {
                hostId: userId
              },
              {
                guestId: userId
              }
            ]
          },
          raw: true
        });

        if (!reservationData) {
          return {
            status: 400,
            errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.reservationNotFound"})
          }
        }
        if(reservationData.isPayLater || reservationData.paymentState !== 'completed'){
          skipValidateIfPayLater = true;
        }
        // Reservation is blocked if guest sold NFT, guest transferred NFT
        if (reservationData.reservationState === 'blocked') {
          return {
            status: 400,
            errorMessage: 'Reservation is blocked'
          }
        }

        // ----------- START check NFT of the reservation ------------------
        const nft = await NFT.findOne({
          where: {
            reservationId,
            isDeleted: false
          },
          raw: true
        })

        if (!nft) {
          return {
            status: 400,
            errorMessage: 'NFT of this reservation is not found'
          }
        }

        const { isOnMarketplace, isMinting, isSelling, lastPrice, owner, tokenId } = nft;
        let validOwner = owner === userWallet || owner === String(ADMIN_WALLET).toLowerCase() || owner === 'admin'

        if (isMinting || isOnMarketplace || isSelling || lastPrice !== null || !validOwner) { // lastPrice can be 0
          return {
            status: 400,
            errorMessage: 'The reservation is blocked for cancel'
          }
        }
        // ---------- END OF check NFT of the reservation ------------

        const [cancellationStrategy, listData] = await Promise.all([
          Cancellation.findOne({
              where: {
                  id: reservationData.cancellationPolicy
              },
              raw: true
          }),
          Listing.findOne({
              where: {
                  id: reservationData.listId
              },
              raw: true
          })]);
        
        const cancelledDate = getDateUsingTimeZone(listData.country, false);
        const bookingDateRange = dateRange(reservationData.checkIn, reservationData.checkOut);  
        
        // guest cannot cancel after time checkIn last day
        const checkInStartInHours = reservationData.checkInStart === "Flexible"? CHECK_IN_START_DEFAULT: Number(reservationData.checkInStart) ;
        const checkOutTime = setDateWithTimeZone(bookingDateRange[bookingDateRange.length -1], listData.country).add(checkInStartInHours, 'hours');
        
        // check if now is after checkOut time;
        if(checkOutTime.isBefore(cancelledDate)){
            return {
                status: 400,
                errorMessage: await getLocaleMessage({ messageId: "error.cannotCancelReservationNow", locale: request.language})
            }
        }
        
        const refundData = await calculateRefund(cancelledBy, bookingDateRange, cancelledDate, cancellationStrategy, reservationData, listData);
        
        if(!refundData){
          return {
            status: 400,
            errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.something"})
          }
        }
        if(refundData.isCancelled == false && cancelledBy === 'host'){
          return {
            status: 400,
            errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.cannotCancelReservationByHost"})
          }
        }
        // get base, rates currency
        const [base, rates] = await getBaseAndRatesCurrency();
        let refundDataConverted
        
        // convert refundData if currency's different from reservationData.currency
        // convert just for validate input value, use refundData to create cancellation;
        // skip if isPaylater or paymentSate different completed
        if(!skipValidateIfPayLater){
          if(currency !== reservationData.currency){
            Object.keys(refundData).map(key => {
              refundDataConverted[key] = Number((convert(base, rates, refundData[key], reservationData.currency, currency)).toFixed(2));
            });
            // validate input;
            if(refundDataConverted.refundToGuest !== refundToGuest ||
              refundDataConverted.payoutToHost !== payoutToHost ||
              refundDataConverted.guestServiceFee !== guestServiceFee ||
              refundDataConverted.hostServiceFee !== hostServiceFee ||
              refundDataConverted.total !== total
            ){
                return {
                  status: 400,
                  errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.invalidInput"})
                }
              }
          }else{
            // validate input;
            if(refundData.refundToGuest !== refundToGuest ||
              refundData.payoutToHost !== payoutToHost ||
              refundData.guestServiceFee !== guestServiceFee ||
              refundData.hostServiceFee !== hostServiceFee ||
              refundData.total !== total
            ){
                return {
                  status: 400,
                  errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.invalidInput"})
                }
              }
          }
        }
        
        if (getThread && getThread.host && getThread.guest) {
          notifyUserId = getThread.host === userId ? getThread.guest : getThread.host;
          notifyUserType = getThread.host === userId ? 'guest' : 'host';
        }

        const [hostProfile,  guestProfile] = await Promise.all([
          UserProfile.findOne({
            attributes: ['firstName'],
            where: {
              userId: getThread.host
            },
            raw: true
          }),
          UserProfile.findOne({
            attributes: ['firstName'],
            where: {
              userId: getThread.guest
            },
            raw: true
          })
        ]);

        if (hostProfile && guestProfile && getThread) {
          userName = getThread.host === userId ? (hostProfile && hostProfile.firstName) : (guestProfile && guestProfile.firstName);
        }

        let canContinue = true;

        // Check case guest did not claim nft or guest sent NFT to admin wallet, then we don't need to burn
        if (owner !== 'admin' && owner !== String(ADMIN_WALLET).toLowerCase()) {
          canContinue = await burnNFTsAPI([tokenId])
        }

        if (canContinue) {
          NFT.update({
            isDeleted: true
          }, {
            where: {
              tokenId: tokenId
            }
          })

          // Update Reservation table
        await Reservation.update({
          reservationState: 'cancelled'
        }, {
          where: {
            id: reservationId
          }
        }).then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isReservationUpdated = true;
          }
        });

        // Unblock the blocked dates only if guest cancels the reservation
        if (cancelledBy === 'guest') {
          await ListBlockedDates.update({
            reservationId: null,
            calendarStatus: 'available'
          }, {
            where: {
              reservationId,
              calendarStatus: 'blocked',
              isSpecialPrice: {
                $ne: null
              }
            }
          });

          ListBlockedDates.destroy({
            where: {
              reservationId,
              calendarStatus: 'blocked',
              isSpecialPrice: {
                $eq: null
              }
            }
          });
        }

          // Create record for cancellation details
          CancellationDetails.create({
            reservationId,
            cancellationPolicy: reservationData.cancellationPolicy,
            refundToGuest: skipValidateIfPayLater? 0: refundData.refundToGuest,
            payoutToHost: skipValidateIfPayLater? 0: refundData.payoutToHost,
            guestServiceFee: skipValidateIfPayLater? 0: refundData.guestServiceFee,
            hostServiceFee: skipValidateIfPayLater? 0: refundData.hostServiceFee,
            total: skipValidateIfPayLater? 0: refundData.total,
            currency: reservationData.currency,
            cancelledBy
          });

          // Create thread items
          ThreadItems.create({
            threadId,
            reservationId,
            sentBy: userId,
            content: message,
            type: cancelledBy === 'host' ? 'cancelledByHost' : 'cancelledByGuest',
            startDate: reservationData.checkIn,
            endDate: reservationData.checkOut,
            personCapacity: guests
          });

          Threads.update({
            isRead: false
          },
            {
              where: {
                id: threadId
              }
            }
          );

          notifyContent = {
            "screenType": "trips",
            "userType": notifyUserType.toString(),
            "userName": userName,
            "content": message
          };

          if (isReservationUpdated) {
            sendNotifications('cancelReservation', notifyContent, notifyUserId);

            emailContent = {
              hostName: hostProfile && hostProfile.firstName,
              guestName: guestProfile && guestProfile.firstName,
              confirmationCode: reservationData.confirmationCode,
              checkIn: reservationData.checkIn,
              listTitle: listData && listData.title,
              payoutToHost: refundData.payoutToHost,
              refundToGuest: refundData.refundToGuest,
              currency: reservationData.currency,
              country: listData && listData.country
            };

            if (cancelledBy === 'host') { // Email
              sendServerEmail(getThread.guest, 'cancelledByHost', emailContent);
            } else {
              sendServerEmail(getThread.host, 'cancelledByGuest', emailContent);
            }

            return {
              status: 200
            }
          } else {
            return {
              status: 400
            }
          }
        }

        return {
          status: 400,
          errorMessage: "Burn NFT failed"
        }
      } else {
        return {
          status: "notLoggedIn",
        };
      }
    } catch(error) {
      console.log("------------------------------- CANCEL ERROR ---------------", error)
      return {
        status: 400,
        errorMessage: error.message
      }
    }
  }
};

export default cancelReservation;

/**
mutation cancelReservation(
  $reservationId: Int!,
  $cancellationPolicy: String!,
  $refundToGuest: Float!,
  $payoutToHost: Float!,
  $guestServiceFee: Float!,
  $hostServiceFee: Float!,
  $total: FloatType!,
  $currency: String!,
  $threadId: Int!,
  $cancelledBy: String!,
  $message: String!
){
    cancelReservation(
      reservationId: $reservationId,
      cancellationPolicy: $cancellationPolicy,
      refundToGuest: $refundToGuest,
      payoutToHost: $payoutToHost,
      guestServiceFee: $guestServiceFee,
      hostServiceFee: $hostServiceFee,
      total: $total,
      currency: $currency,
      threadId: $threadId,
      cancelledBy: $cancelledBy,
      message: $message
    ) {
        status
    }
}
**/
