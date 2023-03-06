import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
} from 'graphql';

const CancellationType = new ObjectType({
    name: 'Cancellation',
    fields: {
        id: {
            type: IntType
        },
        policyName: {
            type: StringType,
            async resolve(cancellation, args, request){
                try{
                    if(request && request.language !== 'en-US'){
                        const policyName = MultiLanguage.findOne({
                                    where: {
                                    type: "cancellation.policyName",
                                    typeId: cancellation.id
                                    }
                                });
                        cancellation.policyName = policyName.translation;
                        return cancellation.policyName;
                    }
                    return cancellation.policyName;
                }catch(error){
                    return cancellation.policyName;
                }
            }
        },
        policyContent: {
            type: StringType,
            async resolve(cancellation, args, request){
                try{
                    if(request && request.language !== 'en-US'){
                        const content = MultiLanguage.findOne({
                                    where: {
                                    type: "cancellation.content",
                                    typeId: cancellation.id
                                    }
                                });
                        cancellation.content = content.translation;
                        return cancellation.content;
                    }
                    return cancellation.content;
                }catch(error){
                    return cancellation.content;
                }
            }
        },
        priorDays: {
            type: IntType
        },
        accommodationPriorCheckIn: {
            type: FloatType
        },
        accommodationBeforeCheckIn: {
            type: FloatType
        },
        accommodationDuringCheckIn: {
            type: FloatType
        },
        guestFeePriorCheckIn: {
            type: FloatType
        },
        guestFeeBeforeCheckIn: {
            type: FloatType
        },
        guestFeeDuringCheckIn: {
            type: FloatType
        },
        hostFeePriorCheckIn: {
            type: FloatType
        },
        hostFeeBeforeCheckIn: {
            type: FloatType
        },
        hostFeeDuringCheckIn: {
            type: FloatType
        },
        isEnable: {
            type: BooleanType
        },
        status: {
            type: StringType
        },
        nonRefundableNightsPriorCheckIn: {
            type: IntType
        },
        nonRefundableNightsBeforeCheckIn: {
            type: IntType
        },
        nonRefundableNightsDuringCheckIn: {
            type: IntType
        },
    }
});

export default CancellationType;