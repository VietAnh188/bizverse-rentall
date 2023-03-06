var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(10);
import sequelize from '../../data/sequelize';
import { Reservation, ListBlockedDates, ThreadItems, SiteSettings, Threads } from '../../data/models';
import { emailBroadcast } from './expiredEmail';

const updateReservationExpire = app => {

	new CronJob('*/20 * * * *', async function () { // Run every day on 11.55 PM

		console.log("/********************************************/");
		console.log("HOLY MOLY RESERVATION EXPIRE CRON STARTED");

		let emailLogo;
		let getEmailLogo = await SiteSettings.findOne({
			where: {
				title: 'Email Logo'
			},
			raw: true
		});

		emailLogo = getEmailLogo && getEmailLogo.value;

		// get all reservation id
		// const getReservationIds = await Reservation.findAll({
		// 	attributes: ['id', 'reservationState', [sequelize.literal('TIMESTAMPDIFF(HOUR, createdAt, NOW())'), 'hours_difference']],
		// 	having: {
		// 		'hours_difference': {
		// 			$gt: 24
		// 		},
		// 		reservationState: 'pending',
		// 	}
		// });

		const reservations = await sequelize.query(`SELECT id, reservationState, hostId, checkIn, checkOut, guests, paymentState, createdAt,  DATE_FORMAT(checkIn,'%Y%m%d') AS formatCheckout, DATE_FORMAT(NOW(),'%Y%m%d') as today , TIMESTAMPDIFF(MINUTE, createdAt, NOW()) as minutes_difference, isPayLater FROM Reservation having minutes_difference >= 20 AND reservationState = 'pending' AND paymentState = 'pending' AND isPayLater = false;
		`,
			{ type: sequelize.QueryTypes.SELECT }
		);

		// Store them in an array
		if (reservations != null && reservations.length > 0) {
			reservations.map(async (item) => {

				await AllowedLimit();

				// Update Reservation Status
				let updateReservation = await Reservation.update({
					reservationState: 'expired',
				}, {
					where: {
						id: item.id
					}
				});

				let getThreadId = await ThreadItems.findOne({
					where: {
						reservationId: item.id
					}
				});

				// Update ThreadItems
				let updateThreadItems = await ThreadItems.update({
					type: 'expired',
					isRead: false
				}, {
					where: {
						id: getThreadId.threadId
					}
				});

				let updateThreads = await Threads.update({
					isRead: false
				}, {
					where: {
						id: getThreadId.threadId
					}
				});

				// Unblock blocked dates
				let unblockDates = await ListBlockedDates.destroy({
					where: {
						reservationId: item.id
					}
				});

				await emailBroadcast(item.id, emailLogo);
			})
		}

		console.log("HOLY MOLY RESERVATION EXPIRE CRON COMPLETED");
		console.log("/********************************************/");

	}, null, true, 'Asia/Ho_Chi_Minh');

};

export default updateReservationExpire;