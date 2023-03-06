import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLList as List,
    GraphQLEnumType as EnumType
} from 'graphql';
import { VIEW_TYPES } from '../../../constants/viewTypes'

import ShowListingType from '../ShowListingType';

const searchListingType = new ObjectType({
    name: 'SearchListing',
    fields: {
        count: { type: StringType },
        results: { type: new List(ShowListingType) },
        status: { type: StringType },
    },
});

export const viewTypeEnumType = new EnumType({
    name: 'ViewTypeEnumType',
    values: {
        [VIEW_TYPES.recommended]: {
            value: 'recommended'
        },
        [VIEW_TYPES.mostViewed]: {
            value: 'mostviewed'
        },
        [VIEW_TYPES.all]: {
            value: 'all'
        }
    }
});

export default searchListingType;
