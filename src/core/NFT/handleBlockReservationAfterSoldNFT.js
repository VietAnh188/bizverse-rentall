import { Reservation, NFT } from '../../data/models';

export const handleBlockReservationAfterSoldNFT = async ({ tokenId, seller }) => {
    try {
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
    
        if (targetReservation.reservationState === 'approved' 
            && String(seller).toLowerCase() === String(targetNFT.owner).toLowerCase()
        ) {
           await Reservation.update({
                reservationState: 'blocked'
            }, {
                where: {
                    id: targetNFT.reservationId
                }
            })
        }
    } catch (error) {
        console.log(`handleBlockReservationAfterSoldNFT error: `, error)
    }
}