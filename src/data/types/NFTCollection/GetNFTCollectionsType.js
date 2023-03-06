import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';

import NFTCollectionType from './index';

const GetNFTCollectionsType = new ObjectType({
    name: 'GetNFTCollectionsType',
    fields: {
        results: {
            type: new ObjectType({
                name: 'GetNFTCollectionsResultsType',
                fields: {
                    rows: {
                        type: new List(NFTCollectionType),
                    },
                    count: {
                        type: IntType
                    }
                }
            })
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default GetNFTCollectionsType;
