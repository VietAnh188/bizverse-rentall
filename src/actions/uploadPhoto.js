import axios from "axios";

import {
ADD_PHOTO_ERROR,
ADD_PHOTO_START,
ADD_PHOTO_SUCCESS,
REMOVE_PHOTO_ERROR,
REMOVE_PHOTO_START,
REMOVE_PHOTO_SUCCESS
} from '../constants';

export function uploadPhoto(file) {

  return async (dispatch) => {

    dispatch({
      type: ADD_PHOTO_START,
    });
    
    try {
      const data = new FormData();
      data.append('file', file);
      const response = await axios.post('/uploadThumbnail', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })

      if (response?.data) {
        dispatch({
          type: ADD_PHOTO_SUCCESS,
          payload: {
            srcImage: response.data.fullLink,
          }
        });
      }
    } catch (error) {
      dispatch({
        type: ADD_PHOTO_ERROR,
      });
      return false;
    }

    return true;
  };
}

export function removePhoto(linkRemove) {
  return async (dispatch) => {
    
    dispatch({
      type: REMOVE_PHOTO_START,
    });
    
    try {
      const response = await axios.delete('/removeThumbnail', {data: {filename: linkRemove}});

      if (response?.data) {
        dispatch({
          type: REMOVE_PHOTO_SUCCESS,
        });
      }
    } catch (error) {
      dispatch({
        type: REMOVE_PHOTO_ERROR,
      });
      return false;
    }

    return true;
  };
}
