import { NFTTransaction } from '../../data/models';
import { TRANSACTION_STATUS } from '../../helpers/blockchain/getTransactionStatus'

export const handleOnTransactionFail = async (hash) => {
    try {
        const nftTransaction = await NFTTransaction.findOne({
            where: {
                hash
            },
            raw: true
        })

        if (!nftTransaction) {
            return;
        }

        const countOfNewTransactions = await NFTTransaction.count({
            where: {
                id: {
                    $gt: nftTransaction.id,
                },
                nftId: nftTransaction.nftId,
                transactionStatus: TRANSACTION_STATUS.success
            },
        })

        // Do not do anything if existing newer transactions
        if (countOfNewTransactions) {
            return;
        }
    } catch(error) {
        console.log("-------------------- handleOnTransactionFail -----------------------", error)
    }
}