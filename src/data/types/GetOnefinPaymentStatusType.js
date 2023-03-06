import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List,
} from 'graphql';
import { Transaction } from '../models';

const OnefinPaymentStatus = new ObjectType({
    name: 'OnefinPaymentStatus',
    fields: {
            merchantCode:  {type:  StringType},
            currency: {type: StringType},
            amount: {type: StringType},
            processingFee: {type: StringType},
            trxRefNo: {type: StringType},
            transactionId: {type: StringType},
            statusId: {type: StringType},
            gatewayTransactionId: {type: StringType},
            orderId: {type: StringType},
            paymentToken: {type: StringType},
            reservationId: { 
                type: IntType,
                async resolve(payment) {
                    const  transaction = await Transaction.findOne({ 
                        where: { 
                            transactionId: payment.trxRefNo
                        }
                    })
                    return transaction ? transaction.id :  null
                }
             },
             reservationState: { type: StringType }
        }
});

const GetOnefinPaymentStatusType = new ObjectType({
    name: 'GetOnefinPaymentStatusType',
    fields: {
        results: {
            type: OnefinPaymentStatus
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    },
});

export default GetOnefinPaymentStatusType;