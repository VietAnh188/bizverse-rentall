import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

export const NFTsBulkActionResults = new ObjectType({
    name: 'NFTsBulkActionResults',
    fields:  {
        nftIds: { type: new List(IntType) },
    }
})

const NFTsBulkActionType = new ObjectType({
    name: 'NFTsBulkActionType',
    fields: {
        results: { 
            type: NFTsBulkActionResults
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        message: {
            type: StringType
        }
    }
});


export default NFTsBulkActionType;
