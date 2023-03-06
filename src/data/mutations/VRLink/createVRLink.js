import { 
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';
import { GetVRLinkType } from '../../types/VRLink/VRLinkType';
import { VRLink } from '../../models'

const createVRLink = {
  type: GetVRLinkType,
  args: {
    listId: { type: new NonNull(IntType) },
    type: { type: new NonNull(StringType) },
    title: { type: StringType },
    url: { type: StringType },
    fullLink: { type: StringType }
  },
  async resolve({ _request }, { listId, type, title, url, fullLink }) {
    try {
      const vrlink = await VRLink.create({
        listId,
        type,
        title,
        url,
        fullLink
      }); 

      return {
        status: 200,
        result: vrlink
      };
    } catch (error) {
      console.log('Something went wrong while create vrlink');
      return {
        status: 500,
        errorMessage: error
      };
    }
  }
};

export default createVRLink;
