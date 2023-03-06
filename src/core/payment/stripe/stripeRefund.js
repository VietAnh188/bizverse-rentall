import stripePackage from 'stripe';
import { payment } from '../../../config';
const stripe = stripePackage(payment.stripe.secretKey);
import { createTransaction } from './helpers/createTransaction';
import { getStripeRefundAmount } from './helpers/getStripeRefundAmount'
import { convert } from "../../../helpers/currencyConvertion";
import { getBaseAndRatesCurrency } from "../../../helpers/reservation/getBaseAndRatesCurrency";
import { ZERO_DECIMAL_CURRENCIES } from '../../../config';
import { getTransactionTotalAndCurrency } from './helpers/getTransactionTotalAndCurrency'
const stripeRefund = app => {
    app.post('/stripe-refund', async function (req, res) {

        if (req.user && req.user.admin === true) {

            const reservationDetails = req.body.reservationDetails;
            let reservationId, stripeConvertAmount, refundAmountConverted;
            let status = 200, errorMessage, refund, transactionId, refundType = 'charge';
            if (reservationDetails) {
                transactionId = reservationDetails.transactionId;
                refundType = (transactionId && transactionId.indexOf("ch_") >= 0) ? 'charge' : 'payment_intent';
                reservationId = reservationDetails.reservationId;
            } else {
                status = 400;
                errorMessage = 'Something Went Wrong, please try again';
            }
            // validate amount before continue, case lose access_token
            const [refundAmount, cancelCurrency ] = await getStripeRefundAmount(reservationId);
            // total amount, currency  guest charges
            const [transactionTotal, transactionCurrency] = await getTransactionTotalAndCurrency(reservationId, transactionId)
            
            const [base, rates] = await getBaseAndRatesCurrency();
            
            if(!refundAmount || !cancelCurrency) return res.send({ status: 400, errorMessage: "Invalid reservation details" });

            if(reservationDetails.amount && reservationDetails.currency){
               
                const amountConverted = convert(base, rates, refundAmount, cancelCurrency, reservationDetails.currency);
                
                if(Number(reservationDetails.amount) !== Number(amountConverted.toFixed(2))){
                    return res.send({ status: 400, errorMessage: "Invalid amount"})
                }
                
                refundAmountConverted = convert(base, rates, refundAmount, cancelCurrency, transactionCurrency);
                
                if(transactionTotal < Number(refundAmountConverted.toFixed(2))){
                    return res.send({ status: 400, errorMessage: "Refund amount must not be greater than total amount"})
                }
            }

            // 
            if (status === 200 && refundAmount && transactionId) {
                try {
                    stripeConvertAmount = ZERO_DECIMAL_CURRENCIES.includes(transactionCurrency) ? Math.round(refundAmountConverted): Math.round(refundAmountConverted*100)
                    refund = await stripe.refunds.create({
                        [refundType]: transactionId,
                        amount: stripeConvertAmount,
                    });
                } catch (error) {
                    status = 400;
                    errorMessage = error.message;
                }
            }
            if (status === 200 && refund && 'id' in refund) {
                // Update Transactions
                await createTransaction(
                    reservationDetails.reservationId,
                    null,
                    null,
                    refund.id,
                    refundAmountConverted,
                    transactionCurrency,
                    'cancellation',
                    2
                );
                res.send({ status, errorMessage });
            }else{
                res.send({ status, errorMessage });
            }

        } else {
            return res.send({ status: 400, errorMessage: 'User not authenticated' })
        }


    });
};

export default stripeRefund;