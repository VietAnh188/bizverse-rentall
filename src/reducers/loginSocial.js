import { GET_INFO_USER, GET_TOKEN } from "../constants";
const initialState = {
  tokenSocial: null,
  infoUserSocial: null,
};
export default function loginSocial(state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN: {
      state.tokenSocial = action.payload;
      return { ...state };
    }
    case GET_INFO_USER: {
      state.infoUserSocial = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
}
