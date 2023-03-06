import { gql } from 'react-apollo';
// Toaster
import { toastr } from 'react-redux-toastr';

import {
  CANCEL_SUBMIT_LISTING_START,
  CANCEL_SUBMIT_LISTING_SUCCESS,
  CANCEL_SUBMIT_LISTING_ERROR,
} from '../../constants';

export function cancelSubmitListing(listId) {

    return async (dispatch, getState, { client }) => {
  
      dispatch({
        type: CANCEL_SUBMIT_LISTING_START,
        payload: {}
      });
  
      let mutation = gql`
              mutation cancelSubmitListing($id: Int){
                  cancelSubmitListing(id: $id){
                      id
                      status
                  }
              }
          `;
  
      try {
        const { data } = await client.mutate({
          mutation,
          variables: {
            id: listId
          },
        });

        if (data?.cancelSubmitListing?.status?.toString() === '200') {
            toastr.success('Success!', 'Listing is cancelled submitting successfully!');

            dispatch({
              type: CANCEL_SUBMIT_LISTING_SUCCESS,
              payload: {}
            });
        } else {
          toastr.error("Failed Action!");

          dispatch({
            type: CANCEL_SUBMIT_LISTING_ERROR,
            payload: {}
          });
        }
  
      } catch (error) {
        toastr.error("Failed Action!");

        dispatch({
          type: CANCEL_SUBMIT_LISTING_ERROR,
          payload: {
            error
          }
        });
      }
    };
  }