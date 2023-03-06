import { gql } from 'react-apollo';
import {
  UPDATE_PHOTO_START,
  UPDATE_PHOTO_SUCCESS,
  UPDATE_PHOTO_ERROR
} from '../../constants';

export function updatePhoto({ id, isPanorama }) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: UPDATE_PHOTO_START,
    });

    try {

      let mutation = gql`
          mutation updatePhoto(
            $id: Int!, 
            $isPanorama: Boolean
          ){
              updatePhoto(
                id: $id,
                isPanorama: $isPanorama
              ) {
                  status
                  errorMessage
              }
          }
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          id,
          isPanorama
        }
      });

      if (data?.updatePhoto?.status === 200) {
        dispatch({
          type: UPDATE_PHOTO_SUCCESS,
          payload: {
              id,
              isPanorama
          }
        });
      }

    } catch (error) {
      dispatch({
        type: UPDATE_PHOTO_ERROR,
        payload: {
          error
        }
      });
    }
  };
}