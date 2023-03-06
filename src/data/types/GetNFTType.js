import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import { NFT } from './NFTType';

const GetNFTType = new ObjectType({
    name: 'GetNFTType',
    fields: {
        results: {
            type: NFT
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default GetNFTType;
