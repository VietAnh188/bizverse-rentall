import {
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLObjectType as ObjectType
} from 'graphql';

import ShowListingType from './ShowListingType';

const ListingPermissionCommonType = new ObjectType({

    name: 'ListingPermissionCommonType',

    fields: {

        count: {
            type: IntType
        },

        status: {
            type: IntType
        },

        errorMessage: {
            type: StringType
        },

        result: {
            type: ShowListingType
        },

        results: {
            type: new List(ShowListingType)
        },

        currentPage:{
            type: IntType 
        }
    }

});

export default ListingPermissionCommonType;