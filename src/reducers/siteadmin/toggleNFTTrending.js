import {
    TOGGLE_NFT_TRENDING_START,
    TOGGLE_NFT_TRENDING_SUCCESS,
    TOGGLE_NFT_TRENDING_ERROR,
  } from '../../constants';

  const initialState = {
    isLoading: false,
  }
  
  export default function toggleNFTTrending(state = initialState, action) {
    switch (action.type) {
  
      case TOGGLE_NFT_TRENDING_START:
        return {
          ...state,
        isLoading: true,
        };
  
      case TOGGLE_NFT_TRENDING_SUCCESS:
        return {
          ...state,
          isLoading: false,
        };
  
      case TOGGLE_NFT_TRENDING_ERROR:
        return {
          ...state,
          isLoading: false,
        };
  
      default:
        return state;
    }
  }