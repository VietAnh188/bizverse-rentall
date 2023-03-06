import { Reservation } from '../../data/models';

export async function updateReservation(id, { reservationState, paymentState, ...otherData } = {}) {
  const data = {
    ...otherData,
    paymentState: 'completed',
  }

  if (reservationState) {
    data.reservationState = reservationState
  }

  if (paymentState) {
    data.paymentState = paymentState
  }

  const reservation = await Reservation.update(data,
    {
      where: {
        id
      }
    });

  if (reservation) {
    return {
      status: 'updated'
    };
  } else {
    return {
      status: 'failed to update the reservation'
    }
  }
}