import { Reservation, ThreadItems, Threads } from '../../data/models';
import { reservationState } from '../../config'

export const createReservationMessage = async (reservationId) => {
    try {
        const reservation = await Reservation.findOne({
            where: {
                id: reservationId
            },
            raw: true
        })

        let thread = await Threads.findOne({
            where: {
                listId: reservation.listId,
                host: reservation.hostId, 
                guest: reservation.guestId,
            },
            raw: true
        });

        if (thread) {
            await ThreadItems.create({
                threadId: thread.id,
                sentBy: reservation.guestId,
                content: reservation.message,
                type: reservation.bookingType === 'instant' ? 'intantBooking' : 'requestToBook',
                startDate:  reservation.checkIn,
                endDate: reservation.checkOut,
                reservationId: reservation.id,
                personCapacity: reservation.guests
            });

            await Threads.update({
                isRead: false
            }, {
                where: {
                    id: thread.id
                }
            })
        } else {
            const newThread = await Threads.create({
                listId: reservation.listId,
                host: reservation.hostId, 
                guest: reservation.guestId,
                isRead: false
            });

            if (newThread) {
                await ThreadItems.create({
                    threadId: newThread.id,
                    sentBy: reservation.guestId,
                    content: reservation.message,
                    type: reservation.bookingType === 'instant' ? 'intantBooking' : 'requestToBook',
                    startDate:  reservation.checkIn,
                    endDate: reservation.checkOut,
                    reservationId: reservation.id,
                    personCapacity: reservation.guests
                });
            }
        }
    } catch(error) {
        console.log("----------------------------- create reservation thread error -------------------", error.message)
    }
}