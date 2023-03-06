import { gql } from 'react-apollo';
// Toaster
import { toastr } from 'react-redux-toastr';
import history from '../../core/history';
import getAllReservationQuery from './getAllReservationQuery.graphql';

export function confirmGuestPaid(
  reservationId
) {

  return async (dispatch, getState, { client }) => {
    try {

      const mutation = gql`
        mutation hostAcceptPaymentLater(
          $reservationId: Int!
        ){
		    hostAcceptPaymentLater(
		      reservationId: $reservationId
		    ) {
		        status
		    }
		}
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          reservationId
        },
        refetchQueries: [
          {
            query: getAllReservationQuery,
            variables: {
              userType: 'host',
              currentPage: 1,
              dateFilter: 'current'
            },
          }
        ]
      });

      if (data?.hostAcceptPaymentLater?.status === 200) {
        toastr.success("Action success", "You confirmed guest paid for the reservation");

        window.location.replace('/reservation/current');
     } else if (!!data?.hostAcceptPaymentLater?.errorMessage) {
        toastr.error("Action failed", data.hostAcceptPaymentLater.errorMessage);
     } else {
        toastr.error("Action failed", "You can not confirm that guest paid for the reservation");
     }
    } catch (error) {
        toastr.error("Action failed", "You can not confirm that guest paid for the reservation");
    }
  };
}