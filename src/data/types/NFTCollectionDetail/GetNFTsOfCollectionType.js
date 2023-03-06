import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import NFTCollectionDetailType from './index';

const GetNFTsOfCollectionType = new ObjectType({
    name: 'GetNFTsOfCollectionType',
    fields: {
        results: {
            type: new ObjectType({
                name: 'NFTCollectionDetailResultsType',
                fields: {
                    rows: {
                        type: new List(NFTCollectionDetailType),
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

export default GetNFTsOfCollectionType;
