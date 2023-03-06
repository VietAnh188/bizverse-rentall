import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

export const GetTokenIdsByIDsResult = new ObjectType({
    name: 'GetTokenIdsByIDsResult',
    fields:  {
        tokenIds: { type: new List(IntType) },
    }
})

const GetTokenIdsByIDsType = new ObjectType({
    name: 'GetTokenIdsByIDsType',
    fields: {
        results: { 
            type: GetTokenIdsByIDsResult
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});


export default GetTokenIdsByIDsType;
