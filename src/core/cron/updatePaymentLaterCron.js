const CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';

const updatePaymentLaterCron = app => {
    console.log("/********************************************/");
	console.log("HOLY MOLY PAYMENT LATER CRON STARTED");
    new CronJob('0 0 * * *', async function() {
        // cron run every day to update payment later trip
        try {
            await sequelize.query(`
                UPDATE 
                    ${process.env.DATABASE_DBNAME}.Reservation
                SET
                    reservationState = 'expired' 
                WHERE
                    isPayLater = TRUE
                        AND reservationState = 'pending'
                        AND paymentState = 'pending'
                        AND createdAt < DATE_SUB(NOW(), INTERVAL 1 DAY)
                        AND id <> 0;`)
            console.log("HOLY MOLY PAYMENT LATER CRON COMPLETED");
            console.log("/********************************************/");
        } catch (err) {
            console.log("HOLY MOLY PAYMENT LATER CRON ERROR");
			console.log("ERROR: ", err);
			console.log("/********************************************/");
        }
    }, null, true, 'Asia/Ho_Chi_Minh')
};

export default updatePaymentLaterCron;