import { Transaction } from '../../../data/models';

export async function createTransaction(
    reservationId,
    payerEmail,
    payerId,
    transactionId,
    total,
    currency,
    paymentType,
    paymentMethodId,
    status="OPENED",
    paymentMethodDetailId = 0
  ) {

    const transaction = await Transaction.findOrCreate({
        where: {
          reservationId,
          transactionId
        },
        defaults: {
          //properties you want on create
          reservationId,
          payerEmail,
          payerId,
          transactionId,
          total,
          currency,
          paymentType,
          paymentMethodId,
          status,
          paymentMethodDetailId,
        }
      });

    if(transaction) {
        return {
          status: 'created'
        };
    } else {
        return {
          status: 'failed to create transaction'
        }
    }
}