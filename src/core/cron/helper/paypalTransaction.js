import paypal from 'paypal-rest-sdk';

import { payment } from '../../../config';

import { Reservation} from '../../../data/models';
import { createTransactionHistory } from '../../payment/payout/createTransactionHistory';


var paymentConfig = {
    "api": {
        "host": payment.paypal.host,
        "mode": payment.paypal.hostMode,
        "port": '',
        "client_id": payment.paypal.clientId,  // your paypal application client id
        "client_secret": payment.paypal.secret // your paypal application secret id
    }
}
paypal.configure(paymentConfig.api);

export async function paypalTransaction(reservationId, hostId, amount, currency, hostEmail, paymentAttempt, payoutId) {
    try {
        let status = 500, errorMessage;
        var sender_batch_id = Math.random().toString(36).substring(9);
        amount = Math.round(amount);
        let updateAttempt = await Reservation.update({
            paymentAttempt: paymentAttempt + 1
        }, {
            where: {
                id: reservationId
            }
        });
        var create_payout_json = {
            "sender_batch_header": {
                "sender_batch_id": sender_batch_id,
                "email_subject": "You have a payment",
                "recipient_type": "EMAIL"
            },
            "items": [
                {
                    "recipient_type": "EMAIL",
                    "amount": {
                        "value": amount,
                        "currency": currency
                    },
                    "receiver": hostEmail,
                    "note": "Thank you.",
                    "sender_item_id": reservationId
                }
            ]
        };

        var sync_mode = 'false';
        await paypal.payout.create(create_payout_json, sync_mode, async function (error, payout) {
            if (error) {
                status = 400;
                errorMessage = error;
                throw error;
            } else {
                var batchId = payout.batch_header.payout_batch_id;
                var batchStatus = payout.batch_header.batch_status;
                var fees = payout.batch_header.fees && payout.batch_header.fees.value;
                if (batchStatus && batchStatus === 'SUCCESS') {
                    await createTransactionHistory(
                        reservationId,
                        hostEmail,
                        payoutId,
                        amount,
                        fees,
                        currency,
                        hostId,
                        1
                    )
                    await Reservation.update(
                        {
                            isPayout: '1'
                        },
                        {
                            where: {
                                id: reservationId
                            }
                        }
                    )
                    status = 200;
                } else {
                    if (batchStatus === 'PENDING') {
                        let getPayoutInfo = paypal.payout.get(batchId, async function (getError, getResponse) {
                            if (getError) {
                                status =  400,
                                errorMessage =  getError.response && getError.response.message
                            } else {
                                batchStatus = getResponse?.batch_header?.batch_status;
                                if (batchStatus === 'PENDING' || batchStatus === 'PROCESSING' || batchStatus === 'SUCCESS') {
                                    fees = getResponse.batch_header.fees && getResponse.batch_header.fees.value;

                                    await createTransactionHistory(
                                        reservationId,
                                        hostEmail,
                                        payoutId,
                                        amount,
                                        fees,
                                        currency,
                                        hostId,
                                        1
                                    );

                                    await Reservation.update(
                                        {
                                            isPayout: '1'
                                        },
                                        {
                                            where: {
                                                id: reservationId
                                            }
                                        }
                                    )

                                    status = 200;
                                }
                            }
                        })
                    }
                }
            }
        });

        return {
            status, 
            errorMessage
        }
    } catch (error) {
        return {
            status: 400,
            errorMessage: error
        }
    }
}
