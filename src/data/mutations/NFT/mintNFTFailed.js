// GraphQL
import {
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { NFT, User } from '../../models';

// Helpers
import { burnNFTs as burnNFTsAPI } from '../../../helpers/NFT/burnNFTs';

// Types
import NFTsBulkActionType from "../../types/NFTsBulkActionType";

const mintNFTFailed = {
    type: NFTsBulkActionType,
    args: {
        nftId: { type: IntType},
        isMintWithAdmin: { type: BooleanType }
    },
    async resolve({ request }, {
        nftId,
        isMintWithAdmin = false
    }){
        try {
            // authentication request
            if (!request.user) {
                return {
                    status: 400 ,
                    errorMessage: 'You are not loggedIn'
                };
            }

            // check userBanStatus
            const userData = await User.findOne({
                attributes: [
                    'userBanStatus'
                ],
                where: { id: request.user.id },
                raw: true
            })

            if (userData &&  userData.userBanStatus === 1) {
                return {
                    errorMessage: 'Your account has blocked for some reason and please contact our support team.',
                    status: 500
                }
            }

            // Check user is NFT owner
            const nft = await NFT.findOne({
                where: {
                    id: nftId,
                    hostId: request.user.id
                },
                raw: true
            })

            if (!nft) {
                return {
                    errorMessage: 'You are not the NFT owner',
                    status: 500
                }
            }

            let isBurnSuccess = true;
            // Burn NFTs on blockchain
            if (isMintWithAdmin) {
                const tokenIds = [nft.tokenId]

                isBurnSuccess = await burnNFTsAPI(tokenIds);
            }
            
            if (isBurnSuccess) {
                const updatedNFT = await NFT.update({
                    isDeleted: true
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
                    status: 400,
                    errorMessage: "Burn NFT failed"
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

export default mintNFTFailed