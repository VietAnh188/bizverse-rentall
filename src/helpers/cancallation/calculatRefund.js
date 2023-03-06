import { getGuestRefund } from './getGuestRefund';
import { getHostRefund } from './getHostRefund';
import { CHECK_IN_END_DEFAULT } from '../../config';
import { setDateWithTimeZone } from '../dateHelper';
import moment from "moment";
/**
 * @param { ("guest"||"host") } type
 * @param { [Date] } bookingDateRanges
 * @param { Date } cancelledDate
 * @param { Object } cancellationStrategy
 * @param { Object } reservationData
 */
export const calculateRefund = async(type, bookingDateRanges, cancelledDate, cancellationStrategy, reservationData, listData) =>{
    try {

        // check
        let  nonRefundableDates = [];
        let refundObject;
        const cancelledDateWithFormat = moment(cancelledDate).format(`YYYY-MM-DD`)
        const cancelledDateIndex = bookingDateRanges.indexOf(cancelledDateWithFormat);
        const checkInEndInHours = reservationData.checkInEnd && reservationData.checkInEnd !== "Flexible" ? Number(reservationData.checkInEnd) : (reservationData.checkInEnd === "Flexible" ? 23.9997222222: CHECK_IN_END_DEFAULT );
        const checkInEnd = setDateWithTimeZone(bookingDateRanges[0], listData.country).add(Number(checkInEndInHours), 'hours');
        const afterCheckIn = moment(cancelledDate).isAfter(checkInEnd);
        let canceledDateDiffBeforeCheckIn = moment(cancelledDate).diff(checkInEnd, 'days');
        let remainingNights, totalNights = bookingDateRanges.length, spentNights;
        // check can cancel, host cannot cancel after check in;
        // guest can cancel
        let canCancel = (canceledDateDiffBeforeCheckIn >= 0 && type == 'host') ? false: true;
        let nonRefundToGuest = 0;
        if(type === 'guest'){
            if(canceledDateDiffBeforeCheckIn < 0 && Math.abs(canceledDateDiffBeforeCheckIn) > Number(cancellationStrategy.priorDays)) {

                nonRefundableDates = [];
                refundObject = await getGuestRefund(nonRefundableDates, reservationData, cancellationStrategy, afterCheckIn)
                remainingNights = totalNights;
                spentNights = 0;
            }
            if(canceledDateDiffBeforeCheckIn < 0 && Math.abs(canceledDateDiffBeforeCheckIn) <= Number(cancellationStrategy.priorDays)) {

                nonRefundableDates = bookingDateRanges.slice(0, 1)

                refundObject = await getGuestRefund(nonRefundableDates, reservationData, cancellationStrategy, afterCheckIn)
                spentNights = nonRefundableDates.length;
                remainingNights = totalNights - spentNights;
            }
            // case cancel after checkIn
            if(canceledDateDiffBeforeCheckIn >= 0) {
                nonRefundableDates = cancelledDateIndex < 0 ? bookingDateRanges.slice(0, 1): bookingDateRanges.slice(0, cancelledDateIndex + 1);
                refundObject = await getGuestRefund(nonRefundableDates, reservationData, cancellationStrategy, afterCheckIn);
                spentNights = nonRefundableDates.length;
                remainingNights = totalNights - spentNights;
            }
            nonRefundToGuest = reservationData.total + reservationData.guestServiceFee - refundObject.refundToGuest

            /* if(canceledDateDiffBeforeCheckIn < 0){
                if(Math.abs(canceledDateDiffBeforeCheckIn) > Number(cancellationStrategy.priorDays)){
                    nonRefundableDates = [];
                    refundObject = await getGuestRefund(nonRefundableDates, reservationData, cancellationStrategy.accommodationPriorCheckIn, cancellationStrategy.guestFeePriorCheckIn);
                }
                if(Math.abs(canceledDateDiffBeforeCheckIn) <= Number(cancellationStrategy.priorDays)){
                    nonRefundableDates = [bookingDateRanges[0]];
                    refundObject = await getGuestRefund(nonRefundableDates, reservationData, cancellationStrategy.accommodationBeforeCheckIn, cancellationStrategy.guestFeeBeforeCheckIn);
                }
            }
            else{
                nonRefundableDates = bookingDateRanges.slice(0, cancelledDateIndex + 1);
                refundObject = await getGuestRefund(nonRefundableDates, reservationData, cancellationStrategy.accommodationDuringCheckIn, cancellationStrategy.guestFeeDuringCheckIn);
            } */
        }else{
                refundObject = await getHostRefund(nonRefundableDates, reservationData, cancellationStrategy)
                spentNights = nonRefundableDates.length;
                remainingNights = totalNights - spentNights;
        }
        // check whenever total refund greater total guest charges
        if(refundObject && refundObject.refundToGuest + refundObject.payoutToHost > reservationData.total + reservationData.guestServiceFee){
            return null;
        }
        return {
            remainingNights,
            spentNights,
            totalNights,
            canCancel,
            nonRefundToGuest,
            ...refundObject
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}