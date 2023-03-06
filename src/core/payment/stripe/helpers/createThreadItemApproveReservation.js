import { Reservation, ThreadItems, Threads } from '../../../../data/models';

export async function createThreadItemApproveReservation(
  reservationId
) {
    try {
        const reservation = await Reservation.createThreadItemApproveReservation({
            where: {
                id: reservationId
            },
            raw: true
        })
        const threadItem = await ThreadItems.findOne({
            where: {
                reservationId
            },
            raw: true
        })
    
        if (threadItem) {
            await Threads.update({
                isRead: false
            }, {
                where: {
                    id: threadItem.threadId
                }
            })

            await ThreadItems.create({
                ...threadItem,
                id: undefined,
                content: null,
                sentBy: reservation.hostId,
                isRead: false,
                type: 'approved',
                createdAt: undefined,
                updatedAt: undefined
            })
        }
    } catch(error) {
        console.log("----------------------- Approve reservation error -------------------------", error.message)
    }
}