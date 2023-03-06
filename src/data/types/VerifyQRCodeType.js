import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType
} from 'graphql';
import ReservationType from './ReservationType';
import ShowListingType from './ShowListingType';
import { NFT } from './NFTType';

const VerifyQRCodeType = new ObjectType({
  name: 'VerifyQRCodeType',
  fields: {
    status: { type: StringType },
    errorMessage: { type: StringType },
    results: {
      type: new ObjectType({
        name: 'VerifyQRCodeTypeResult',
        fields: {
          isValid: { type: BooleanType },
          message: { type: StringType },
          nft: { type: NFT },
          listing: {
            type: ShowListingType
          },
          reservation: {
            type: ReservationType
          }
        }
      })
    }
  }
});

export default VerifyQRCodeType;
