 // Graphql
 import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql'; 

// Sequelize models
import ChangeReservationType from '../../types/ChangeReservationTypes';
import { Reservation } from '../../models';
  
  const guestCancelPayLater = {
  
    type: ChangeReservationType,
  
    args: {
        reservationId: { type: new NonNull(IntType) }
    },
  
    async resolve({ request, response }, {
        reservationId
    }) {
      try{  
        // Check if user already logged in
        if (request.user && !request.user.admin) {

                let reservationCheck = await Reservation.findOne({ 
                    where: {
                        id: reservationId, 
                        guestId: request.user.id, 
                        isPayLater: true,
                        $or:[
                            {reservationState: 'pending', paymentState: 'pending'}, 
                            {reservationState: 'approved', paymentState: 'pending'}
                        ] 
                    }

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
                        errorMessage: 'The reservation which has payment later has expired'
                    }
                } else {
                    await Reservation.update({
                        reservationState: "cancelled"
                    },{
                        where: {
                            id: reservationId, 
                            hostId: request.user.id, 
                            isPayLater: true,
                            $or:[
                                {reservationState: 'pending', paymentState: 'pending'}, 
                                {reservationState: 'approved', paymentState: 'pending'}
                            ] 
                        } 
                    },)

                    return {
                        status: 200,
                        results: reservationCheck
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
  
  export default guestCancelPayLater;