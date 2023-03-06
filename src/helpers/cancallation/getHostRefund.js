import { getPriceForDaysWithSpecialPriceAfterBooking } from './getPriceForDaysWithSpecailPriceAfterBooking';
import { getServiceFee } from '../reservation/getServiceFee';
/**
 * @param { [Date] } nonRefundDates
 * @param { Object } reservationData
 *
 * */
export const getHostRefund = async (nonRefundDates, reservationData, cancellationStrategy) => {
    try {
        let  hostServiceFee = 0, guestServiceFee = 0;
        let refundToGuest = 0, payoutToHost = 0;
        let total = 0;
        let missedEarning = 0
        const cleaningPrice = reservationData.cleaningPrice;
        // calculate none refund, refund will be total - non refund
      
        hostServiceFee = 0;
        guestServiceFee = 0;
        refundToGuest = reservationData.total + reservationData.guestServiceFee;
        payoutToHost = 0;
        total = hostServiceFee + guestServiceFee + refundToGuest + payoutToHost;
        
        missedEarning  =  reservationData.total - reservationData.hostServiceFee - payoutToHost
        

        return {
            guestServiceFee: Number(guestServiceFee.toFixed(2)),
            hostServiceFee: Number(hostServiceFee.toFixed(2)),
            payoutToHost: Number(payoutToHost.toFixed(2)),
            refundToGuest: Number(refundToGuest.toFixed(2)),
            cleaningPrice: Number(cleaningPrice.toFixed(2)),
            total: Number(total.toFixed(2)),
            missedEarning: Number(missedEarning.toFixed(2))
        }
    }catch (e) {
        console.log(e)
        return null;
    }
}

