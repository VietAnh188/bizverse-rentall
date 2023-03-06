import {
    ADD_PHOTO_ERROR,
    ADD_PHOTO_START,
    ADD_PHOTO_SUCCESS,
    REMOVE_PHOTO_ERROR,
    REMOVE_PHOTO_START,
    REMOVE_PHOTO_SUCCESS
  } from '../constants';

  const initialState = {
    isProccessing: false,
    currentLink: null,
  }
  
  export default function uploadPhoto(state = initialState, action) {
    switch (action.type) {
      case ADD_PHOTO_START:
        return {
          ...state,
          isProccessing: true,
          currentLink: null,
        };
  
      case ADD_PHOTO_SUCCESS:
        return {
          ...state,
          isProccessing: false,
          currentLink: action.payload.srcImage,
        };
  
      case ADD_PHOTO_ERROR:
        return {
          ...state,
          isProccessing: false,
        };

      case REMOVE_PHOTO_START:
        return {
          ...state,
          isProccessing: true,
        };
    
      case REMOVE_PHOTO_SUCCESS:
        return {
          ...state,
          isProccessing: false,
          currentLink: null,
        };
    
      case REMOVE_PHOTO_ERROR:
        return {
          ...state,
          isProccessing: false,
        };
  
      default:
        return state;
    }
  }