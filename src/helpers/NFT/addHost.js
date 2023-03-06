import axios from "axios";
import { NFT_API } from '../../config';
import { hashParams } from '../nft';

export const addHost = async (address) => {
    try {
        const { data: { data: { result } = { result: false } } } = await axios.get(`${NFT_API}/host/isHost/${address}`)

        if (!result) {
            const secureHash = hashParams({ address })
            const { data: { success } = {}} = await axios.post(`${NFT_API}/host/add`, { address, secureHash })
    
            return success
        }

        return false;
    } catch(error) {
        console.log("----------------------------------- add host error --------------------", JSON.stringify(error))
    }
}