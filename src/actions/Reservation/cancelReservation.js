import { gql } from 'react-apollo';
// Toaster
import { toastr } from 'react-redux-toastr';
import {
  CANCEL_RESERVATION_START,
  CANCEL_RESERVATION_SUCCESS,
  CANCEL_RESERVATION_STATE_ERROR,
  SHOW_GLOBAL_INDICATOR,
  HIDE_GLOBAL_INDICATOR
} from '../../constants';
import history from '../../core/history';
import getAllReservationQuery from './getAllReservationQuery.graphql';
import { burnWithWallet } from '../nft/integrateWithWallet';
import { ADMIN_WALLET } from '../../config';

// Helpers
import { getWallet } from '../../helpers/getWallet';

export function cancel(
  reservationId,
  cancellationPolicy,
  refundToGuest,
  payoutToHost,
  guestServiceFee,
  hostServiceFee,
  total,
  currency,
  threadId,
  cancelledBy,
  message,
  checkIn,
  checkOut,
  guests,
  listTitle,
  confirmationCode,
  hostName,
  guestName,
  hostEmail,
  guestEmail,
  userType
) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CANCEL_RESERVATION_START,
    });

    dispatch({
      type: SHOW_GLOBAL_INDICATOR,
    });

    try {

      const mutation = gql`
        mutation cancelReservation(
          $reservationId: Int!,
          $cancellationPolicy: String!,
          $refundToGuest: Float!,
          $payoutToHost: Float!,
          $guestServiceFee: Float!,
          $hostServiceFee: Float!,
          $total: Float!,
          $currency: String!,
          $threadId: Int!,
          $cancelledBy: String!,
          $message: String!,
          $checkIn: String!,
              $checkOut: String!,
              $guests: Int!
        ){
            cancelReservation(
              reservationId: $reservationId,
              cancellationPolicy: $cancellationPolicy,
              refundToGuest: $refundToGuest,
              payoutToHost: $payoutToHost,
              guestServiceFee: $guestServiceFee,
              hostServiceFee: $hostServiceFee,
              total: $total,
              currency: $currency,
              threadId: $threadId,
              cancelledBy: $cancelledBy,
              message: $message,
              checkIn: $checkIn,
              checkOut: $checkOut,
              guests: $guests
            ) {
                status
                errorMessage
            }
        }
      `;

      const query = gql`
        query getBurnNFTInformationBeforeCancel($reservationId: Int!) {
          getBurnNFTInformationBeforeCancel(reservationId: $reservationId) {
            status
            errorMessage
            results {
              tokenId
              guestWallet
              didClaim
            }
          }
        }
      `

      // If guest cancel, they need to send NFT to admin wallet
      let canContinue = false;
      let errorMessage;
      const { data: getBurnNFTInformationBeforeCancelData } = await client.query({
        query,
        variables: {
          reservationId
        }
      })

      if (getBurnNFTInformationBeforeCancelData?.getBurnNFTInformationBeforeCancel?.status !== 200) {
          toastr.error("Cancel Reservation", 
            getBurnNFTInformationBeforeCancelData?.getBurnNFTInformationBeforeCancel?.errorMessage 
            || "Get NFT information before cancel failed"
          );
          dispatch({
            type: CANCEL_RESERVATION_STATE_ERROR,
            payload: {
              error: {}
            }
          });
          dispatch({
            type: HIDE_GLOBAL_INDICATOR,
          });

          return false
      }

      const { tokenId, guestWallet, didClaim } = getBurnNFTInformationBeforeCancelData.getBurnNFTInformationBeforeCancel.results || {}
      

      if (cancelledBy === 'guest') { 
        if (didClaim) {
          const { error, wallet: connectedWallet } = await getWallet();

          if (error) {
            toastr.error("Connect wallet failed!", error);

            dispatch({
              type: CANCEL_RESERVATION_STATE_ERROR,
              payload: {
                error
              }
            });
            dispatch({
              type: HIDE_GLOBAL_INDICATOR,
            });
            
            return false;
          }

          if (connectedWallet.toLowerCase() !== guestWallet.toLowerCase()) {
            toastr.error("Connect wallet failed!", "Current connect wallet is different with your wallet from social account");

            dispatch({
              type: CANCEL_RESERVATION_STATE_ERROR,
              payload: {
                error: "Connect wallet failed"
              }
            });
            dispatch({
              type: HIDE_GLOBAL_INDICATOR,
            });

            return false;
          }
          
          const { success: isTransactionSuccess} = await burnWithWallet({
            from: guestWallet.toLowerCase(), 
            to: ADMIN_WALLET.toLowerCase(), 
            tokenId
          })

          canContinue = isTransactionSuccess;
        } else {
          canContinue = true
        }
      } else if (cancelledBy === 'host') {
        if (didClaim) {
          errorMessage = 'Guest claimed this NFT'
        } else {
          canContinue = true;
        }
      }

      if (canContinue) {
        const { data } = await client.mutate({
          mutation,
          variables: {
            reservationId,
            cancellationPolicy,
            refundToGuest,
            payoutToHost,
            guestServiceFee,
            hostServiceFee,
            total,
            currency,
            threadId,
            cancelledBy,
            message,
            checkIn,
            checkOut,
            guests
          },
          refetchQueries: [
            {
              query: getAllReservationQuery,
              variables: {
                userType,
                currentPage: 1,
                dateFilter: 'current'
              },
            }
          ]
        });
  
        if (data && data.cancelReservation && data.cancelReservation.status === '200') {
          dispatch({
            type: CANCEL_RESERVATION_SUCCESS,
          });
          toastr.success("Cancel Reservation", "Reservation cancelled successfully");
          if (cancelledBy === 'host') {
            window.location.replace('/reservation/current');
          } else {
            window.location.replace('/trips/current');
          }
        }
  
        if (data && data.cancelReservation && data.cancelReservation.status === '400') {
          dispatch({
            type: CANCEL_RESERVATION_SUCCESS,
          });
          toastr.error("Cancel Reservation", "It looks like your reservation is already updated!");
        }
      } else {
        toastr.error("Cancel Reservation", errorMessage ||  "Delete NFT failed");

        dispatch({
          type: CANCEL_RESERVATION_STATE_ERROR,
          payload: {
            error: {}
          }
        });
        dispatch({
          type: HIDE_GLOBAL_INDICATOR,
        });

        return false;
      }

    } catch (error) {
      dispatch({
        type: CANCEL_RESERVATION_STATE_ERROR,
        payload: {
          error
        }
      });
      dispatch({
        type: HIDE_GLOBAL_INDICATOR,
      });
      return false;
    }

    dispatch({
      type: HIDE_GLOBAL_INDICATOR,
    });
    return true;
  };
}