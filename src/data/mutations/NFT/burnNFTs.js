// GraphQL
import {
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import { NFT } from '../../models';

// Helpers
import { burnNFTs as burnNFTsAPI } from '../../../helpers/NFT/burnNFTs'
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';
import { getUserProfile } from '../../../core/auth/getUseProfile'

// Types
import NFTsBulkActionType from "../../types/NFTsBulkActionType";

const burnNFTs = {
    type: NFTsBulkActionType,
    args: {
        nftIds: { type: new NonNull(new List(IntType))}
    },
    async resolve({ request }, {
        nftIds
    }){
      try {
        // authentication request
        const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

        if (userStatus !== 200) {
            return {
                status: userStatus,
                errorMessage: userErrorMessage
            }
        }
        const userId = request.user.id;
        const userProfile = await getUserProfile(userId) || {}
        const wallet = String(userProfile.wallet).toLowerCase()

        // Check user is NFTs owner
        const ownerNFTs = await NFT.findAll({
            attributes: ["id"],
            where: {
                id: {
                    $in: nftIds
                },
                owner: wallet,
                hostId: userId,
                isMinting: false,
                isSelling: false,
                lastPrice: null
            },
            raw: true
        })

        if (ownerNFTs.length !== nftIds.length) {
            return {
                errorMessage: 'You can not do this action',
                status: 400
            }
        }

        // Get list of NFT token ids
        const results = await NFT.findAll({
            attributes: ["tokenId"],
            where: {
                id: {
                    $in: nftIds
                }
            },
            raw: true
        })

        const tokenIds = results.reduce((data, item) => {
            data.push(item.tokenId)

            return data;
        }, [])

        // Burn NFT on blockchain
        const isBurnSuccess = await burnNFTsAPI(tokenIds);

        // if (isBurnSuccess) {
            await NFT.update({
                isDeleted: true,
                nftState: 'burned'
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
        // } else {
        //     return {
        //         status: 400,
        //         errorMessage: "Burn NFT failed"
        //     }
        // }

      } catch (error) {
        return {
            status: 400,
            errorMessage: 'Something went wrong ' + error.message
        }
    }
    }
}

export default burnNFTs