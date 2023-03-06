import { Transaction, CancellationDetails } from '../../../../data/models'
/**
 * @param { Number } reservationId
 * @returns { Promise<[Number, String]> }
 * */
export const getStripeRefundAmount = async (reservationId) => {
    try {
        const cancellationDetails = await CancellationDetails.findOne({
            where: {
                reservationId
            },
            raw: true
        })
        if(cancellationDetails && cancellationDetails.refundToGuest && cancellationDetails.currency)
            return [cancellationDetails.refundToGuest, cancellationDetails.currency];
        return [null, null];
    }catch (e) {
        console.log(`getStripeRefundAmount error: `, e);
        return [null, null];
    }
}