import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import NFTCollectionType from './index';

const GetNFTCollectionType = new ObjectType({
    name: 'GetNFTCollectionType',
    fields: {
        result: {
            type: NFTCollectionType
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default GetNFTCollectionType;
