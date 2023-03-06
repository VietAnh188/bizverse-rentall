import { Reservation } from '../../data/models';
import { sendMailCloseOffer } from '../../helpers/send-mail/sendMailCloseOffer';

export const handleOnNFTisSold = ({ seller, buyer, nft, price, currency }) => {

    // Blocked reservation if existing
    Reservation.update({
        reservationState: 'blocked'
    }, {
        where: {
            id: nft.reservationId
        }
    })

    // Send mail
    sendMailCloseOffer({ seller, buyer, nft, price, currency })
}