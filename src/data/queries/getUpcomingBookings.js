import ReservationType from '../types/ReservationType';
import { Reservation, NFT } from '../models';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const getUpcomingBookings = {

    type: ReservationType,

    args: {
        listId: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { listId }) {

        if (request.user) {
            const getReservation = await Reservation.count({
                where: {
                    listId,
                    reservationState: ['pending', 'approved'],
                    paymentState: ['pending', 'completed']
                },
            });

            const countOfNFTs = await NFT.count({
                where: {
                    isDeleted: false,
                    listId
                }
            })

            return {
                count: getReservation + countOfNFTs
            }
        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};


export default getUpcomingBookings;




/**


query getUpcomingBookings ($listId: Int!){
  getUpcomingBookings(listId: $listId){
    count
  }
}


**/