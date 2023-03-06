 // GrpahQL
 import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLString as StringType
  } from 'graphql'; 

// Sequelize models
import { Reservation, User, UserProfile, PaymentMethodDetail, Currencies, CurrencyRates, Listing, Transaction } from '../../models';
import * as config from '../../../config';
import uniqid from 'uniqid';
import axios from 'axios';
import { generateSignature , verifySignature } from '../../../libs/security';
import OnefinPaymentType from '../../types/OnefinPaymentType';
import { convert } from '../../../helpers/currencyConvertion';
import { createPayPalPayment } from '../../../helpers/payment/paypal/createPayPalPayment';
import { createCustomer, createStripePayment } from '../../../helpers/payment/stripe/stripe';
  
  const guestPaymentOnlineForPayLaterReservation = {
    type: OnefinPaymentType,
    args: {
        reservationId: { type: new NonNull(IntType) },
        paymentMethod: { type: new NonNull(IntType) },
        convertCurrency: { type: new NonNull(StringType) },
        paymentType: { type: IntType },
        cardToken: { type: StringType },
        
    },
    async resolve({ request, response }, {
        reservationId,
        paymentMethod,
        convertCurrency,
        paymentType,
        cardToken
    }) {
      try{  

        // Check if user already logged in
        if (request.user && !request.user.admin) {

            if (paymentMethod === config.paymentMethods.STRIPE_PAYMENT_ID && !cardToken.trim()) {
                return { 
                    status: 400,
                    errorMessage: 'Card token is required for stripe payment'
                }
            }

           if (paymentMethod === config.PAY_LATER_ID) {
               return { 
                   status: 400,
                   errorMessage: 'Payment method is not allowed'
               }
           } else {
               const reservation = await Reservation.findOne({
                   where: {
                       id: reservationId,
                       reservationState: ['pending', 'approved'],
                       paymentState: config.paymentState.PENDING
                   }
               })

               if (!reservation) {
                   return { 
                       status: 400,
                       errorMessage: 'Reservation id is not exist'
                   }
               }
               let paymentURL, paymentIntentSecret, requireAdditionalAction, status, errorMessage, rates, ratesData = {}, customerEmail, customerId;

               const listData = await Listing.findOne({
                    attributes: ['userId', 'title'],
                    where: {
                    id: reservation.listId
                    },
                    raw: true
                });

                const data = await CurrencyRates.findAll();
                const base = await Currencies.findOne({ where: { isBaseCurrency: true }, raw: true });
                if (data) {
                    data.map((item) => {
                        ratesData[item.dataValues.currencyCode] = item.dataValues.rate;
                    })
                }
                rates = ratesData;

                if (paymentMethod === config.paymentMethods.STRIPE_PAYMENT_ID) {
                    //  create customer in stripe
                    const stripeCustomerData = await createCustomer(request.user.id);
                    status = stripeCustomerData.status;
                    errorMessage = stripeCustomerData.errorMessage;
                    customerId = stripeCustomerData.customerId;
                    customerEmail = stripeCustomerData.customerEmail;
                  }

                switch(paymentMethod){
                    case config.paymentMethods.PAYPAL_PAYMENT_ID: {
                        const amount = Number(reservation.total) + Number(reservation.guestServiceFee)
                        if (reservation.currency !== convertCurrency) {
                            amount = convert(base.symbol, rates, Number(reservation.total) + Number(reservation.guestServiceFee), reservation.currency, convertCurrency)
                        }
                        await createPayPalPayment(listData.title, reservationId, amount, convertCurrency)
                        .then(res => {
                            if (res.payer.payment_method === 'paypal') {
                            for (var i = 0; i < res.links.length; i++) {
                                var link = res.links[i];
                                if (link.method === 'REDIRECT') {
                                    paymentURL = link.href;
                                }
                            }
                            status = 200;
                            }
                        })
                        .catch((err) => {
                            status = 400;
                            errorMessage = 'Something went wrong ' + err.response && err.response.message;
                        });
                        break;
                    }
                    case config.paymentMethods.STRIPE_PAYMENT_ID: {
                         //  Create stripe paymentIntents
                        let stripeAmount = Number(reservation.total) + Number(reservation.guestServiceFee)
                        if (reservation.currency !== convertCurrency) {
                            stripeAmount = convert(base.symbol, rates, Number(reservation.total) + Number(reservation.guestServiceFee), reservation.currency, convertCurrency)
                        }
                        const stripePaymentData = await createStripePayment(cardToken, stripeAmount, convertCurrency, customerId, customerEmail, reservationId, reservation.listId, listData.title);
                        status = stripePaymentData.status;
                        errorMessage = stripePaymentData.errorMessage;
                        requireAdditionalAction = stripePaymentData.requireAdditionalAction;
                        paymentIntentSecret = stripePaymentData.paymentIntentSecret;
                        break;
                    }
                    case config.paymentMethods.ONE_FIN_PAYMENT_ID: {
                        const id = uniqid();
                        const guestData = await User.findOne({
                            where: { id: reservation.guestId }
                        })
                        
                        const hostProfile = await UserProfile.findOne({where: { userId: reservation.hostId}});
                        
                        const amount = convert(base.symbol, rates, Number(reservation.total) + Number(reservation.guestServiceFee), reservation.currency, 'VND')
                        const amountOneFinPayment = Number(amount * 100).toFixed(0)

                        const messages = {
                            merchantCode: config.one_fin.MERCHANT_CODE,
                            currency: 'VND',
                            amount: amountOneFinPayment,
                            trxRefNo: id,
                            backendURL: config.one_fin.BACKEND_URL,
                            responsePageURL: `${config.one_fin.BACKEND_URL_WEB}?trxRefNo=${id}`,
                            mobileNo: hostProfile.phoneNumber ? hostProfile.phoneNumber : config.one_fin.MERCHANT_MOBILE,
                            transactionMethod: paymentType,
                            actionMethod: 0, // Spending with card
                            email: config.one_fin.MERCHANT_EMAIL,
                        }

                        const signature = generateSignature(JSON.stringify(messages),config.one_fin.MERCHANT_PRIVATE_KEY);

    
                        const responseData = await  axios({
                            method: 'POST',
                            url: config.one_fin.PAYMENT_GATEWAY_URL,
                            headers: {
                                'Content-Type': 'application/json'
                                },
                            data: {
                                signature: signature,
                                messages: JSON.stringify(messages)
                            }
                        })
    
                        if (responseData.data && responseData.data.errorDTO && Number(responseData.data.errorDTO.code )=== 4003) {
                            return {
                                status: 400,
                                errorMessage: responseData.data.errorDTO.message
                            }
                        } else {
                            const verifySig = verifySignature(responseData.data.messages, responseData.data.signature, process.env.ONEFIN_PG_PUBLIC_KEY);
                            if (verifySig == false) {
                                status = 400;
                                errorMessage = "Signature verify failed"
                                return null
                            } else {
                                let paymentMethodDetail = await PaymentMethodDetail.findOne({
                                    attributes: ['id'],
                                    where: { paymentId: paymentMethod, paymentDetailType: paymentType}
                                })
                                
                                Transaction.create({
                                    reservationId,
                                    payerEmail: guestData.email,
                                    payerId: guestData.id,
                                    transactionId: id,
                                    total: Number(reservation.dataValues.total),
                                    currency: reservation.dataValues.currency,
                                    paymentType: 'booking',
                                    paymentMethodId: config.paymentMethods.ONE_FIN_PAYMENT_ID,
                                    status: 'OPENED',
                                    paymentMethodDetailId: paymentMethodDetail.id
                                })

                                paymentURL = JSON.parse(responseData.data.messages).paymentURL
                                status = 200
                            }
                        }
    
                        break;
                    }
                    case config.paymentMethods.PAY_LATER_ID:{
                        break;
                    }
                    default: {
                        break;
                    }
                }

                return {
                    results: {
                        paymentURL
                    },
                    status
                  }
           }

        } else {
            return {
                status: 500 ,
                errorMessage: 'You are not loggedIn'
            };
        }
     } catch (error) {
        return {
            errorMessage: 'Something went wrong' + error,
            status: 400
        };
     }
    },
  };
  
  export default guestPaymentOnlineForPayLaterReservation;