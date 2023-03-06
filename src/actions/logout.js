import { gql } from 'react-apollo';

// Actions
import { setRuntimeVariable } from "./runtime";

import {
  USER_LOGOUT_START,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_ERROR,
  SET_RUNTIME_VARIABLE
} from '../constants';
import history from '../core/history';

const query = gql`
  query {
    userLogout {
    	status
    }
  }
`;

export function setUserLogout() {
  return async (dispatch, getState, { client }) => {
    try {
      // Redirect to Home page
      history.push('/login');
      
      dispatch({
        type: USER_LOGOUT_START,
      });

      localStorage.removeItem('access_token')
      localStorage.removeItem('username')
      
      client.query({ query, fetchPolicy: 'network-only' });

      // Successfully logged out
      dispatch({
        type: USER_LOGOUT_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: USER_LOGOUT_ERROR,
        payload: {
          error
        }
      });
    }
  };
}
