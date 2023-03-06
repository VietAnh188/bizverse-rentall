import { Reservation, Listing } from '../../data/models';
import moment from 'moment';

export const getNFTInformationFromReservation = async (reservationId) => {
    try {
        const targetReservation = await Reservation.findOne({
            where: {
                id: reservationId
            },
            raw: true
        })
        const listId = targetReservation?.listId
    
        const targetListing = await Listing.findOne({
            where: {
                id: listId
            },
            raw: true
        })
    
        if (targetListing && targetReservation) {
            const { 
                hostId,
                guestId,
                guests, 
                checkIn, 
                checkOut
            } = targetReservation;
            const { userId, beds, country, city, street, title } = targetListing;

            const data = {
                listId,
                checkIn: moment(checkIn).format('YYYY-MM-DD'),
                checkOut: moment(checkOut).format('YYYY-MM-DD'),
                name: title,
                country,
                city,
                guestNumber: guests,
                beds,
                address: `${street || ''} ${city || ''}`,
                userId,
                canBooking: false,
                reservationId,
                requestUser: guestId,
                hostId
            }

            return {
                success: true,
                data
            }
        }

        return {
            success: false
        }
    } catch(error) {
        return {
            success: false
        }
    }
}