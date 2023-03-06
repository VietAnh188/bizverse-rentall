import {
    SAVE_TYPE_START,
    SAVE_TYPE_SUCCESS,
    SAVE_TYPE_ERROR,
    REMOVE_TYPE_START,
    REMOVE_TYPE_SUCCESS,
    REMOVE_TYPE_ERROR,
    GET_TYPE_LINK_START,
    GET_TYPE_LINK_SUCCESS,
    GET_TYPE_LINKS_ERROR
} from '../constants';

const initialState = {
  isLoading: false,
  linkList: [],
  id: null,
}
  
export default function changeTypeLink(state = initialState, action) {
  switch (action.type) {

    case SAVE_TYPE_START:
      return {
        ...state,
        isLoading: true,
      };

    case SAVE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        linkList: [...state.linkList, action.payload.linkItem],
      };

    case SAVE_TYPE_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case REMOVE_TYPE_START:
      return {
        ...state,
        isLoading: true,
      };

    case REMOVE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        linkList: state.linkList.filter(item => item.id !== action.payload.id),
      };

    case REMOVE_TYPE_ERROR:
      return {
        ...state,
        isLoading: false,
      };
      
    case GET_TYPE_LINK_START:
      return {
        ...state,
        isLoading: true,
      };

    case GET_TYPE_LINK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        linkList: action.payload.linkList,
      };

    case GET_TYPE_LINKS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}