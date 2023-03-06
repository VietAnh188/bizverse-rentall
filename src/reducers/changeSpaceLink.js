import {
    SAVE_SPACE_START,
    SAVE_SPACE_SUCCESS,
    SAVE_SPACE_ERROR,
    REMOVE_TYPE_SPACE_START,
    REMOVE_TYPE_SPACE_SUCCESS,
    REMOVE_TYPE_SPACE_ERROR,
    GET_SPACE_LINK_START,
    GET_SPACE_LINK_SUCCESS,
    GET_SPACE_LINKS_ERROR
  } from '../constants';

  const initialState = {
    isLoading: false,
    linkList: [],
    id: null,
  }
  
  export default function changeSpaceLink(state = initialState, action) {
    switch (action.type) {
  
      case SAVE_SPACE_START:
        return {
          ...state,
          isLoading: true,
        };
  
      case SAVE_SPACE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          linkList: [...state.linkList, action.payload.linkItem],
        };
  
      case SAVE_SPACE_ERROR:
        return {
          ...state,
          isLoading: false,
        };
  
      case REMOVE_TYPE_SPACE_START:
        return {
          ...state,
          isLoading: true,
        };
  
      case REMOVE_TYPE_SPACE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          linkList: state.linkList.filter(item => item.id !== action.payload.id),
        };
  
      case REMOVE_TYPE_SPACE_ERROR:
        return {
          ...state,
          isLoading: false,
        };
        
      case GET_SPACE_LINK_START:
        return {
          ...state,
          isLoading: true,
        };
  
      case GET_SPACE_LINK_SUCCESS:
        return {
          ...state,
          isLoading: false,
          linkList: action.payload.linkList,
        };
  
      case GET_SPACE_LINKS_ERROR:
        return {
          ...state,
          isLoading: false,
        };
  
      default:
        return state;
    }
  }