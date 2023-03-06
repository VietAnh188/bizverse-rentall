import { gql } from 'react-apollo';

import {
    TOGGLE_NFT_TRENDING_START,
    TOGGLE_NFT_TRENDING_SUCCESS,
    TOGGLE_NFT_TRENDING_ERROR,
} from '../constants';

const mutation = gql`
    mutation ($nftId: Int!, $isTrending: Boolean) {
        toggleTrendingNFT(
            nftId: $nftId, isTrending: $isTrending
        ) {
            results {
                id
                isTrending
            }
            status
            errorMessage
        }
    }
`;

export function toggleNFTTrending(id, isTrending) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: TOGGLE_NFT_TRENDING_START });
    
    try {
      const { data } = await client.mutate({
        mutation,
        variables: {
          nftId: id,
          isTrending: !isTrending
        },
        fetchPolicy: 'network-only'
      });

      if (data.toggleTrendingNFT.status === 200) {
        dispatch({ type: TOGGLE_NFT_TRENDING_SUCCESS,
          payload: {
            isTrending: data.toggleTrendingNFT.results.isTrending,
          }
         });
      }
    } catch (error) {
      dispatch({
        type: TOGGLE_NFT_TRENDING_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
