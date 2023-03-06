import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';
import ListPhotosType from './ListPhotosType';

import NFTType, { NFT } from './NFTType';
import ShowListingType from './ShowListingType';

const GetListingByNFT = new ObjectType({
    name: 'GetListingByNFTType',
    fields: {
        results: {
            type: new ObjectType({
                name: 'GetListingByNFTResult',
                fields: {
                    listing: {
                        type: ShowListingType,
                    },
                    nft: {
                        type: NFT
                    },
                    listPhotos:{
                        type: new List(ListPhotosType)
                    },
                    isYourFavorite: {
                        type: BooleanType
                    }
                }
            })
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        }

    }
});

export default GetListingByNFT;
