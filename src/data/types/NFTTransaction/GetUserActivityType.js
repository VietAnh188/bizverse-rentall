import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import NFTTransactionType from './index';

const GetUserActivityType = new ObjectType({
    name: 'GetUserActivityType',
    fields: {
        activity: {
            type: NFTTransactionType
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }

    }
});

export default GetUserActivityType;
