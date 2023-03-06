import { gql } from 'react-apollo';
import {
  ONE_FIN_PAYMENT_REQUEST_ERROR,
  ONE_FIN_PAYMENT_REQUEST_START,
  ONE_FIN_PAYMENT_REQUEST_SUCCESS
} from '../../constants';

const mutationPaymentRequest = gql`
  mutation (
    $reservationId: Int!,
    $paymentMethod: Int!,
    $convertCurrency: String!,
    $paymentType: Int!
  ) {
    guestPaymentOnlineForPayLaterReservation (
      reservationId: $reservationId,
      paymentMethod: $paymentMethod,
      convertCurrency: $convertCurrency,
      paymentType: $paymentType
    ) {
      results {
        paymentURL
      }
      status
      errorMessage
    }
  }
`;

export const requestOneFinPaymentLater = (payload) => async (dispatch, getState, { client }) => {
    dispatch({
        type: ONE_FIN_PAYMENT_REQUEST_START,
        payload: {}
    });

    try {
        const { data } = await client.mutate({
            mutation: mutationPaymentRequest,
            variables: payload,
            fetchPolicy: 'network-only'
        })
        
        if (data?.guestPaymentOnlineForPayLaterReservation?.status === 200 ) {
            dispatch({
                type: ONE_FIN_PAYMENT_REQUEST_SUCCESS,
                payload: {
                    paymentURL: data.guestPaymentOnlineForPayLaterReservation.results.paymentURL
                }
            });
        }
    } catch (error) {
      dispatch({
        type: ONE_FIN_PAYMENT_REQUEST_ERROR,
        payload: {
            error
        }
      });
    }
  }