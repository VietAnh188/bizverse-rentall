import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import { NFT } from './NFTType';

const GetNFTsType = new ObjectType({
    name: 'GetNFTsType',
    fields: {
        results: {
            type: new ObjectType({
                name: 'GetNFTResultsType',
                fields: {
                    rows: {
                        type: new List(NFT),
                    },
                    count: {
                        type: IntType
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

export default GetNFTsType;
