// Graphql
import {
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { User, NFTCollectionDetail } from '../../models';

// Types
import ResponseType from '../../types/ResponseType'

const marketplace_removeNFTsOutCollection = {
    type: ResponseType,
    args: {
        nftIds: { type: new NonNull(new List(IntType))},
        collectionId: { type: new NonNull(IntType) },
    },
    async resolve({ request }, {
        nftIds,
        collectionId
    }){
      try {
        // authentication request
        if (!request.user) {
            return {
                status: 400 ,
                errorMessage: 'You are not loggedIn'
            };
        }

        // User id
        const userId = request.user.id;

        // check userBanStatus
        const userData = await User.findOne({
            attributes: [
                'userBanStatus'
              ],
              where: { id: userId },
              raw: true
        })

        if (userData?.userBanStatus) {
            return {
                errorMessage: 'Your account has blocked for some reason. Please contact our support team.',
                status: 400
            }
        }

        await NFTCollectionDetail.destroy({
            where: {
                nftId: nftIds,
                collectionId
            }
        })

        return {
            status: 200
        }

      } catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong: ' + error.message
            }
      }
    }
}

export default marketplace_removeNFTsOutCollection