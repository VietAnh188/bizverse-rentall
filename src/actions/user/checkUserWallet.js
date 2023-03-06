import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';

// Constants
import {
  CHECK_USER_WALLET_START,
  CHECK_USER_WALLET_SUCCESS,
  CHECK_USER_WALLET_ERROR
} from '../../constants';

export function checkUserWallet({
  effectGlobal = true, 
  showMessage = true 
} = {}) {

  return async (dispatch, getState, { client }) => {
    let isOk = false, userWallet;

    dispatch({
      type: CHECK_USER_WALLET_START,
    });

    try {
      let query = gql`
        query userWalletAddress {
            userWalletAddress {
                status
                errorMessage
                results {
                    wallet
                }
          }
        } 
      `;
      // Send Request to create a record for a listing
      const { data } = await client.query({
        query,
        fetchPolicy: 'network-only'
      });

      if (data?.userWalletAddress?.status === 200) {
        const { wallet } = data.userWalletAddress.results;

        dispatch({
          type: CHECK_USER_WALLET_SUCCESS,
          payload: {
              wallet
          }
        });

        isOk = true;
        userWallet = wallet;
      } else {
        dispatch({
            type: CHECK_USER_WALLET_ERROR,
        });

        if (showMessage) {
          toastr.error("Action failed!", data?.userWalletAddress?.errorMessage || '')
        }
      }

    } catch (error) {
      dispatch({
        type: CHECK_USER_WALLET_ERROR,
      });

      if (showMessage) {
        toastr.error("Action failed!", 'Something error, please try later.')
      }
    }

    return {
      isOk,
      userWallet
    };
  };
}