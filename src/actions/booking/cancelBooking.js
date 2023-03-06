import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import {
  CANCEL_BOOKING_ERROR,
  CANCEL_BOOKING_START,
  CANCEL_BOOKING_SUCCESS,
  SHOW_GLOBAL_INDICATOR,
  HIDE_GLOBAL_INDICATOR
} from '../../constants';

const mutationCancelBooking = gql`
  mutation (
    $reservationId: Int!
  ) {
    cancelBooking (
      reservationId: $reservationId
    ) {
      status
      errorMessage
    }
  }
`;

export const cancelBooking = ({ reservationId }) => async (dispatch, getState, { client }) => {
    dispatch({
        type: CANCEL_BOOKING_START,
        payload: {}
    });
    dispatch({
        type: SHOW_GLOBAL_INDICATOR,
    });

    try {
        const { data } = await client.mutate({
            mutation: mutationCancelBooking,
            variables: {
                reservationId
            },
            fetchPolicy: 'network-only'
        })
        
        if (data?.cancelBooking?.status === 200 ) {
            dispatch({
                type: CANCEL_BOOKING_SUCCESS,
                payload: {}
            });

            toastr.success("Action success", "Booking is cancelled!")
            window.location.reload();
        } else {
            toastr.error("Action Failed", data?.cancelBooking?.errorMessage || "Cancel booking is failed")

            dispatch({
                type: CANCEL_BOOKING_ERROR,
                payload: {}
            });
        }
    } catch (error) {
        toastr.error("Action Failed", "Something error" + error.message)
        dispatch({
            type: CANCEL_BOOKING_ERROR,
            payload: {
                error
            }
        });
    }

    dispatch({
        type: HIDE_GLOBAL_INDICATOR,
    });
  }