import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import {
  GUEST_MINT_NFT_START,
  GUEST_MINT_NFT_SUCCESS,
  GUEST_MINT_NFT_ERROR,
  SHOW_GLOBAL_INDICATOR,
  HIDE_GLOBAL_INDICATOR
} from '../../constants';
import { integrateWithWallet } from "./integrateWithWallet";

let mutation = gql`
  mutation createNFT(
    $listId: Int!, 
    $checkIn: String!,
    $checkOut: String!,
    $thumbnail: String,
    $roomType: String,
    $houseType: String,
    $name: String!,
    $country: String!,
    $city: String!,
    $address: String!,
    $detail: String,
    $uri: String,
    $guestNumber: Int!,
    $beds: Int!,
    $owner: String,
    $originalOwner: String,
    $canBooking: Boolean!,
    $tokenId: Int
    $reservationId: Int,
    $requestUser: String,
    $claimWallet: String,
    $isMintByReservation: Boolean
  ){
    createNFT(
        listId: $listId,
        checkIn: $checkIn,
        checkOut: $checkOut,
        thumbnail: $thumbnail,
        roomType: $roomType,
        houseType: $houseType,
        name: $name,
        country: $country,
        city: $city,
        address: $address,
        guestNumber: $guestNumber,
        beds: $beds,
        detail: $detail,
        uri: $uri,
        owner: $owner,
        originalOwner: $originalOwner,
        canBooking: $canBooking,
        tokenId: $tokenId,
        reservationId: $reservationId,
        requestUser: $requestUser,
        claimWallet: $claimWallet,
        isMintByReservation: $isMintByReservation
      ) {
          status
          errorMessage
          results {
            nftId
            mintData {
              signedMessage, 
              mintingNonce, 
              delegatee, 
              recipient, 
              mut, 
              uri,
              tokenId
            }
          }
      }
  }
`;

let mutationMintNFTFailed = gql`
  mutation mintNFTFailed($nftId: Int!, $isMintWithAdmin: Boolean) {
    mintNFTFailed(nftId: $nftId, isMintWithAdmin: $isMintWithAdmin) {
      status
      errorMessage
    }
  }
`

let mutationCheckIsNFTMinted = gql`
  mutation checkIsNFTMinted($nftId: Int!) {
    checkIsNFTMinted(nftId: $nftId) {
      status
      errorMessage
    }
  } 
`

export function guestMintNFT({ 
  nftId, 
  effectGlobal = true, 
  showMessage = true 
}) {

  return async (dispatch, getState, { client }) => {
    let  errorMessage;
    let hasError = true;
    let targetNFTId;

    if (effectGlobal) {
      dispatch({
        type: SHOW_GLOBAL_INDICATOR,
      });
    }

    dispatch({
      type: GUEST_MINT_NFT_START,
    });

    try {
      // Create new NFT 
      const { data: createNFTData } = await client.mutate({
        mutation,
        variables: {
          ...payload,
          isMintByReservation
        }
      });

      if (createNFTData?.createNFT?.status === 200) {
        targetNFTId = createNFTData.createNFT.results?.nftId

        if (!isMintByReservation) {
          // Integrate with metamask
          const { 
            mintData: { tokenId, signedMessage, mintingNonce, delegatee, recipient, mut, uri } = {}
          } = createNFTData.createNFT.results || {}

          const { success: isTransactionSuccess} = await integrateWithWallet({ 
            params: [tokenId, mintingNonce, delegatee, recipient, mut, uri], 
            signedMessage 
          })

          if (isTransactionSuccess) {
            hasError = false;
          } else {
            errorMessage = "Transaction error";
          }
        } else {
          hasError = false;
        }
      } else {
        errorMessage = createNFTData?.createNFT?.errorMessage;
      }
    } catch (error) {
      console.log("error", error)
      errorMessage = "Mint NFT failed.";
    }

    if (hasError) {

      // Burn NFT
      if (targetNFTId) {
        client.mutate({
          mutation: mutationMintNFTFailed,
          variables: {
            nftId: targetNFTId,
            isMintWithAdmin: isMintByReservation
          }
        })
      }
  
      dispatch({
        type: GUEST_MINT_NFT_ERROR,
        payload: {
          error: errorMessage
        }
      });
      
      if (showMessage) {
        toastr.error('Error Occurred!', errorMessage);
      }
    } else {

      const { data } = await client.mutate({
        mutation: mutationCheckIsNFTMinted,
        variables: {
          nftId: targetNFTId
        }
      })

      if (data?.checkIsNFTMinted?.status === 200) {
        dispatch({
          type: GUEST_MINT_NFT_SUCCESS,
        });
  
        if (showMessage) {
          toastr.success("Success", "Claim NFT Success");
        }
        // history.push("/inventory")
      } else {
        if (showMessage) {
          toastr.error('Error Occurred!', 'NFT is not minted');
        }

        dispatch({
          type: GUEST_MINT_NFT_ERROR,
        });
      }
    }

    if (effectGlobal) {
      dispatch({
        type: HIDE_GLOBAL_INDICATOR,
      });
    }

    return !hasError;
  };
}