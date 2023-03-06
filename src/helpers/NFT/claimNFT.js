import axios from "axios";
import { NFT_API } from '../../config';
import { hashParams } from '../nft';

export const claimNFT = async ({ tokenId, recipient }) => {
    try {
        const payload = { tokenId, recipient }
        const secureHash = hashParams(payload);
        payload.secureHash = secureHash

        // Claim NFT on blockchain
        const { data: { data: claimData, success }} = await axios.post(`${NFT_API}/excute/withdraw`, payload)

        return success;
    } catch(error) {
        console.log("----------------- Claim NFT ERROR ----------------", error?.response?.data)
        return false;
    }
}