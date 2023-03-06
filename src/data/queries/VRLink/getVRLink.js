import {
  GraphQLString as StringType,
  GraphQLList as List,
  GraphQLNonNull as NonNull
} from 'graphql'
import VRLinkType from '../../types/VRLink/VRLinkType';
import { VRLink } from '../../models'

const getVRLink = {
  type: new List(VRLinkType),
  args: {
    listId: { type: new NonNull(StringType) },
    type: { type: new NonNull(StringType) }
  },
  async resolve ({ request }, {
    listId,
    type 
  }) {
     try {
        return await VRLink.findAll({
          where: {
            listId: listId,
            type: type
          }});
     } catch (error) {
        console.log('Something went wrong while get vrlink');
        return {
          status: 500
        }; 
     } 
  }
};

export default getVRLink;
