import { gql } from 'react-apollo';

import history from '../../core/history';
import {
  GET_USER_PAYOUT_START,
  GET_USER_PAYOUT_SUCCESS,
  GET_USER_PAYOUT_ERROR,
} from '../../constants';

export function getUserPayout() {

  return async (dispatch, getState, { client }) => {
    let payload = {};

    dispatch({
      type: GET_USER_PAYOUT_START,
    });

    try {

      let query = gql`
        query getUserPayout {
            getUserPayout {
                id
                methodId
                payEmail
                currency
            }
        }
      `;

      const { data } = await client.query({
        query
      });

      if (data && data.getUserPayout) {
        payload = {
            data: data.getUserPayout
        }

        dispatch({
          type: GET_USER_PAYOUT_SUCCESS,
          payload
        });
      }
    } catch (error) {
      dispatch({
        type: GET_USER_PAYOUT_ERROR,
        payload: {
          error
        }
      });
    }

    return payload;
  };
}