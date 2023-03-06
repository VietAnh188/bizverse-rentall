// Graphql
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

// Models
import { NFT } from '../../models';

// Config
import { ADMIN_WALLET } from '../../../config'

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication'
import { getUserProfile } from '../../../core/auth/getUseProfile';

// Types
import GetBurnNFTInformationBeforeCancelType from '../../types/GetBurnNFTInformationBeforeCancelType';

const getBurnNFTInformationBeforeCancel = {
    type: GetBurnNFTInformationBeforeCancelType,
    args: {
        reservationId: { type: new NonNull(IntType) }
    },
    async resolve({ request }, {
        reservationId
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

            // Get User information
            const userId = request.user.id;
            const userProfile = await getUserProfile(userId)
            const userWallet = String(userProfile.wallet).toLowerCase()

            // Get nft
            const nft = await NFT.findOne({
                where: {
                  reservationId,
                  isDeleted: false
                },
                raw: true
              })
        
            if (!nft) {
                return {
                    status: 400,
                    errorMessage: 'NFT of this reservation is not found'
                }
            }
    
            const { isMinting, isOnMarketplace, isSelling, lastPrice, owner } = nft;
            let validOwner = owner === userWallet || owner === String(ADMIN_WALLET).toLowerCase() || owner === 'admin'
    
            if (isMinting || isOnMarketplace || isSelling || lastPrice !== null || !validOwner) { // lastPrice can be 0
                return {
                    status: 400,
                    errorMessage: 'The reservation is blocked for cancel'
                }
            }

            return {
                status: 200,
                results: {
                    didClaim: owner === userWallet,
                    tokenId: nft.tokenId,
                    guestWallet: userProfile.wallet.toLowerCase()
                }
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default getBurnNFTInformationBeforeCancel;