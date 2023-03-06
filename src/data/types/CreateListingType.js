import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
  GraphQLList as List
} from 'graphql';

import VRLinkType from '../types/VRLink/VRLinkType';

const CreateListingType = new ObjectType({
  name: 'CreateListing',
  fields: {
    id: { type: IntType },
    roomType: { type: StringType },
    houseType: { type: StringType },
    residenceType: { type: StringType },
    bedrooms: { type: StringType },
    buildingSize: { type: StringType },
    bedType: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    bathroomType: { type: StringType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    status: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    bizverseLat: { type: StringType },
    bizverseLng: { type: StringType },
    bizverseLink360: { type: StringType },
    hasBizverseLocation: { type: StringType },
    vr360Data: { type: new List(VRLinkType) },
    bizverseSpaceData: { type: new List(VRLinkType) },
    isPayLater: { type: BooleanType },
    customRule: { type: StringType }
  },
});

export default CreateListingType;
