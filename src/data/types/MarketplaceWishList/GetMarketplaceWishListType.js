import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import MarketplaceWishListType from './index';

const GetMarketplaceWishListType = new ObjectType({
    name: 'GetMarketplaceWishListType',
    fields: {
        results: {
            type: MarketplaceWishListType
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default GetMarketplaceWishListType;
