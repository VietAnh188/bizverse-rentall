import paypal from 'paypal-rest-sdk';
import { payment as config } from '../../../config';
import { createTransaction } from './createTransaction';

const refundRoutes = app => {

  var paymentConfig = {
    "api": {
      "host": config.paypal.host,
      "mode": config.paypal.hostMode,
      "port": '',
      "client_id": config.paypal.clientId,  // your paypal application client id
      "client_secret": config.paypal.secret // your paypal application secret id
    }
  }

  paypal.configure(paymentConfig.api);

  app.post('/refund', async function (req, res) {
    // paypal payment configuration.

    var sender_batch_id = Math.random().toString(36).substring(9);
    var reservationId = req.body.reservationId;
    var receiverEmail = req.body.receiverEmail;
    var receiverId = req.body.receiverId;
    var payerEmail = req.body.payerEmail;
    var payerId = req.body.payerId;
    var amount = req.body.amount;
    var currency = req.body.currency;
    const payEmail = req.body.payEmail

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
            "receiver": payEmail || receiverEmail,
            "note": "Thank you.",
            "sender_item_id": reservationId
        }
      ]
    };

    var sync_mode = 'false';

    paypal.payout.create(create_payout_json, sync_mode, async function (error, payout) {
      if (error) {
        res.send({ status: error.response });
        throw error;
      } else {
        let batchId = payout.batch_header.payout_batch_id;
        let batchStatus = payout.batch_header.batch_status;
        let fees = payout.batch_header.fees && payout.batch_header.fees.value;
        
        if (batchStatus && batchStatus === 'SUCCESS') {
          let transactionId = payout.items[0].transaction_id;

          await createTransaction(
            reservationId,
            receiverEmail,
            receiverId,
            payerId,
            payerEmail,
            transactionId,
            amount,
            fees,
            currency
          );

          res.send({ status: batchStatus });
        } else if(batchStatus === 'PENDING') {
          paypal.payout.get(batchId, async function (error, getResponse) {
            batchStatus = getResponse.batch_header.batch_status;

              if (error) {
                  res.send({ status: error.response });
                  throw error;
              } else {
                if (batchStatus === 'PENDING' || batchStatus === 'PROCESSING' || batchStatus === 'SUCCESS') {
                  fees = getResponse.batch_header.fees && getResponse.batch_header.fees.value;
                  let transactionId = getResponse.items[0].transaction_id;

                  await createTransaction(
                    reservationId,
                    receiverEmail,
                    receiverId,
                    payerId,
                    payerEmail,
                    transactionId,
                    amount,
                    fees,
                    currency
                  );
                }

                res.send({ status: batchStatus });
              }
          })
      } else {
          res.send({ status: batchStatus });
        }
      }
    });

  });

};

export default refundRoutes;