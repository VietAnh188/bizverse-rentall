import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import {
  SHOW_GLOBAL_INDICATOR,
  HIDE_GLOBAL_INDICATOR
} from '../../constants';

const mutation = gql`
mutation ($nftIds: [Int]!) {
    pushNFTsToMarketplace (nftIds: $nftIds) {
      results {
        nftIds
      }
      status
      errorMessage
    }
  }
`;

export function pushNFTsToMarketplace(nftIds) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: SHOW_GLOBAL_INDICATOR
        });

        try {
            const { data } = await client.mutate({
                mutation,
                variables: {
                    nftIds
                }
            });

            if (data?.pushNFTsToMarketplace?.status === 200) {
                dispatch({
                    type: HIDE_GLOBAL_INDICATOR,
                })

                toastr.success("Success", `Your ${nftIds.length} ${nftIds.length === 1 ? 'NFT is pushed to Marketplace' : "NFTs are pushed to Marketplace"}`);

                return true;
            } else {
                toastr.error("Failed", data?.pushNFTsToMarketplace?.errorMessage || "Something error.")

                dispatch({
                    type: HIDE_GLOBAL_INDICATOR
                });

                return false
            }
        } catch (error) {
            toastr.error("Failed", error.message)

            dispatch({
                type: HIDE_GLOBAL_INDICATOR
            });

            return false;
        }
    };
}
