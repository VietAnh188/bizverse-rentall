import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import {
  SHOW_GLOBAL_INDICATOR,
  HIDE_GLOBAL_INDICATOR
} from '../../constants';

// Actions
import { integrateWithWallet } from "./integrateWithWallet";

const mutationGuestMintNFT = gql`
mutation ($nftId: Int!) {
    guestMintNFT (nftId: $nftId) {
      result {
        tokenId
        mintingNonce
        delegatee
        recipient
        mut
        uri
        signedMessage
      }
      status
      errorMessage
    }
  }
`;

const mutation = gql`
mutation ($nftId: Int!) {
    claimNFT (nftId: $nftId) {
      results {
        nftIds
      }
      status
      errorMessage
    }
  }
`;

export function claimNFT({ 
    nftId,
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
            const { data: guestMintData } = await client.mutate({
                mutation: mutationGuestMintNFT,
                variables: {
                    nftId
                }
            });

            if (guestMintData?.guestMintNFT?.status === 200) {
                const { result, isMinted } = guestMintData.guestMintNFT;
                let isMintedSuccess = isMinted;

                if (!isMinted) {
                    // Integrate with metamask
                    const { 
                        tokenId, 
                        signedMessage, 
                        mintingNonce, 
                        delegatee, 
                        recipient, 
                        mut, 
                        uri
                    } = result
                    const { success: isTransactionSuccess} = await integrateWithWallet({ 
                        params: [tokenId, mintingNonce, delegatee, recipient, mut, uri], 
                        signedMessage 
                    })

                    isMintedSuccess = isTransactionSuccess;
                }

                if (isMintedSuccess) {
                    const { data } = await client.mutate({
                        mutation,
                        variables: {
                            nftId
                        }
                    });
        
                    if (data?.claimNFT?.status === 200) {
                        hasError = false;
                    } else {
                        errorMessage = data?.claimNFT?.errorMessage
                    } 


                } else {
                    errorMessage = "Transaction error";
                }
            } else {
                errorMessage = guestMintData?.guestMintNFT?.errorMessage ||  "Mint NFT failed"
            }
        } catch (error) {
            errorMessage = error.message;
        }

        if (hasError) {
            if (showMessage) {
                toastr.error("Claim NFT Failed", errorMessage || "Claim NFT failed, please try later.")
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
                toastr.success("Claim NFT Success", 'You have claimed this NFT to your wallet');
            }
        }

        return !hasError
    };
}
