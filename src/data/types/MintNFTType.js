import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

export const MintDataResponse = new ObjectType({
    name: 'MintDataResponse',
    fields:  {
        signedMessage: { type: StringType }, 
        mintingNonce: { type: IntType }, 
        delegatee: { type: StringType }, 
        recipient: { type: StringType }, 
        mut: { type: BooleanType }, 
        uri: { type: StringType },
        tokenId: { type: IntType }
    }
})

export const MintNFTResult = new ObjectType({
    name: 'MintNFTResult',
    fields:  {
        nftId: { type: IntType },
        mintData: {
            type: MintDataResponse
        }
    }
})

const MintNFTType = new ObjectType({
    name: 'MintNFTType',
    fields: {
        results: { 
            type: MintNFTResult
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
    }
});

export default MintNFTType;
