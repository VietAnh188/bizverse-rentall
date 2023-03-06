// GrpahQL
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ShowListingType from '../../types/ShowListingType';
import { Listing, Reservation } from '../../models';

const getListMeta = {

    type: ShowListingType,

    args: {
        listId: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { listId }) {
        function dateRange(startDate, endDate, steps = 1) {
            const dateArray = [];
            let currentDate = new Date(startDate);
            
            while (currentDate < new Date(endDate)) {
                let dateFormat = new Date(currentDate)
                dateArray.push(dateFormat.toISOString().split('T')[0]);
                currentDate.setUTCDate(currentDate.getUTCDate() + steps);
            }
            
            return dateArray;
        }
          
        const listingReservation = await Reservation.findAll({ 
            where: { listId: listId,  checkOut: { $gte:  new Date().toISOString().split('T')[0]}, reservationState: { in: ['approved','pending', 'completed']} }
        })
        
        let bookedDays= []
        listingReservation.forEach(reservation=>{
            let listBookedDays = dateRange(reservation.checkIn, reservation.checkOut)
            bookedDays = [...bookedDays, ...listBookedDays]
        })

        return await Listing.findOne({
            where: { id: listId }
        });
    }
};

export default getListMeta;

/**
query getListData($listId: Int!) {
  getListMeta(listId:  $listId) {
    id
    reviewsStarRating
    bookedDays
  }
}

{
  "listId": 1
}
 */