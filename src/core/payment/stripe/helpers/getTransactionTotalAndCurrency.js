import { Transaction } from '../../../../data/models'
/**
 * 
 * @param {Number} reservationId 
 * @param {Number} transactionId 
 * @returns { Promise<[Number, String]> }
 * @description return total, currency of transaction
 */
export const getTransactionTotalAndCurrency = async (reservationId, transactionId) => {
    try {
        const transaction = await Transaction.findOne({
            where: {
                reservationId,
                transactionId
            },
            raw: true,
            attributes: ['currency', 'total']
        });
        if(transaction && transaction.currency && transaction.total){
            return [transaction.total, transaction.currency];
        }
        return [null, null]
    } catch (error) {
        return [null, null]
    }
}