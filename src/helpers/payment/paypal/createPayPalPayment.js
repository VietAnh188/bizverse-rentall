import paypal from 'paypal-rest-sdk';
import { payment } from '../../../config';
import { PAYPAL_WITHOUT_DECIMAL } from '../../../constants/currency';

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

export async function createPayPalPayment(listTitle, reservationId, total, currency) {

  try {
    const targetAmount = total.toFixed(2);
    const amount = PAYPAL_WITHOUT_DECIMAL.includes(currency.toUpperCase()) ? Math.ceil(targetAmount) : targetAmount

    var paymentDetails = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": payment.paypal.returnURL,
        "cancel_url": payment.paypal.cancelURL + '?id=' + reservationId
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": listTitle,
            "sku": reservationId.toString(),
            "price": amount.toString(),
            "currency": currency,
            "quantity": 1
          }]
        },
        "amount": {
          "currency": currency,
          "total": amount.toString()
        },
        "description": "This is the payment description."
      }]
    };

    return new Promise(function (resolve, reject) {
      paypal.payment.create(paymentDetails, function (error, payment) {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      })
    });

  } catch (error) {
      console.log(error)
    return {
      status: 400,
      errorMessage: error
    }
  }
}