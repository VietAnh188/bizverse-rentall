import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import CountryType from './index';

const GetCountryType = new ObjectType({
    name: 'GetCountryType',
    fields: {
        results: {
            type: CountryType
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default GetCountryType;
