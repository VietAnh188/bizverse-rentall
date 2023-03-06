import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLString as StringType
} from 'graphql';

import { NFTCollection } from '../../models';

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';

// Types
import GetNFTCollectionsType from '../../types/NFTCollection/GetNFTCollectionsType'

const marketplace_deleteNFTCollection = {
    type: GetNFTCollectionsType,
    args: {
        searchText: { type: StringType },
        page: { type: new NonNull(IntType) },
        limit: { type: new NonNull(IntType) },
    },
    async resolve({ request }, {
        searchText,
        page,
        limit
    }){
      try {
        const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

        if (userStatus !== 200) {
            return {
                status: userStatus,
                errorMessage: userErrorMessage
            }
        }

        // Define condition for search
        const userId = request.user.id;
        let where = {
            userId
        }

        if (searchText) {
            where = {
                ...where,
                name: {
                    $like: `%${searchText}%`
                }
            }
        }

        const results = await NFTCollection.findAndCountAll({
            where,
            order: [['createdAt', 'DESC']],
            limit,
            offset: (page - 1) * limit,
            raw: true
        })

        return {
            status: 200,
            results
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