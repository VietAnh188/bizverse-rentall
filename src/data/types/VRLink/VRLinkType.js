import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLInputObjectType as InputType
} from 'graphql'

const VRLinkType = new ObjectType({
  name: 'VRLink',
  fields: {
    id: { type: IntType },
    listId: { type: new NonNull(IntType) },
    title: { type: StringType },
    url: { type: StringType },
    type: { type: StringType },
    fullLink: { type: StringType }
  }
});

export const VRLinkDetailType = new InputType({
  name: 'VRLinkDetail',
  fields: {
    listId: { type: new NonNull(IntType) },
    title: { type: StringType },
    url: { type: StringType },
    type: { type: StringType },
    fullLink: { type: StringType }
  }
});

export const GetVRLinkType = new ObjectType({
 name: 'GetVRLink',
  fields: {
    status: { type: IntType },
    errorMessage: { type: StringType },
    result: { type: VRLinkType }    
  }
});

export default VRLinkType;
