import axios from "axios";
import { NFT_API } from '../../config';
import { hashParams } from '../nft';

export const burnNFTs = async (tokenIds = []) => {
    try {
        const secureHash = hashParams({ tokenIds });
        const burnNFTsPayload = {
            tokenIds,
            secureHash
        }

        // Burn NFT on blockchain
        const { data: { data: burnData, success }} = await axios.post(`${NFT_API}/burn-nft`, burnNFTsPayload)

        return success;
    } catch(error) {
        console.log("----------------- Burn NFT ERROR ----------------", tokenIds, error?.response?.data)
        return false;
    }
}