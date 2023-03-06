import axios from "axios";
import { hashParams } from '../../helpers/nft';
import { getNonce } from './getNonce';
import { NFT_API } from '../../config';
// import { addHost } from '../../helpers/NFT/addHost'
import { NFT } from '../../data/models'

export const minNFT = async ({
  data: {
    id,
    address,
    thumbnail,
    checkIn,
    checkOut,
    roomType,
    name,
    country,
    guestNumber,
    beds,
    city,
    detail,
    recipient,
    issuerId,
    tokenId
  },
  isMintWithAdmin
}) => {
  const payload = {
    id,
    address,
    thumbnail,
    checkIn,
    checkOut,
    roomType,
    name,
    country,
    guestNumber,
    beds,
    city,
    detail,
    issuerId,
    tokenId,
    mutable: true
  }

  try {
    // Host can not transfer nft
    // addHost(recipient)

    if (!isMintWithAdmin) {
      const { nonce, success } = await getNonce(recipient)

      payload.recipient = recipient

      if (success) {
        payload.nonce = nonce
      }
    }
    
    if (!isMintWithAdmin && payload.nonce === undefined ) {
      return {
        success: false,
        error: "Get Nonce failed"
      }
    }

    const secureHash = hashParams(payload)

    payload.secureHash = secureHash

    const API_PATH = isMintWithAdmin ? 'mint-nft/admin' : 'mint-nft'

    const { data: { data: mintData, success: isMintSuccess } } = await axios.post(`${NFT_API}/${API_PATH}`, payload)

    if (!isMintSuccess) {
      return {
        success: false,
        data: {}
      }
    }

    if (isMintWithAdmin) {
      const { uri } = mintData

      return {
        data: {
          uri
        },
        success: true
      }
    } else {
      const { signedMessage, message: { mintingNonce, delegatee, recipient, mut, uri } } = mintData


      // Chang NFT state to minting
      await NFT.update({
        isMinting: true,
        mintedAt: new Date()
      }, {
        where: {  
          tokenId
        }
      })

      return {
        data: {
          signedMessage,
          mintingNonce,
          delegatee,
          recipient,
          mut,
          uri
        },
        success: true
      }
    }

  } catch (error) {
    console.log("-------------- Error Mint data-----------------------------------------", JSON.stringify(error))

    return {
      success: false,
      error: error.message
    };
  }
}