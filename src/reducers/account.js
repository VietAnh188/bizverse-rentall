import {
  SET_USER_DATA_START,
  SET_USER_DATA_SUCCESS,
  USER_LOGOUT_SUCCESS,
  PROFILE_PICTURE_LOADER_START,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
  UPLOAD_PROFILE_PICTURE_ERROR,
  REMOVE_PROFILE_PICTURE_SUCCESS,
  REMOVE_PROFILE_PICTURE_ERROR,
  CHECK_USER_WALLET_START,
  CHECK_USER_WALLET_SUCCESS,
  CHECK_USER_WALLET_ERROR,
  SYNC_SOCIAL_START,
  SYNC_SOCIAL_SUCCESS,
  SYNC_SOCIAL_ERROR
} from '../constants';

export default function account(state = {}, action) {
  switch (action.type) {
    case SET_USER_DATA_START:
      return {
        ...state,
      };
    case SET_USER_DATA_SUCCESS:
      return {
        ...state,
        data: action.updatedProfileData,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        // data: null
      };

    case PROFILE_PICTURE_LOADER_START:
      return {
        ...state,
        profilePhotoLoading: action.payload.profilePhotoLoading
      };
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        profilePhotoLoading: action.payload.profilePhotoLoading
      };
    case UPLOAD_PROFILE_PICTURE_ERROR:
      return {
        ...state,
        profilePhotoLoading: action.payload.profilePhotoLoading
      };
    case REMOVE_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        profilePhotoLoading: action.payload.profilePhotoLoading
      };
    case REMOVE_PROFILE_PICTURE_ERROR:
      return {
        ...state,
        profilePhotoLoading: action.payload.profilePhotoLoading
      };

    case CHECK_USER_WALLET_START:
      return {
        ...state,
        isLoading: true
      }
    
    case CHECK_USER_WALLET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          wallet: action.payload.wallet
        }
      }
    case CHECK_USER_WALLET_ERROR:
      return {
        ...state,
        isLoading: false
      }

    case SYNC_SOCIAL_START:
      return {
        ...state,
        isLoading: true
      }

    case SYNC_SOCIAL_SUCCESS:
    case SYNC_SOCIAL_ERROR:
      return {
        ...state,
        isLoading: false
      }

    default:
      return state;
  }
}
