import { gql } from 'react-apollo';
import {
    BOOKING_PAYMENT_START,
    BOOKING_PAYMENT_SUCCESS,
    BOOKING_PAYMENT_ERROR,
  } from '../../constants';

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

export const createReservation = ({ payload }) => async (dispatch, getState, { client }) => {
    dispatch({
        type: BOOKING_PAYMENT_START
      });

    try {
        const cancellationPolicy = getState().book.data.listingData.cancellation.id;
        const { data: dataCreateReservation } = await client.mutate({
            mutation: mutationCreateReservation,
            variables: {
                ...payload,
                cancellationPolicy
            }
        })

        if (dataCreateReservation?.createReservation?.id) {
            dispatch({
                type: BOOKING_PAYMENT_SUCCESS
            });

            return {
              isSuccess: true
            }
        }

        dispatch({
          type: BOOKING_PAYMENT_ERROR
        });

        return {
          isSuccess: false,
          errorMessage: dataCreateReservation?.createReservation?.errorMessage || ''
        }
    } catch (error) {
        dispatch({
            type: BOOKING_PAYMENT_ERROR
        });

        return {
          isSuccess: false,
          errorMessage: error
        }
    }
  }