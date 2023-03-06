import { Reservation, NFT } from '../../data/models';

export const handleUnlockReservationAfterCancelSellNFT = async ({ tokenId, seller }) => {
   try{
    const targetNFT = await NFT.findOne({
        where: {
            tokenId
        },
        raw: true
    })

    if (!targetNFT || !targetNFT.reservationId) {
        return;
    }

    const targetReservation = await Reservation.findOne({
        where: {
            id: targetNFT.reservationId
        },
        raw: true
    })

    if (!targetReservation) {
        return;
    }

    if (targetReservation.reservationState === 'blocked' 
        && String(seller).toLowerCase() === String(targetNFT.claimWallet).toLowerCase()
    ) {
        await Reservation.update({
            reservationState: 'approved'
        }, {
            where: {
                id: targetNFT.reservationId
            }
        })
    }
   }catch(error){
        console.log(`handleUnlockReservationAfterCancelSellNFT error: `, error)
   }
}