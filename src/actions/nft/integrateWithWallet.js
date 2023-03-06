import { createContract } from '../../helpers/nft';

export const integrateWithWallet = async ({ params = [], signedMessage }) => {
    try {
        const { executeContract } = await createContract();          
        const tx = await executeContract.mintWithPermit(params, signedMessage);
        const isTransactionSuccess = await tx.wait().then(async (data) => {
            // return data.status === 1;
            
            return true;
        });

        return {
            success: isTransactionSuccess
        }
    } catch(error) {
        return {
            success: false
        }
    }
}

export const burnWithWallet = async ({ from, to, tokenId }) => {
    try {
        const { executeContract } = await createContract();          
        const tx = await executeContract.transferFrom(from, to, tokenId);
        const isTransactionSuccess = await tx.wait().then(async (data) => {
            // return data.status === 1;
            
            return true;
        });

        return {
            success: isTransactionSuccess
        }
    } catch(error) {
        return {
            success: false
        }
    }
}