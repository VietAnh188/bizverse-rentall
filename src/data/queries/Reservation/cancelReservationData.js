import ReservationType from '../../types/ReservationType';
import { Reservation, Cancellation, Listing } from '../../models';
import { calculateRefund } from '../../../helpers/cancallation/calculatRefund'
import dateRange from '../../mutations/Payment/dateRange';
import { getDateUsingTimeZone, setDateWithTimeZone } from '../../../helpers/dateHelper';
import { CHECK_IN_START_DEFAULT } from '../../../config';
import getLocaleMessage from '../../../helpers/message/getLocaleMessage'
import { 
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const cancelReservationData = {

    type: ReservationType,

    args: {
        reservationId: { type: new NonNull(IntType) },
        userType: { type: new NonNull(StringType) },
    },

    async resolve({ request }, { reservationId, userType }) {
        if (request.user) {
            const id = reservationId;
            const userId = request.user.id;
            let where;
            let reservationState = [{ reservationState: 'pending' }, { reservationState: 'approved' }];
            let checkOut = { $gte: new Date() };

            if (userType === 'host') {
                where = {
                    id,
                    hostId: userId,
                    $or: reservationState,
                    checkOut
                };
            } else {
                where = {
                    id,
                    guestId: userId,
                    $or: [
                        ...reservationState,
                        {
                            reservationState: 'blocked'
                        }
                    ],
                    checkOut
                };
            }
            const reservation =  await Reservation.findOne({
                where,
                raw: true
            });
            if(!reservation) return {
                status: "reservation not found"
            };
            // case pay later
            if(reservation.isPayLater || reservation.paymentState !== 'completed'){
                return {
                    ...reservation,
                    refundData: {
                        hostServiceFee: 0,
                        guestServiceFee: 0,
                        refundToGuest: 0,
                        payoutToHost: 0,
                        total: 0,
                        spentNights: 0,
                        totalNights: 0,
                        remainingNights: 0
                    }
                }
            }
            const [cancellationStrategy, listData] = await Promise.all([
                Cancellation.findOne({
                    where: {
                        id: reservation.cancellationPolicy
                    },
                    raw: true
                }),
                Listing.findOne({
                    where: {
                        id: reservation.listId
                    },
                    raw: true
                })
            ])
            const cancelledDate = getDateUsingTimeZone(listData.country, false);
            const bookingDateRange = dateRange(reservation.checkIn, reservation.checkOut);
            // guest cannot cancel after time checkIn last day
            const checkInStartInHours = reservation.checkInStart === "Flexible"? CHECK_IN_START_DEFAULT: Number(reservation.checkInStart) ;
            const checkOutTime = setDateWithTimeZone(bookingDateRange[bookingDateRange.length -1], listData.country).add(checkInStartInHours, 'hours');
            
            // check if now is after checkOut time;
            if(checkOutTime.isBefore(cancelledDate)){
                return {
                    status: 400,
                    errorMessage: await getLocaleMessage({ messageId: "error.cannotCancelReservationNow", locale: request.language})
                }
            }
            const refundData = await calculateRefund(userType, bookingDateRange, cancelledDate, cancellationStrategy, reservation, listData)
            return {
                ...reservation,
                refundData
            };
        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default cancelReservationData;
