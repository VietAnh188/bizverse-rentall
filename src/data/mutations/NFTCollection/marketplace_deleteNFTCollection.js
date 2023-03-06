// GraphQL
import {
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType
} from 'graphql';
import { NFTCollection } from '../../models';

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';

// Types
import ResponseType from '../../types/ResponseType'

const marketplace_deleteNFTCollection = {
    type: ResponseType,
    args: {
        collectionId: { type: new NonNull(IntType)}
    },
    async resolve({ request }, {
        collectionId
    }){
      try {
        const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

        if (userStatus !== 200) {
            return {
                status: userStatus,
                errorMessage: userErrorMessage
            }
        }

        const userId = request.user.id;

        const collection = await NFTCollection.findOne({
            where: {
                id: collectionId
            },
            raw: true
        })
        
        if (!collection) {
            return {
                status: 400,
                errorMessage: 'Collection is not existing'
            }
        }

        if (collection.userId !== userId) {
            return {
                status: 400,
                errorMessage: 'You are not the NFT owner'
            }
        }

        await NFTCollection.update({
            isDeleted: true
        }, {
            where: {
                id: collectionId
            }
        })

        await NFTCollection.destroy({
            where: {
                id: collection.id
            }
        })

        return {
            status: 200
        }

      } catch (error) {
        return {
            status: 400,
            errorMessage: 'Something went wrong ' + error.message
        }
    }
    }
}

export default marketplace_deleteNFTCollection