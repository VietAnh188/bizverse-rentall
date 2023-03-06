// Graphql
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

// Models
import { NFT, UserProfile } from '../../models';

// Types
import GetNFTType from '../../types/GetNFTType';

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication'
import getLocaleMessage from '../../../helpers/message/getLocaleMessage'

const getNFT = {
    type: GetNFTType,
    args: {
        nftId: { type: new NonNull(IntType) },
    },
    async resolve({ request }, {
        nftId
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

            // check wallet address
            const userProfile = await UserProfile.findOne({
                attributes: ['wallet'],
                where: {
                    userId
                },
                raw: true
            })

            const userWallet = String(userProfile.wallet).toLowerCase()
            
            const nft = await NFT.findOne({
                where: {
                    id: nftId,
                    $or: [
                        { owner: userWallet },
                        { originalOwner: userWallet },
                        { claimWallet: userWallet },
                        {
                            owner: 'admin',
                            requestUser: request.user.id
                        }
                    ],
                    isDeleted: false
                },
                raw: true
            })

            if (!nft) {
                return {
                    status: 400,
                    errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.noPermission" })
                }
            }

            return {
                status: 200,
                results: nft
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default getNFT;