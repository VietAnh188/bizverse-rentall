import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { Listing } from '../models';

const ListingType = new ObjectType({
    name: 'ListingType',
    fields:  {
        id: { type: IntType },
        title: { type: StringType },
    }
})

export const GetListingsType = new ObjectType({
    name: 'GetListingsType',
    fields: {
        results: {
            type: new ObjectType({
                name: 'GetListingsResultsType',
                fields: {
                    rows: {
                        type: new List(ListingType),
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

export default ListingType;
