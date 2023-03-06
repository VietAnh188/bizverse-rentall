import sequelize from '../../sequelize';

// Graphql
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

// Models
import { NFT, UserProfile } from '../../models';

// Types
import GetNFTsType from '../../types/GetNFTsType';

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication'

const getCheckInTimeline = {
    type: GetNFTsType,
    args: {
        type: { type: new NonNull(StringType) },
        page: { type: new NonNull(IntType) },
        limit: { type: IntType }
    },
    async resolve({ request }, {
        type,
        page,
        limit = 5
    }){
        try  {
            // Check user authentication
            const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

            if (userStatus !== 200) {
                return {
                    status: userStatus,
                    errorMessage: userErrorMessage
                }
            }

            const userId = request.user.id;

            // Get user wallet
            const userProfile = await UserProfile.findOne({
                where: {
                    userId
                },
                raw: true
            })
            const userWallet = userProfile?.wallet;

            // Define conditions
            let where = {
                isDeleted: false,
                owner: {
                    $not: sequelize.col('originalOwner') // Check NFT was sold
                }
            }

            if (type === 'host') {
                where = {
                    ...where,
                    originalOwner: userWallet
                }
            } else { // type === 'guest'
                 where = {
                     ...where,
                     $or: [
                         {
                            owner: userWallet
                         },
                         {
                             owner: 'admin',
                             requestUser: userId
                         }
                     ]
                 }
            }

            const results = await NFT.findAndCountAll({
                where,
                order: [['checkIn', 'ASC']],
                limit,
                offset: (page - 1) * limit,
                raw: true
            })

            return {
                results,
                status: 200
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default getCheckInTimeline;