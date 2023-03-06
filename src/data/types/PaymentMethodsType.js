import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { MultiLanguage } from '../models';

const PaymentMethodsType = new ObjectType({
    name: 'PaymentMethods',
    fields: {
        id: {
            type: IntType
        },
        name: {
            type: StringType
        },
        processedIn: {
            type: StringType,
            async resolve(method, args, request){
                try {
                    const processedIn = await MultiLanguage.findOne({
                        where: {
                            type: 'paymentmethods.processedIn',
                            typeId: method.id
                        }
                    });
                    if(processedIn){
                        method.processedIn = processedIn.translation;
                        return method.processedIn;
                    };
                    return method.processedIn;
                } catch (error) {
                    return method.processedIn;
                }
            }
        },
        fees: {
            type: StringType,
            async resolve(method, args, request){
                try{
                    const fee = await MultiLanguage.findOne({
                        where: {
                            type: 'paymentmethods.fees',
                            typeId: method.id
                        }
                    });
                    if(fee){
                        method.fees = fee.translation;
                        return method.fees;
                    };
                    return method.fees;
                }catch(error){
                    return method.fees;
                }
            }
        },
        currency: {
            type: StringType
        },
        details: {
            type: StringType,
            async resolve(method, args, request){
                try{
                    const details = await MultiLanguage.findOne({
                        where: {
                            type: 'paymentmethods.details',
                            typeId: method.id
                        }
                    });
                    if(details){
                        method.details = details.translation;
                        return method.details;
                    };
                    return method.details;
                }catch(error){
                    return method.details;
                }
            }
        },
        isEnable: {
            type: BooleanType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        paymentType: {
            type: IntType
        }
    }
});

export default PaymentMethodsType;