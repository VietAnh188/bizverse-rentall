import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import NFTTransactionType from './index';

const GetUserActivitiesType = new ObjectType({
    name: 'GetUserActivitiesType',
    fields: {
        results: {
            type: new ObjectType({
                name: 'GetUserActivitiesResultsType',
                fields: {
                    rows: {
                        type: new List(NFTTransactionType),
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

export default GetUserActivitiesType;
