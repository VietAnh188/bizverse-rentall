import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLBoolean as BooleanType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLString as StringType,
  } from 'graphql';
  
  const UserWalletAddressType = new ObjectType({
    name: 'UserWalletAddress',
    fields: {
      results: {
          type: new ObjectType({
            name: 'WalletAddressType',
            fields: {
                wallet: { type: StringType },
            }
          })
      },
      status: { type: IntType },
      errorMessage: { type: StringType }
    },
  });
  
  export default UserWalletAddressType;
  