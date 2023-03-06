import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import { NFT as NFTType } from '../NFTType';

const ToggleFavoriteNFTType = new ObjectType({
    name: 'ToggleFavoriteNFTType',
    fields: {
        nft: {
            type: NFTType
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        action: {
            type: StringType
        }
    }
});

export default ToggleFavoriteNFTType;
