var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(10);

import { convert } from '../../helpers/currencyConvertion';
import { paypalTransaction } from './helper/paypalTransaction';
import { stripePayment } from './helper/stripeTransaction';

import { Reservation, Payout, CancellationDetails, FailedTransactionHistory, User, Currencies, CurrencyRates, } from '../../data/models';

const autoPayoutToHost = app => {

    new CronJob('0 0 0 * * *', async function () { // Run every day on 12.00 AM

        console.log("/********************************************/");
        console.log("HOLY MOLY AUTO PAYOUT TO HOST CRON STARTED");

        let offset = 0;

        autoPayout(offset);

        async function autoPayout(offset) {
            try {
                const getReservation = await Reservation.findAll({
                    limit: 1000,
                    offset,
                    attributes: ['id', 'hostId', 'hostServiceFee', 'total', 'currency', 'paymentAttempt', 'reservationState'],
                    where: {
                        $or: [
                            {
                                reservationState: 'completed'
                            },
                            {
                                reservationState: 'cancelled'
                            }
                        ],
                        isHold: false,
                        paymentAttempt: {
                            $lt: 3
                        },
                        paymentState: 'completed',
                        isPayout: false
                    },
                    order: [['id', 'DESC']],
                    raw: true
                });

                var ratesData = {};

                const data = await CurrencyRates.findAll();
                const base = await Currencies.findOne({ where: { isBaseCurrency: true } });

                if (data) {
                    data.map((item) => {
                        ratesData[item.dataValues.currencyCode] = item.dataValues.rate;
                    })
                };

                console.log("Reservation------------------------------", getReservation)
                if (getReservation && getReservation.length > 0) {
                    await Promise.all(getReservation.map(async (item, index) => {

                        await AllowedLimit();

                        let status = 200, errorMessage, amount, payoutId, convertAmount, checkFailedTransaction;

                        let checkUserStatus = await User.findOne({
                            attributes: ['id', 'email'],
                            where: {
                                id: item.hostId,
                                userBanStatus: false,
                                userDeletedAt: null
                            },
                            raw: true
                        });

                        let getPayout = await Payout.findOne({
                            attributes: ['id', 'methodId', 'payEmail'],
                            where: {
                                userId: item.hostId,
                                default: true
                            },
                            raw: true
                        });
                        payoutId = getPayout && getPayout.id;

                        if (item.reservationState === 'completed') {
                            let payoutAmount = item.total - item.hostServiceFee;
                            convertAmount = convert(base.symbol, ratesData, payoutAmount, item.currency, base.symbol);

                        } else if (item.reservationState === 'cancelled') {
                            let refundAmount = await CancellationDetails.findOne({
                                attributes: ['payoutToHost'],
                                where: {
                                    reservationId: item.id
                                },
                                raw: true
                            });
                            convertAmount = convert(base.symbol, ratesData, Number(refundAmount.payoutToHost), item.currency, base.symbol);

                            if (refundAmount.payoutToHost <= 0) { //Not adding this reservation to auto payout process, if the payout amount is either equal or less than 0
                                await Reservation.update({ paymentAttempt: 3 }, { where: { id: item.id } });
                                return '';
                            }
                        }

                        amount = convertAmount.toFixed(2);
                        
                        if (getPayout && getPayout.payEmail && checkUserStatus != null && item.paymentAttempt < 3 && amount > 0) {
                            if (getPayout.methodId === 1) {
                                await paypalTransaction(item.id, item.hostId, amount, base.symbol, getPayout.payEmail, item.paymentAttempt, payoutId)
                                    .then(res => {
                                        status = res.status;
                                        errorMessage = res.errorMessage;
                                    });

                            } else if (getPayout.methodId === 2) {
                                await stripePayment(item.id, getPayout.payEmail, amount, base.symbol, checkUserStatus.email, payoutId, item.hostId, item.paymentAttempt)
                                    .then(res => {
                                        status = res.status;
                                        errorMessage = res.errorMessage;
                                    });
                            }

                            if (status == 400) {
                                let updateFailed;
                                checkFailedTransaction = await FailedTransactionHistory.findOne({
                                    where: {
                                        reservationId: item.id
                                    },
                                    raw: true
                                });
                                if (checkFailedTransaction === null) {
                                    updateFailed = await FailedTransactionHistory.create({
                                        reservationId: item.id,
                                        userId: item.hostId,
                                        amount: Math.round(amount),
                                        currency: item.currency,
                                        reason: JSON.stringify(errorMessage),
                                        paymentMethodId: getPayout.methodId,
                                        createdAt: new Date(),
                                        updatedAt: new Date()
                                    });

                                } else {
                                    updateFailed = await FailedTransactionHistory.update({
                                        userId: item.hostId,
                                        amount: Math.round(amount),
                                        currency: item.currency,
                                        reason: JSON.stringify(errorMessage),
                                        paymentMethodId: getPayout.methodId,
                                        createdAt: new Date(),
                                        updatedAt: new Date()
                                    }, {
                                        where: {
                                            reservationId: item.id
                                        }
                                    });
                                }
                            }
                        }
                    }));
                }

                console.log("HOLY MOLY AUTO PAYOUT TO HOST CRON COMPLETED");
                console.log("/********************************************/");

            } catch (error) {
                console.log(error);
            }

        }

    }, null, true, 'Asia/Ho_Chi_Minh');
}

export default autoPayoutToHost;