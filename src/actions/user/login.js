import axios from "axios";
import { toastr } from 'react-redux-toastr';
import { gql } from 'react-apollo';
import { bizverseLinkSocialApp, bizverseAppId, bizverseAppSecret } from "../../config";
import { setRuntimeVariable } from "../runtime";
import { loadAccount } from '../account'

import { SHOW_GLOBAL_INDICATOR, HIDE_GLOBAL_INDICATOR } from '../../constants'

// Core
import history from '../../core/history';

const query = gql`
  query ($access_token: String!) {
    userLogin (access_token:$access_token) {
      status
      errorMessage
      result {
        token
        userBanStatus
      }
    }
  }
`;

export function login(code) {
  return async (dispatch, getState, { client }) => {
    let hasError = true;
    let errorMessage;

    try {
      dispatch({
        type: SHOW_GLOBAL_INDICATOR
      })
      const response = await axios({
        method: "GET",
        url: `${bizverseLinkSocialApp}authorize?app_id=${bizverseAppId}&app_secret=${bizverseAppSecret}&code=${code}`,
      });

      if (response?.data?.status == 200) {
        const { access_token } = response.data;
        const { data } = await client.query({
          query,
          variables: { access_token },
          fetchPolicy: 'network-only'
        })
      
        if (data?.userLogin?.result?.token) {
          const { result: { token, userBanStatus } } = data.userLogin

          if (userBanStatus) {
            errorMessage = "Your account was banned, please contact admin for more information."
          } else {
            hasError = false;
      
            dispatch(setRuntimeVariable({ name: 'isAuthenticated', value: true }))
            dispatch(loadAccount())
            dispatch({
              type: HIDE_GLOBAL_INDICATOR
            })

            localStorage.setItem('access_token', token);
            history.push('/')
          }
        } else {
          errorMessage = data?.userLogin?.errorMessage
        }
      } else {
        errorMessage = 'Something error when login on Bizverse social.'
      }
    } catch (error) {
      errorMessage = error.message;
    }

    if (hasError) {
      toastr.error('Error Occured!', errorMessage || 'Something error, please try again later');

      // Clear authenticate information
      dispatch(setRuntimeVariable({ name: 'isAuthenticated', value: false }))
      dispatch(setRuntimeVariable({ name: 'isAdminAuthenticated', value: false }))
      dispatch({
        type: HIDE_GLOBAL_INDICATOR
      })
      
      localStorage.removeItem('access_token')
      history.push("/")
    }
  };
}