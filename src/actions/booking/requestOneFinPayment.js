import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import {
  ONE_FIN_PAYMENT_REQUEST_ERROR,
  ONE_FIN_PAYMENT_REQUEST_START,
  ONE_FIN_PAYMENT_REQUEST_SUCCESS
} from '../../constants';

// Helper
import { convert } from '../../helpers/currencyConvertion';

const mutationPaymentRequest = gql`
  mutation (
    $reservationId: Int!,
    $payerEmail: String!,
    $payerId: String!,
    $amount: String!,
    $currency: String!,
    $transactionMethod: String!
  ) {
    onefinPayment (
      reservationId: $reservationId,
      payerEmail: $payerEmail,
      payerId: $payerId,
      amount: $amount,
      currency: $currency,
      transactionMethod: $transactionMethod
    ) {
      results {
        paymentURL
      }
      status
      errorMessage
    }
  }
`;

const mutationCreateReservation = gql`
    mutation createReservation(
      $listId: Int!, 
      $hostId: String!,
      $guestId: String!,
      $checkIn: String!,
      $checkOut: String!,
      $guests: Int!,
      $message: String!,
      $basePrice: Float!,
      $cleaningPrice: Float,
      $currency: String!,
      $discount: Float,
      $discountType: String,
      $guestServiceFee: Float,
      $hostServiceFee: Float,
      $total: Float!,
      $bookingType: String,
      $paymentType: Int!,
      $cancellationPolicy: Int!,
      $specialPricing: String,
      $isSpecialPriceAssigned: Boolean,
      $isSpecialPriceAverage: Float,
      $dayDifference: Float,
      $taxRate: Float,
      $checkInStart: String,
      $checkInEnd: String,
      $hostServiceFeeType: String,
      $hostServiceFeeValue: Float,
    ){
        createReservation(
          listId: $listId,
          hostId: $hostId,
          guestId: $guestId,
          checkIn: $checkIn,
          checkOut: $checkOut,
          guests: $guests,
          message: $message,
          basePrice: $basePrice,
          cleaningPrice: $cleaningPrice,
          currency: $currency,
          discount: $discount,
          discountType: $discountType,
          guestServiceFee: $guestServiceFee,
          hostServiceFee: $hostServiceFee,
          total: $total,
          bookingType: $bookingType,
          paymentType: $paymentType,
          cancellationPolicy: $cancellationPolicy,
          specialPricing: $specialPricing,
          isSpecialPriceAssigned: $isSpecialPriceAssigned,
          isSpecialPriceAverage: $isSpecialPriceAverage,
          dayDifference: $dayDifference,
          taxRate: $taxRate,
          checkInStart: $checkInStart,
          checkInEnd: $checkInEnd,
          hostServiceFeeType: $hostServiceFeeType,
          hostServiceFeeValue: $hostServiceFeeValue,
        ) {
            id
            listId,
            hostId,
            guestId,
            checkIn,
            checkOut,
            guests,
            message,
            basePrice,
            cleaningPrice,
            currency,
            discount,
            discountType,
            guestServiceFee,
            hostServiceFee,
            total,
            confirmationCode,
            createdAt
            status
            paymentMethodId,
            cancellationPolicy,
            isSpecialPriceAverage,
            dayDifference,
            taxRate, 
            checkInStart,
            checkInEnd,
            hostServiceFeeType,
            hostServiceFeeValue,
            errorMessage
        }
    }
  `;

export const requestOneFinPayment = ({ createReservationPayload, requestOneFinPaymentPayload }) => async (dispatch, getState, { client }) => {
    dispatch({
        type: ONE_FIN_PAYMENT_REQUEST_START,
        payload: {}
    });

    let errorMessage = '', hasError = true;

    try {
        const cancellationPolicy = getState().book.data.listingData.cancellation.id;
        const preApprove = getState().book.bookDetails.preApprove;
        let bookingTypeData;

        if (preApprove) {
            bookingTypeData = 'instant';
        } else {
            bookingTypeData = createReservationPayload.bookingType;
        }

        const { data: dataCreateReservation } = await client.mutate({
            mutation: mutationCreateReservation,
            variables: {
                ...createReservationPayload,
                cancellationPolicy,
                bookingType: bookingTypeData
            }
        })

        if (dataCreateReservation && dataCreateReservation.createReservation && dataCreateReservation.createReservation.id) {
            const { id: reservationId } = dataCreateReservation.createReservation;
            const { amount, currency } = requestOneFinPaymentPayload;
            const rates = getState().currency.rates;
            const baseCurrency = getState().currency.base;
            const convertedAmount = convert(baseCurrency, rates, amount, currency, 'VND');
            const { data: dataRequestOneFinPayment } = await client.mutate({
                mutation: mutationPaymentRequest,
                variables: { 
                    ...requestOneFinPaymentPayload,
                    currency: 'VND', // OneFin just support VND
                    amount: convertedAmount.toFixed(2),
                    reservationId
                },
                fetchPolicy: 'network-only'
            })
            
            if (Number(dataRequestOneFinPayment?.onefinPayment?.status) === 200) {
                hasError = false

                dispatch({
                    type: ONE_FIN_PAYMENT_REQUEST_SUCCESS,
                    payload: {
                        paymentURL: dataRequestOneFinPayment.onefinPayment.results.paymentURL
                    }
                });
            } else {
              errorMessage = dataRequestOneFinPayment?.onefinPayment?.errorMessage
            }
        } else {
          errorMessage = dataCreateReservation?.createReservation?.errorMessage || ''
        }
    } catch (error) {
      errorMessage = error;
    }

    if (hasError) {
      dispatch({
        type: ONE_FIN_PAYMENT_REQUEST_ERROR
      });

      toastr.error('Error Occured!', errorMessage);
    }
  }