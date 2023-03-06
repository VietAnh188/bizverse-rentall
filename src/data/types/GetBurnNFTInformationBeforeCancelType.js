import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

export const GetBurnNFTInformationBeforeCancelResultsType = new ObjectType({
    name: 'GetBurnNFTInformationBeforeCancelResultsType',
    fields:  {
        tokenId: { type: IntType },
        guestWallet: { type: StringType },
        didClaim: { type: BooleanType }
    }
})

const GetBurnNFTInformationBeforeCancelType = new ObjectType({
    name: 'GetBurnNFTInformationBeforeCancelType',
    fields: {
        results: { 
            type: GetBurnNFTInformationBeforeCancelResultsType
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        }

    }
});

export default GetBurnNFTInformationBeforeCancelType;
