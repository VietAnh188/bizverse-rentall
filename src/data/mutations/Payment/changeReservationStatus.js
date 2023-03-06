 // GrpahQL
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
  } from 'graphql'; 

// Sequelize models
import ChangeReservationType from '../../types/ChangeReservationTypes';
import { Reservation } from '../../models';
  
  const changeReservationStatus = {
  
    type: ChangeReservationType,
  
    args: {reservationId: { type: new NonNull(IntType) }},
  
    async resolve({ request, response }, {
        reservationId
    }) {
      try{

        // Check if user already logged in
        if (request.user && !request.user.admin) {
            let reservation = await Reservation.findOne({id: reservationId, guestId: request.user.id, reservationState: 'draft' });
            if (reservation) {
                let updateReservationState = await Reservation.update({
                    reservationState: 'pending'
                },{
                    where: {
                        id: reservationId, 
                        guestId: request.user.id, 
                        reservationState: 'draft'
                    } 
                },)

                return {
                    status: 200,
                    results: reservation
                }
                
            } else {
                return {
                    status: 400,
                    errorMessage: 'This reservation is not available'
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
  
  export default changeReservationStatus;
  