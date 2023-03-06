import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const MarketplaceWishListType = new ObjectType({
    name: 'MarketplaceWishListType',
    fields:  {
        id: { type: IntType },
        userId: { type: StringType },
        wallet: { type: StringType },
        nftId: { type: IntType }
    }
})

export default MarketplaceWishListType