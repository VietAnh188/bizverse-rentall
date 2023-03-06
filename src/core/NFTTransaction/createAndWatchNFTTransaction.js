import { NFTTransaction } from '../../data/models'
import { TRANSACTION_STATUS } from '../../helpers/blockchain/getTransactionStatus'
// import { getTransactionStatus, TRANSACTION_STATUS } from '../../helpers/blockchain/getTransactionStatus'
// import { handleOnTransactionSuccess } from './handleOnTransactionSuccess';
// import { handleOnTransactionFail } from './handleOnTransactionFail'

export const createAndWatchNFTTransaction = async (createData) => {
    try {
        // let transactionStatus = TRANSACTION_STATUS.pending
        let transactionStatus = TRANSACTION_STATUS.success

        await NFTTransaction.create({
            ...createData,
            transactionStatus
        })

        // Check Transaction status each 3s, stop when get success or fail
        // let checkTransactionStatusTimeout;
            
        // checkTransactionStatusTimeout = setInterval(async () => {
        //     const hash = createData.hash;

        //     transactionStatus = await getTransactionStatus(hash)

        //     if (transactionStatus !== TRANSACTION_STATUS.pending) {

        //         // Update transaction status to success or fail
        //         NFTTransaction.update({
        //             transactionStatus
        //         }, {
        //             where: {
        //                 hash
        //             }
        //         })

        //         // Handle on transaction success
        //         if (transactionStatus === TRANSACTION_STATUS.success) {
        //             handleOnTransactionSuccess(hash)

        //         // Handle on transaction failed
        //         } else {
        //             handleOnTransactionFail(hash)
        //         }

        //         // Stop get status of transaction
        //         clearInterval(checkTransactionStatusTimeout)
        //     }
        // }, 3000)

    } catch(error) {
        console.log("-------------------- CREATE AND WATCH NFTTransaction error -----------------------", error)
    }
}