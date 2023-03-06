// GraphQL
import {
    GraphQLInt as IntType
} from 'graphql';
import { NFTCollection } from '../../models';

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';

// Types
import GetNFTCollectionType from '../../types/NFTCollection/GetNFTCollectionType'

const marketplace_deleteNFTCollection = {
    type: GetNFTCollectionType,
    args: {
        collectionId: { type: IntType }
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

        const result = await NFTCollection.findOne({
            where: {
                id: collectionId,
                userId
            },
            raw: true
        })

        if (!result) {
            return {
                status: 400,
                errorMessage: 'Collection is not existing'
            }
        }

        return {
            status: 200,
            result
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