import { gql } from 'react-apollo';
import {
  BOOKING_PAYMENT_START,
  BOOKING_PAYMENT_SUCCESS,
  BOOKING_PAYMENT_ERROR,
} from '../../constants';

import { sendPayment } from '../../core/payment/sendPayment';

// Config
import { paymentMethods } from '../../config';

// Helper
import { convert } from '../../helpers/currencyConvertion';

// Stripe
import { processStripePayment } from '../../core/payment/stripe/processStripePayment';

import { toastr } from 'react-redux-toastr';

export function makePaymentLater({
    reservationId,
    paymentCurrency,
    paymentType,
    guestEmail,
    paymentMethodId,
    title
}) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: BOOKING_PAYMENT_START
    });

    try {
        const query = gql`
            query($reservationId: Int!) {
                getReservation(reservationId: $reservationId) {
                    listId
                    hostId
                    guestId
                    total
                    guestServiceFee
                    checkIn
                    checkOut
                    currency
                }
            }
        `;

        const { data: reservationData } = await client.query({
            query,
            variables: { reservationId }
        })

        if (reservationData?.getReservation) {
            const { 
                listId,
                hostId,
                guestId,
                total,
                guestServiceFee,
                currency,
            } = reservationData.getReservation;
            let amount = total + guestServiceFee;
            let rates = getState().currency.rates;
            let currentCurrency = getState().currency.to || getState().currency.base;
            let baseCurrency = getState().currency.base;
            let convertedAmount = 0;
            let overAllAmount = amount && amount.toString().split(".")
            let isAmount = 0;
            
            if (overAllAmount && overAllAmount[1] == "00") {
                isAmount = overAllAmount && overAllAmount[0];
            } else {
                isAmount = amount;
            }

            if (Number(paymentType) == paymentMethods.PAYPAL_PAYMENT_ID) {
                convertedAmount = convert(baseCurrency, rates, isAmount, currency, paymentCurrency);
                sendPayment(reservationId, convertedAmount.toFixed(2), paymentCurrency, title);
                dispatch({
                    type: BOOKING_PAYMENT_SUCCESS
                });
            } else {
                convertedAmount = convert(baseCurrency, rates, amount, currency, currentCurrency)
                let cardDetails = {

                };
                let reservationDetails = {
                    reservationId,
                    listId,
                    hostId,
                    guestId,
                    guestEmail,
                    title,
                    amount: convertedAmount.toFixed(2),
                    currency: currentCurrency
                };
                const { status, errorMessage, paymentIntentSecret } = await processStripePayment(
                    'reservation',
                    cardDetails,
                    reservationDetails,
                    paymentMethodId
                );

                if (status === 200) {
                    await dispatch({
                        type: BOOKING_PAYMENT_SUCCESS,
                        payload: { paymentLoading: true }
                    });

                    return {
                        status
                    }
                } else {
                    toastr.error('Failed!', errorMessage || 'Something error');

                    await dispatch({
                        type: BOOKING_PAYMENT_ERROR,
                        payload: { paymentLoading: false }
                    });
                    return {
                        status,
                        paymentIntentSecret,
                        reservationId
                    }
                }
            }  
        } else { 
            toastr.error('Failed!', "Reservation is not exist")

            dispatch({
                type: BOOKING_PAYMENT_ERROR
            });
            
            return false;
        }

    } catch (error) {
        toastr.error('Failed!', error.message);

        dispatch({
            type: BOOKING_PAYMENT_ERROR
        });

        return false;
    }

    return true;
  };
}

