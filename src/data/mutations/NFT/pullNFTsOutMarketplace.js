// GraphQL
import {
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import { NFT } from '../../models';

import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';
import { getUserProfile } from '../../../core/auth/getUseProfile';

// Types
import NFTsBulkActionType from "../../types/NFTsBulkActionType";

const pullNFTsOutMarketplace = {
    type: NFTsBulkActionType,
    args: {
        nftIds: { type: new NonNull(new List(IntType))}
    },
    async resolve({ request }, {
        nftIds
    }){
      try {
        // authentication request && check userBanStatus
        const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

        if (userStatus !== 200) {
            return {
                status: userStatus,
                errorMessage: userErrorMessage
            }
        }

        const userId = request.user.id;
        const userProfile = await getUserProfile(userId)
        const wallet = String(userProfile.wallet).toLowerCase()

        // Check user is NFTs owner
        const ownerNFTs = await NFT.findAll({
            attributes: ["id"],
            where: {
                id: {
                    $in: nftIds
                },
                $or: [
                    {
                        originalOwner: wallet,
                    },
                    {
                        claimWallet: wallet
                    }
                ],
                owner: wallet,
                isMinting: false,
                isSelling: false, // is not selling
                isOnMarketplace: true, // is in marketplace
                lastPrice: null, // is not sold
            },
            raw: true
        })

        if (ownerNFTs.length !== nftIds.length) {
            return {
                errorMessage: 'You can not do this action',
                status: 400
            }
        }

        await NFT.update({
            isOnMarketplace: false
        }, {
            where: {
                id: {
                    $in: nftIds
                }
            }
        })
        
        return {
            status: 200,
            results: {
                nftIds
            }
        }
      } catch (error) {
        return {
            status: 400,
            errorMessage: 'Something went wrong ' + error.message
        }
    }
    }
}

export default pullNFTsOutMarketplace;