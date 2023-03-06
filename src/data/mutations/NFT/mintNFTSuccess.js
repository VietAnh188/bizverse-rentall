// GraphQL
import {
    GraphQLInt as IntType,
} from 'graphql';
import { NFT, User } from '../../models';

// Helpers
import { burnNFTs as burnNFTsAPI } from '../../../helpers/NFT/burnNFTs';

// Types
import NFTsBulkActionType from "../../types/NFTsBulkActionType";

const mintNFTSuccess = {
    type: NFTsBulkActionType,
    args: {
        nftId: { type: IntType}
    },
    async resolve({ request }, {
        nftId
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

            // Burn NFTs on blockchain
            const updatedNFT = await NFT.update({
                isDeleted: false
            }, {
                where: {
                    id: nftId
                }
            })

            return {
                status: 200
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong ' + error.message
            }
        }
    }
}

export default mintNFTSuccess