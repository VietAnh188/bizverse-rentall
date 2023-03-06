// GraphQL
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import { NFT, UserProfile } from '../../models';

// Helpers
import { checkDidNFTMint } from '../../../helpers/NFT/checkDidNFTmint';
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';

// Types
import NFTsBulkActionType from "../../types/NFTsBulkActionType";

const claimNFT = {
    type: NFTsBulkActionType,
    args: {
        nftId: { type: new NonNull(IntType)}
    },
    async resolve({ request }, {
        nftId
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

        // Check user have wallet
        const userProfile = await UserProfile.findOne({
            attributes: ['wallet'],
            where: {
                userId
            },
            raw: true
        })

        const targetNFT = await NFT.findOne({
            where: {
                id: nftId
            },
            raw: true
        })

        const { data } = await checkDidNFTMint(targetNFT.tokenId);

        if (String(data?.owner).toLowerCase() === String(userProfile.wallet).toLowerCase()) {
            await NFT.update({
                owner: userProfile.wallet,
                claimWallet: userProfile.wallet
            }, {
                where: {
                    id: nftId
                }
            })

            return {
                status: 200
            }
        } else {
            return {
                status: 200,
                message: 'NFT is minting, please waiting for some minutes'
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

export default claimNFT