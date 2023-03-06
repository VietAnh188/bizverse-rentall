import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLList as List,
} from 'graphql';


const MultiLanguageType = new ObjectType({
    name: 'MultiLanguageType',

    fields: {
        id: {
            type: IntType
        },
        type: {
            type: StringType
        },
        typeId: {
            type: IntType
        },
        language: {
            type: StringType
        },
        translation: {
            type: StringType
        }
    },
});
export const MultiLanguageCommonType = new ObjectType({
    name: 'MultiLanguageCommonType',

    fields: {
        results: {
            type: MultiLanguageType
        },
        errorMessage: {
            type: StringType
        },
        status: {
            type: IntType
        },
    },
});