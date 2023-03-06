import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const AdminTogglePublishListingType = new ObjectType({
    name: 'AdminTogglePublishListingType',
    fields: {
        status: { type: IntType },
        id: { type: IntType },
        errorMessage: { type: StringType },
        action: { type: StringType }
    },
});

export default AdminTogglePublishListingType;