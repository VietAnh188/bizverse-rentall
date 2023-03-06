import { getPriceForDaysWithSpecialPriceAfterBooking } from './getPriceForDaysWithSpecailPriceAfterBooking';
import { getServiceFee } from '../reservation/getServiceFee';
/**
 * @param { [Date] } nonRefundDates
 * @param { Object } reservationData
 * @param { Object } cancellationStrategy
 * @param { Boolean } afterCheckIn
 *
 * */
export const getGuestRefund = async (nonRefundDates, reservationData, cancellationStrategy, afterCheckIn = false) => {
    try {
        let priceForNonRefundDays = 0, hostServiceFee = 0, guestServiceFee = 0;
        let priceForRefundDays = 0;
        let hostEarnAmount = 0;
        let refundToGuest = 0, payoutToHost = 0;
        let total = 0;
        const cleaningPrice = reservationData.cleaningPrice;
        const discount = reservationData.discount ? Number(reservationData.discount) : 0;
        let totalNights = reservationData.dayDifference;
        let spentNights = nonRefundDates.length;
        let remainingNights = totalNights - spentNights;
        // calculate none refund, refund will be total - non refund
        if(nonRefundDates.length === 0 ){
            guestServiceFee = 0;
            refundToGuest = (reservationData.total - cleaningPrice)*cancellationStrategy.accommodationPriorCheckIn/100 + cleaningPrice + reservationData.guestServiceFee;
            hostEarnAmount = reservationData.total + reservationData.guestServiceFee - refundToGuest;
            hostServiceFee = hostEarnAmount > 0 ? (await getServiceFee(hostEarnAmount, reservationData.currency)).hostFee : 0;
            payoutToHost = hostEarnAmount - hostServiceFee;
            total = hostServiceFee + guestServiceFee + refundToGuest + payoutToHost;
        }
        else if(nonRefundDates.length === 1){
            guestServiceFee = reservationData.guestServiceFee;
            priceForNonRefundDays = await getPriceForDaysWithSpecialPriceAfterBooking(nonRefundDates, reservationData.id);
            priceForRefundDays = (reservationData.total - cleaningPrice - priceForNonRefundDays - discount)*(afterCheckIn === false ? cancellationStrategy.accommodationBeforeCheckIn: cancellationStrategy.accommodationDuringCheckIn)/100;
            refundToGuest = priceForRefundDays + (afterCheckIn === false ? cleaningPrice + reservationData.guestServiceFee: 0);
            hostEarnAmount = reservationData.total - refundToGuest;
            hostServiceFee = hostEarnAmount > 0 ? (await getServiceFee(hostEarnAmount, reservationData.currency)).hostFee : 0;
            payoutToHost = hostEarnAmount - hostServiceFee;
            total = hostServiceFee + guestServiceFee + refundToGuest + payoutToHost;
        }
        else{
            priceForNonRefundDays = await getPriceForDaysWithSpecialPriceAfterBooking(nonRefundDates, reservationData.id);
            // case when guest stays for over a week then leave early, guest have discount
            const discountPercent = discount > 0? reservationData.discountPercent : 0;
            if(spentNights >=7 && totalNights < 28 && discount > 0){
                // guest have discount for spent days
                priceForRefundDays = (Number(reservationData.total) - cleaningPrice - priceForNonRefundDays + discountPercent * priceForNonRefundDays/100)*Number(cancellationStrategy.accommodationDuringCheckIn)/100;
            }
            else if( spentNights >=28 && discount > 0){
                priceForRefundDays = (Number(reservationData.total) - cleaningPrice - priceForNonRefundDays + discountPercent * priceForNonRefundDays/100)*Number(cancellationStrategy.accommodationDuringCheckIn)/100;
            }
            else{
                priceForRefundDays = (Number(reservationData.total) - cleaningPrice - priceForNonRefundDays)*Number(cancellationStrategy.accommodationDuringCheckIn)/100;
            }
            guestServiceFee = reservationData.guestServiceFee;


            if(priceForRefundDays <= 0){
                guestServiceFee = reservationData.guestServiceFee;
                refundToGuest = 0;
                hostServiceFee = reservationData.hostServiceFee;
                payoutToHost = reservationData.total - hostServiceFee;
                total = hostServiceFee + guestServiceFee + refundToGuest + payoutToHost;
            }else{
                refundToGuest = priceForRefundDays
                hostEarnAmount = reservationData.total - priceForRefundDays;
                hostServiceFee = hostEarnAmount > 0 ? (await getServiceFee(hostEarnAmount, reservationData.currency)).hostFee : 0;
                payoutToHost = hostEarnAmount - hostServiceFee;
                total = hostServiceFee + guestServiceFee + refundToGuest + payoutToHost;
            }

        }

        return {
            guestServiceFee: Number(guestServiceFee.toFixed(2)),
            hostServiceFee: Number(hostServiceFee.toFixed(2)),
            payoutToHost: Number(payoutToHost.toFixed(2)),
            refundToGuest: Number(refundToGuest.toFixed(2)),
            cleaningPrice: Number(cleaningPrice.toFixed(2)),
            total: Number(total.toFixed(2)),
        }
    }catch (e) {
        console.log(e)
        return null;
    }
}

