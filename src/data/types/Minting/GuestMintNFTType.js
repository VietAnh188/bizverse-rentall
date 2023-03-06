import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

import MintingType from './index';

const GuestMintNFTType = new ObjectType({
    name: 'GuestMintNFTType',
    fields: {
        result: {
            type: MintingType
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        isMinted: {
            type: BooleanType
        }
    }
});

export default GuestMintNFTType;
