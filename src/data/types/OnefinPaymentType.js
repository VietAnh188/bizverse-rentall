import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const PaymentType = new ObjectType({
    name:'PaymentTypeOnefin',
    fields: { 
        amount: { type:  StringType},
        paymentURL: { type:  StringType}
    }
})

const OnefinPaymentType = new ObjectType({
    name: 'OneFinPayment',
    fields: {
        results: { type: PaymentType},
        status: {
            type: IntType
        },
        errorMessage:  { type: StringType }
    }
});

export default OnefinPaymentType;
