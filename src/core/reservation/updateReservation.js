// Sequelize models
import { Reservation, CancellationDetails } from '../../data/models';
import { sendEmailAndNotification } from './sendEmailAndNotification';

export const updateReservation = async ({ 
    userId, 
    reservationId, 
    reservationState, 
    threadId 
}) => {
    const reservation = await Reservation.findOne({
        where: {
            id: reservationId
        }
    });
    reservation.reservationState = reservationState;
    // update reservation state;
    await reservation.save();

    if(reservationState === 'declined' && reservation.paymentState === 'completed'){
        const guestServiceFee = 0, hostServiceFee = 0, payoutToHost = 0;
        const refundToGuest = Number(reservation.total) + Number(reservation.guestServiceFee);
        const total = refundToGuest;
        await CancellationDetails.create({
            cancelledBy: "host",
            currency: reservation.currency,
            cancellationPolicy: reservation.cancellationPolicy,
            guestServiceFee,
            hostServiceFee,
            payoutToHost,
            refundToGuest,
            total,
            reservationId
        })
    }


    sendEmailAndNotification({ reservationState, reservationId, threadId, userId })
}