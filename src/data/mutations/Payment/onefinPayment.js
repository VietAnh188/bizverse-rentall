// GrpahQL
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
  } from 'graphql'; 
import axios from 'axios';
import uniqid from 'uniqid';
import { generateSignature, verifySignature } from '../../../libs/security';

// config
import { paymentMethods } from '../../../config'

// Models
import { Transaction } from '../../models'
  
// Sequelize models
import OnefinPaymentType from '../../types/OnefinPaymentType';
  
const onefinPayment = {
  
    type: OnefinPaymentType,
  
    args: {
        reservationId: { type: new NonNull(IntType) },
        payerEmail: { type: new NonNull(StringType) },
        payerId: { type: new NonNull(StringType) },
        amount: { type: new NonNull(StringType) },
        currency: { type: new NonNull(StringType) },
        transactionMethod: { type: new NonNull(StringType) },
    },
  
    async resolve({ request, response }, {
        reservationId,
        payerEmail,
        payerId,
        amount,
        currency,
        transactionMethod,
    }) {
      try{  
      // Check if user already logged in
        if (request.user && !request.user.admin) {
    
            const id = uniqid();
            const messages = {
                merchantCode: process.env.MERCHANT_CODE,
                currency,
                amount: amount * 100,
                trxRefNo: id,
                backendURL: process.env.BACKEND_URL,
                responsePageURL: `${process.env.ONE_FIN_RESPONSE_PAGE_URL_WEB}?trxRefNo=${id}`,
                mobileNo: process.env.MERCHANT_MOBILE,
                transactionMethod,
                actionMethod: 0, // Spending with card
                email: process.env.MERCHANT_EMAIL,
            }

            const signature = generateSignature(JSON.stringify(messages),process.env.MERCHANT_PRIVATE_KEY)
            const responseData = await  axios({
                method: 'POST',
                url: process.env.PAYMENT_GATEWAY_URL,
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
                if (!verifySig) {
                    return null
                } else {
                    Transaction.create({
                        reservationId,
                        payerEmail,
                        payerId,
                        transactionId: id,
                        total: amount,
                        currency,
                        paymentType: 'booking',
                        paymentMethodId: paymentMethods.ONE_FIN_PAYMENT_ID,
                        status: 'OPENED',
                        paymentMethodDetailId: transactionMethod
                    })

                    return {
                        results: {
                            amount: JSON.parse(responseData.data.messages).amount,
                            paymentURL: JSON.parse(responseData.data.messages).paymentURL
                        },
                        status: 200
                    };
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
  
  export default onefinPayment;
  