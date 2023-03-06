const CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';
import * as config from '../../config';
import checkTransaction from '../../data/queries/Payment/checkTransaction';
import { handleOnPaymentSuccess } from '../../core/payment/handleOnPaymentSuccess'
import { Transaction } from '../../data/models';

const callOneFinPromise = (transaction) => {
    return new Promise((resolve, reject) => {
        return checkTransaction(transaction.transactionId).then(data=>{
            resolve({
                ...transaction,
                oneFinStatus: data
            })}).catch(reject);
    })
}

const updateReservationWithOneFinPaymentMethodCron = app =>{
    console.log("/********************************************/");
	console.log("HOLY MOLY RESERVATION WITH ONE_FIN PAYMENT CRON STARTED");
    new CronJob('*/15 * * * *', async function() {
        // cron run every 15 minutes to update one fin transaction 
        try {
            const transactionPending = await sequelize.query(`
            SELECT 
                 Res.createdAt, Res.reservationState, Res.paymentState,
                 Trx.transactionId, Trx.reservationId, Trx.status as transactionStatus, Trx.id as transactionIndex
             FROM
                 ${process.env.DATABASE_DBNAME}.Reservation Res
                     LEFT JOIN
                 ${process.env.DATABASE_DBNAME}.Transaction Trx ON  Res.id = Trx.reservationId
             WHERE
                 Res.createdAt < DATE_SUB(NOW(), INTERVAL 15 MINUTE)
                    AND Res.paymentMethodId = ${config.ONE_FIN_PAYMENT_ID}
                    AND Res.reservationState = 'pending'
                    AND Res.paymentState = 'pending'
        
        `,{ type: sequelize.QueryTypes.SELECT, raw: true, })
        
            let promises = [];
            transactionPending.forEach(transaction=>{
                promises.push(callOneFinPromise(transaction))
            })
        
            await Promise.all(promises).then(response => {
                if (response.length) {
                    response.forEach(async ({ transactionId, reservationId, oneFinStatus }) => {
                        let statusUpdate;
                        let isSuccess = false;
                        
                        switch(Number(oneFinStatus.statusId)) {
                            case 100: {
                                statusUpdate = 'APPROVED';
                                isSuccess = true;
                                break;
                            }
                            case 102: {
                                statusUpdate = 'DECLINED'
                                break;
                            }
                            case 104: {
                                statusUpdate = 'SETTLED'
                                isSuccess = true;
                                break;
                            }
                            
                            case 105: {
                                statusUpdate = 'CANCELLED'
                                break;
                            }

                            case 106: {
                            statusUpdate = 'OPENED'
                            isSuccess = true;
                            break;
                        }

                            case 107:{
                                statusUpdate = 'VOIDED'
                                break;
                            }
                            default: {
                                statusUpdate = 'VOIDED'
                            }
                        }

                        Transaction.update({
                            status: statusUpdate
                        }, {
                            where: {
                                transactionId
                            }
                        })

                        if (isSuccess) {
                            handleOnPaymentSuccess({
                                reservationId,
                                ignoreTransaction: true
                            })
                        }
                    })
                }
            }) 
            console.log("HOLY MOLY RESERVATION WITH ONE_FIN PAYMENT CRON COMPLETED");
            console.log("/********************************************/");
        } catch (err) {
            console.log("HOLY MOLY RESERVATION WITH ONE_FIN PAYMENT CRON ERROR");
			console.log("ERROR: ", err
            );
			console.log("/********************************************/");
        }
    }, null, true, 'Asia/Ho_Chi_Minh')
}

export default updateReservationWithOneFinPaymentMethodCron;