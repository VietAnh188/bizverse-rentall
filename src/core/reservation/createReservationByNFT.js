import { Reservation, ListingData } from '../../data/models';

export const createReservationByNFT = async ({
    listId,
    hostId,
    guests,
    checkIn,
    checkOut
}) => {
    const listingData = await ListingData.findOne({
        where: {
            listId
        },
        raw: true
    })
    const { checkInStart, checkInEnd } = listingData;

    const newReservation = await Reservation.create({
        listId,
        hostId: `host-${hostId}`,
        guestId: 'any',
        checkIn,
        checkOut,
        guests,
        message: 'NFT is Minted by host',
        paymentState: 'pending',
        reservationState: 'nft',
        basePrice: 0,
        currency: 'USD',
        total: 0,
        checkInStart,
        checkInEnd,
        hostServiceFeeType: 'percentage',
        hostServiceFeeValue: 0
    }, {
        raw: true
    })

    return newReservation;
}