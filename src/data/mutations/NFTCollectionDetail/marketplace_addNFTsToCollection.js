// Graphql
import {
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { User, NFTCollectionDetail } from '../../models';

// Types
import ResponseType from '../../types/ResponseType'

const marketplace_addNFTsToCollection = {
    type: ResponseType,
    args: {
        nftIds: { type: new NonNull(new List(IntType))},
        collectionId: { type: new NonNull(IntType) },
    },
    async resolve({ request }, {
        nftIds = [],
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
                status: 500
            }
        }

        for(let index = 0; index < nftIds.length; index++) {
            const nftId = nftIds[index]

            const existingNFTInCollection = await NFTCollectionDetail.findOne({
                where: {
                    nftId,
                    collectionId
                },
                raw: true
            })

            if (!existingNFTInCollection) {
                await NFTCollectionDetail.create({
                    nftId,
                    collectionId
                })
            }
        }

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

export default marketplace_addNFTsToCollection