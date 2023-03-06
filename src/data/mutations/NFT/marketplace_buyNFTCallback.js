// GrpahQL
import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import { NFT, Reservation } from '../../models';

// Type
import BuyNFTCallbackType from '../../types/BuyNFTCallbackType';

const buyNFTCallback = {
    type: BuyNFTCallbackType,
    args: {
        uri: { type: new NonNull(StringType) },
        tokenId: { type: new NonNull(IntType) },
        buyer: { type: new NonNull(StringType) }
    },
    async resolve({ request }, {
        uri,
        tokenId,
        buyer
    }){
        try {
            let isUpdated = false;
            const nft = await NFT.findOne({
                where: {
                    uri,
                    tokenId,
                    isDeleted: false
                },
                raw: true
            })

            if (nft && nft.owner === buyer.toLowerCase()) {
                return {
                    status: 400,
                    errorMessage: "Buyer is not the owner of the NFT"
                }
            }

            // change reservation state to block when nft minted by nft
            if (nft && nft.reservationId) {
                const reservation = await Reservation.findOne({
                    where: {
                        id: nft.reservationId
                    }
                })
                if (reservation) {
                    await Reservation.update({
                        reservationState: "blocked"
                    },{
                        where: {
                            id: nft.reservationId
                        }
                    }).then(() => {
                        isUpdated = true;
                    })
                }
            }

            // update owner of the nft
            await NFT.update({
                owner: buyer.toString().toLowerCase(),
            },{
                where: {
                    uri,
                    tokenId
                }
            })

            return {
                status: 200,
                results: {
                    isUpdated
                }
            }

        } catch (error) {
            console.log(error)
            return {
                status: 400,
                errorMessage: 'Something went wrong' + error
            }
        }   
    }
}

export default buyNFTCallback