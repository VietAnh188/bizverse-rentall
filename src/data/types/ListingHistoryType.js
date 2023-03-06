import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLObjectType as ObjectType
} from 'graphql';

const ListingHistoryType = new ObjectType({

    name: 'ListingHistoryType',

    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: StringType
        },
        userId: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        reason: {
            type: StringType
        }
    }

});

export default ListingHistoryType;