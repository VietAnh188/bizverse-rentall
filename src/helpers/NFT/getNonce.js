import axios from "axios";
import { NFT_API } from '../../config';

export const getNonce = async (wallet) => {

  try {
    const { data: { data: { nonce } = {}, success } } = await axios.get(`${NFT_API}/query/nonce/${wallet}`)

    return {
      success,
      nonce
    }

  } catch (error) {
    return {
      success: false,
      error
    };
  }
}