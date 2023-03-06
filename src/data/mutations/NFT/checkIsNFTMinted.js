// Graphql
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { NFT, UserProfile } from '../../models';
import ResponseType from '../../types/ResponseType'
import { checkDidNFTMint } from '../../../helpers/NFT/checkDidNFTmint';
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';

const checkIsNFTMinted = {
    type: ResponseType,
    args: {
        nftId: { type: new NonNull(IntType)}
    },
    async resolve({ request }, {
        nftId
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

        const nft = await NFT.findOne({
            where: {
                id: nftId
            }
        })

        if (!nft) {
            return {
                status: 400,
                errorMessage: "NFT not found"
            }
        }

        const { data } = await checkDidNFTMint(nft.tokenId);

        const userProfile = await UserProfile.findOne({
            where: {
                userId: request.user.id
            },
            raw: true
        })
        
        if (nft.isDeleted) {
            NFT.update({
                isDeleted: false
            }, {
                where: {
                    id: nftId
                }
            })
        }

        if (String(data?.owner).toLowerCase() === String(userProfile.wallet).toLowerCase()) {
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
            errorMessage: error.message
        }
    }
    }
}

export default checkIsNFTMinted