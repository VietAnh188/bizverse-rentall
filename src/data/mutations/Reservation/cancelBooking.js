// GraphQL
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import { Reservation } from '../../models';

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';

// Types
import ResponseType from "../../types/ResponseType";

const cancelBooking = {
    type: ResponseType,
    args: {
        reservationId: { type: new NonNull(IntType)}
    },
    async resolve({ request }, {
        reservationId
    }){
      try {
        const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

        if (userStatus !== 200) {
            return {
                status: userStatus,
                errorMessage: userErrorMessage
            }
        }

        const targetReservation = await Reservation.findOne({
            where: {
                id: reservationId
            },
            raw: true
        })

        if (targetReservation && targetReservation.paymentState === 'pending' && targetReservation.reservationState === 'pending') {
            await Reservation.update({
                reservationState: 'expired'
            }, {
                where: {
                    id: reservationId
                }
            })

            return {
                status: 200
            }
        }

        return {
            status: 400,
            errorMessage: 'Action failed'
        }

      } catch (error) {
        return {
            status: 400,
            errorMessage: 'Something went wrong ' + error.message
        }
    }
    }
}

export default cancelBooking