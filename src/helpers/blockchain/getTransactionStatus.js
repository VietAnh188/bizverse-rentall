import axios from 'axios';
import { networks } from '../../constants/nft';

export const TRANSACTION_STATUS = {
    pending: 'pending',
    success: 'success',
    fail: 'fail'
}

export const TRANSACTION_STATUS_CODE = {
    success: '0x1',
    fail: '0x0'
}

export const getTransactionStatus = async txhash => {
    const chain = process.env.NODE_ENV === 'production' ? networks[0] : networks[1]
    const rpcUrls = chain.rpcUrls[0];
  
    return await axios.post(rpcUrls, {
        method: 'eth_getTransactionReceipt', params: [txhash], id: Date.now(), jsonrpc: "2.0",
      }).then(response => {
        if (response.data?.result) {
            const { status } = response.data.result

            if (String(status).toLowerCase() === TRANSACTION_STATUS_CODE.success) {
                return TRANSACTION_STATUS.success
            }

            if (String(status).toLowerCase() === TRANSACTION_STATUS_CODE.fail) {
                return TRANSACTION_STATUS.fail
            }
        }

        if (response.data?.error) {
            return TRANSACTION_STATUS.fail
        }

        return TRANSACTION_STATUS.pending
      }).catch(error => {
        console.log("-------------- GET TRANSACTION STATUS ERROR ----------------------", error)
        return TRANSACTION_STATUS.pending
      })
  };
