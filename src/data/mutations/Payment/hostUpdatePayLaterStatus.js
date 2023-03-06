 // GrpahQL
 import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
  } from 'graphql'; 

// Sequelize models
import ChangeReservationType from '../../types/ChangeReservationTypes';
import { Reservation } from '../../models';
  
  const hostUpdatePayLaterStatus = {
  
    type: ChangeReservationType,
  
    args: {
        reservationId: { type: new NonNull(IntType) },
        reservationState: { type: new NonNull(StringType) }
    },
  
    async resolve({ request, response }, {
        reservationId,
        reservationState
    }) {
      try {  
        // Check if user already logged in
        if (request.user && !request.user.admin) {

            if (reservationState.toString().toLowerCase() === 'approved' || reservationState.toString().toLowerCase() === 'declined') {

                let reservationCheck = await Reservation.findOne({ 
                    where: {id: reservationId, hostId: request.user.id, reservationState: 'pending', isPayLater: true}
                });

                if (!reservationCheck) {
                    return {
                        status: 400,
                        errorMessage: 'The reservation is not available'
                    }
                }

                const second = Math.floor((new Date() - new Date(reservationCheck.createdAt)) / 1000)
                let interval = second / 60;
                if (interval >= 60) {
                    return {
                        status: 400,
                        errorMessage: 'The payment later reservation has expired'
                    }
                } else {
                    await Reservation.update({
                        reservationState: reservationState
                    },{
                        where: {
                            id: reservationId, 
                            hostId: request.user.id, 
                            reservationState: 'pending'
                        } 
                    },)

                    return {
                        status: 200,
                        results: reservationCheck
                    }

                }
            } else {
                return {
                    status: 400,
                    errorMessage: 'The reservation state is not valid'
                }
            }
        } else {
            return {
                status: 500 ,
                errorMessage: 'You are not loggedIn'
            };
        }
     } catch (error) {
        return {
            errorMessage: 'Something went wrong' + error,
            status: 400
        };
     }
    },
  };
  
  export default hostUpdatePayLaterStatus;