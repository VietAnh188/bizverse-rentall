import { SET_RUNTIME_VARIABLE, USER_LOGOUT_START } from '../constants';

export default function runtime(state = {}, action) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case USER_LOGOUT_START:

      return {
        ...state,
        isAuthenticated: false,
        isAdminAuthenticated: false,
        access_token: undefined,
        username: undefined
      }
    default:
      return state;
  }
}
