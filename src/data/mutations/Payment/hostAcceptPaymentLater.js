 // GraphQL
 import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
  } from 'graphql'; 

// Sequelize models
import ChangeReservationType from '../../types/ChangeReservationTypes';
import { Reservation } from '../../models';
import * as config from '../../../config'

const hostAcceptPaymentLater = {
    type: ChangeReservationType,
    args: {
        reservationId: { type: new NonNull(IntType) }
    },

    async resolve({ request, response }, {
        reservationId
    }) {
        try {  

            // Check if user already logged in
            if (request.user && !request.user.admin) {
                let reservation = await Reservation.findOne({
                    where: {
                        id: reservationId,
                        reservationState: 'approved',
                        paymentState: 'pending',
                        hostId: request.user.id
                    },
                    raw: true
                })

                if (!reservation) {
                    return  {
                        status: 400,
                        errorMessage: "The reservation is not valid"
                    }
                }

                await Reservation.update({
                    paymentState: config.PAYMENT_STATE_COMPLETED
                },{
                    where: { 
                        id: reservationId 
                    }
                })

                return {
                    status: 200,
                    results: { 
                        id: reservationId
                    }
                }

            } else {
                return {
                    status: 500 ,
                    errorMessage: 'You are not loggedIn'
                };
            }
        } catch (error) {
            console.log('--------------------------------------- host confirm payment later error-------------', JSON.stringify(error));

            return {
                errorMessage: 'Something went wrong: ' + error.message,
                status: 400
            };
        }
    },
};

export default hostAcceptPaymentLater;