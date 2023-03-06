import { 
  GraphQLInt as IntType
} from 'graphql';
import { VRLink } from '../../models';
import { GetVRLinkType } from '../../types/VRLink/VRLinkType';
import getLocaleMessage from '../../../helpers/message/getLocaleMessage';

const deleteVRLink = {
  type: GetVRLinkType,
  args: {
    id: { type: IntType }
  },
  async resolve({ request }, { id }) {
    try {
      const existingRecord = await VRLink.findById(id);

      if (!existingRecord) {
        return {
          status: 404,
          errorMessage: await getLocaleMessage({ locale: request.language, messageId: 'error.recordNotFound' })
        }
      }

      await VRLink.destroy({
        where: {
          id
        }
      }); 

      return {
        status: 200
      };
    } catch (error) {
      console.log('Something went wrong while delete vrlink record');
      return {
        status: 500,
        errorMessage: error
      };
    }
  }
};

export default deleteVRLink;
