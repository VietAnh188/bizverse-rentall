import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import {
  SHOW_GLOBAL_INDICATOR, 
  HIDE_GLOBAL_INDICATOR
} from '../../constants';

const mutation = gql`
  mutation {
    syncBizverseSocial {
      status
      errorMessage
    }
  }
`;

export const syncBizverseSocial = () => {
    return async (dispatch, getState, { client }) => {
        try {
            dispatch({
              type: SHOW_GLOBAL_INDICATOR,
            });

            const { data } = await client.mutate({
                mutation
            });

            if (data?.syncBizverseSocial?.status === 200) {
              dispatch({
                type: HIDE_GLOBAL_INDICATOR,
              });

              toastr.success('Success!', 'Your information is synced with social!');
              window.location.reload();
            } else {
              dispatch({
                type: HIDE_GLOBAL_INDICATOR,
              });

              toastr.error('Failed!', data?.syncBizverseSocial?.errorMessage);
            }
        } catch(error) { 
          dispatch({
            type: HIDE_GLOBAL_INDICATOR,
          });
          toastr.error('Failed!', 'Something error, please try later!');
        }
    }
}