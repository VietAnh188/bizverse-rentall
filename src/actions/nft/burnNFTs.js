import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import {
  SHOW_GLOBAL_INDICATOR,
  HIDE_GLOBAL_INDICATOR
} from '../../constants';

const mutation = gql`
mutation ($nftIds: [Int]!) {
    burnNFTs (nftIds: $nftIds) {
      results {
        nftIds
      }
      status
      errorMessage
    }
  }
`;

export function burnNFTs({ 
    nftIds,
    effectGlobal = true, 
    showMessage = true 
}) {
    return async (dispatch, getState, { client }) => {
        let hasError = true;
        let errorMessage;

        if (effectGlobal) {
            dispatch({
                type: SHOW_GLOBAL_INDICATOR
            });
        }

        try {
            const { data } = await client.mutate({
                mutation,
                variables: {
                    nftIds
                }
            });

            if (data?.burnNFTs?.status === 200) {
                hasError = false;
            } else {
                errorMessage = data?.burnNFTs?.errorMessage
            }        
        } catch (error) {
            errorMessage = error.message;
        }

        if (hasError) {
            if (showMessage) {
                toastr.error("Failed", errorMessage || "Burn NFTs failed, please try later.")
            }

            if (effectGlobal) {
                dispatch({
                    type: HIDE_GLOBAL_INDICATOR
                });
            }
            
        } else {
            if (effectGlobal) {
                dispatch({
                    type: HIDE_GLOBAL_INDICATOR
                });
            }

            if (showMessage) {
                toastr.success("Success", `Your ${nftIds.length} ${nftIds.length === 1 ? 'NFT is burnt' : "NFTs are burnt"}`);
            }
        }

        return !hasError
    };
}
