// Graphql
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLString as StringType
} from 'graphql';
import { User, NFTCollectionDetail, NFT } from '../../models';

// Types
import GetNFTsOfCollectionType from '../../types/NFTCollectionDetail/GetNFTsOfCollectionType'

const marketplace_getNFTsOfCollection = {
    type: GetNFTsOfCollectionType,
    args: {
        collectionId: { type: new NonNull(IntType) },
        page: { type: new NonNull(IntType) },
        limit: { type: new NonNull(IntType) },
        nftSearch: {
            type: StringType
        }
    },
    async resolve({ request }, {
        nftSearch,
        collectionId,
        page,
        limit
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

        // Define NFT search condition
        let nftSearchCondition;
        
        if (nftSearch) {
            nftSearchCondition = {
                name: {
                    $like: `%${nftSearch}%`
                }
            }
        }

        const results = await NFTCollectionDetail.findAndCountAll({
            where: {
                collectionId
            },
            limit,
            offset: (page - 1) * limit,
            raw: true,
            include: [
                {
                    model: NFT,
                    as: 'nft',
                    where: nftSearchCondition
                }
            ]
        })

        return {
            results,
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

export default marketplace_getNFTsOfCollection