import stripePackage from 'stripe';
import { payment, paymentMethods } from '../../../config';
import { STRIPE_ZERO_DECIMAL_CURRENCIES } from '../../../constants/currency';

const stripe = stripePackage(payment.stripe.secretKey);
import { getCustomerId, getCustomerEmail } from './getCustomerId';
import { createTransaction } from './createTransaction';
import { createThread } from './createThread';
import { emailBroadcast } from './email';
import { Reservation, ReservationPreApproved, UserProfile } from '../../../data/models';
import { mintAndSaveNFT } from '../../../core/NFT/mintAndSaveNFT';
import { createThreadItemApproveReservation } from '../../../core/payment/stripe/helpers/createThreadItemApproveReservation';
import { getBookedDatesFromNFT } from  '../../../core/bookedDates'
import dateRange from '../../../data/mutations/Payment/dateRange';
import { createReservationMessage } from '../../../core/thread/createReservationMessage'
import { handleOnPaymentSuccess } from '../../../core/payment/handleOnPaymentSuccess'

export async function createCustomer(userId) {
    let customerId = await getCustomerId(userId);
    let customerEmail = await getCustomerEmail(userId);
    let status = 200 , errorMessage;
    
    // If customer doesn't exist, create a customer
    if (!customerId) {
        try {
            let createCustomerData = await stripe.customers.create(
                { email: customerEmail }
            );
            if ('id' in createCustomerData) {
                await UserProfile.update({
                    stripeCusId: createCustomerData.id
                   },
                   {
                      where: {
                          userId
                      }
                   });
            }
        } catch (error) {
            status = 400;
            errorMessage = error.message;
        }
    }

    return {
        status,
        errorMessage,
        customerId,
        customerEmail
    }
}

export async function createStripePayment(cardToken, amount, currency, customerId, customerEmail, reservationId, listId, listTitle) {
    let intent, paymentIntentSecret, requireAdditionalAction = false, status = 200, errorMessage;

    // creating the payment intents with the payment method id.
    const convertedAmount = STRIPE_ZERO_DECIMAL_CURRENCIES.includes(currency.toUpperCase()) ? amount : amount * 100

    // creating the payment intents with the payment method id.
    intent = await stripe.paymentIntents.create({
        payment_method: cardToken,
        amount: Math.round(convertedAmount),
        currency: currency,
        payment_method_types: ['card'],
        confirmation_method: 'manual',
        confirm: true,
        customer: customerId,
        description: 'Reservation from the Mobile App: ' + reservationId,
        metadata: {
            reservationId,
            listId: listId,
            title: listTitle
        },
        use_stripe_sdk: true
    });

    if (intent && (intent.status === 'requires_source_action' || intent.status === 'requires_action') && intent.next_action.type === 'use_stripe_sdk') {
        status = 400;
        requireAdditionalAction = true;
        paymentIntentSecret = intent.client_secret;
    } else if (intent && intent.status === 'succeeded') {
        status = 200;
    } else {
        status = 400;
        errorMessage = 'Sorry, something went wrong with your card. Please try again.';
    }

    if (status === 200 && intent && 'id' in intent) {
        // await updateReservation(reservationId, intent.id);
        handleOnPaymentSuccess({
            reservationId,
            payerEmail: customerEmail,
            payerId: customerId,
            // receiverEmail,
            // receiverId,
            transactionId: intent.id,
            total: amount,
            // transactionFee,
            currency,
            paymentMethodId: paymentMethods.STRIPE_PAYMENT_ID
        })
    }

    return await {
        status: status,
        errorMessage,
        requireAdditionalAction,
        paymentIntentSecret,
    }
}