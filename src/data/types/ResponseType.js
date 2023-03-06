import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const ResponseType = new ObjectType({
    name: 'ResponseType',
    fields: {
        errorMessage: {
            type: StringType
        },
        status: {
            type: IntType
        },
        message: {
            type: StringType
        },
    }
});


export default ResponseType;