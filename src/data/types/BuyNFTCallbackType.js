import {
	GraphQLObjectType as ObjectType,
	GraphQLString as StringType,
	GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
} from 'graphql';

const BuyNFTCallbackType =new ObjectType({
    name: "buyNFTCallback",
    fields: {
        status: { type: IntType },
        errorMessage: { type: StringType },
        results: {
            type: new ObjectType({
                name: "buyNFTCallbackResults",
                fields: {
                    isUpdated: {
                        type: BooleanType,
                    }
                }
            })
        }
    }
});

export default BuyNFTCallbackType;