// GraphQL
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

// Models
import { NFT, Reservation, Minting } from '../../models';

// Types
import GuestMintNFTType from '../../types/Minting/GuestMintNFTType'

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';
import { minNFT } from '../../../helpers/NFT/minNFT'
import { checkDidNFTMint } from '../../../helpers/NFT/checkDidNFTmint';
import { getUserProfile } from '../../../core/auth/getUseProfile';

const guestMintNFT = {
    type: GuestMintNFTType,
    args: {
        nftId: { type: new NonNull(IntType) },
    },
    async resolve({ request }, { nftId }){
        try  {
            const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

            if (userStatus !== 200) {
                return {
                    status: userStatus,
                    errorMessage: userErrorMessage
                }
            }

            const nft = await NFT.findOne({
                where: {
                    id: nftId,
                    isDeleted: false
                },
                raw: true
            })

            if (!nft) {
                return {
                    status: 400,
                    errorMessage: 'NFT is not existing'
                }
            }

            const userId = request.user.id;
            const userProfile = await getUserProfile(userId)
            const wallet = String(userProfile.wallet).toLowerCase()

            // Check if NFT is minted
            const { data } = await checkDidNFTMint(nft.tokenId);

            if (String(data?.owner).toLowerCase() === String(wallet).toLowerCase()) {
                return {
                    status: 200,
                    isMinted: true
                }
            }
            // --------------------------------
            
            const reservation = await Reservation.findOne({
                where: {
                    id: nft.reservationId,
                    reservationState: 'approved'
                },
                raw: true
            })

            if (!reservation) {
                return {
                    status: 400,
                    errorMessage: 'Booking is not existing'
                }
            }

            if (reservation.guestId !== userId) {
                return {
                    status: 400,
                    errorMessage: 'You do not have permission to mint'
                }
            }

            if (reservation.paymentState !== 'completed') {
                return {
                    status: 400,
                    errorMessage: 'The reservation has not been pay yet'
                }
            }

            const mintData = await Minting.findOne({
                where: {
                    nftId
                },
                raw: true
            })

            if (mintData) {
                return {
                    status: 200,
                    result: mintData
                }
            }

            const mintPayload = {
                isMintWithAdmin: false,
                data: {
                    ...nft,
                    recipient: wallet,
                    issuerId: nft.hostId
                }
            }

            
            const { success, data: mintNFTData, error } = await minNFT(mintPayload)

            if (success) {
                const mintData = await Minting.create({
                    ...mintNFTData,
                    nftId
                })

                return {
                    status: 200,
                    result: mintData
                }

            } else {
                return {
                    status: 400,
                    errorMessage: error
                }
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong' + error
            }
        }
    }
}

export default guestMintNFT;