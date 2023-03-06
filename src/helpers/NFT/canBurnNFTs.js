import axios from "axios";
import { NFT_API } from '../../config';

export const canBurnNFTs = async (tokenIds = []) => {
    try {
        const res = await axios.post(`${NFT_API}/check-burn`, { tokenIds })

        console.log("res--------------------------------------------------", JSON.stringify(res))

        return res.data?.success;
    } catch(error) {
        console.log("----------------- canBurnNFTs ----------------", JSON.stringify(error))

        return false;
    }
}