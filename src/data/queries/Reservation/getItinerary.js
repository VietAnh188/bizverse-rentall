import ReservationType from '../../types/ReservationType';
import { Reservation, ReservationSpecialPricing } from '../../models';
import sequelize from '../../sequelize';

import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const getItinerary = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType) }
  },

  async resolve({ request }, { reservationId }) {
    if (request.user) {
      const id = reservationId;
      const userId = request.user.id;
      let where;

      if (request.user.admin) {
        where = {
          id
        };
      } else {
        where = {
          id,
          $or: [
            {
              hostId: userId
            },
            {
              guestId: userId
            }
          ]
        };
      }
      const [reservation, [averagePrice]] = await Promise.all([
        Reservation.findOne({
          where,
          raw: true
        }),
        ReservationSpecialPricing.findAll({
          where: {
            reservationId
          },
          attributes: [[sequelize.fn('AVG', sequelize.col('isSpecialPrice')), 'averagePrice']],
          raw: true
        })
      ]);
      if(averagePrice && averagePrice.averagePrice > 0){
        reservation.basePrice = averagePrice.averagePrice;
      }

      return reservation;
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};

export default getItinerary;


/**

query getItinerary ($reservationId: Int!){
  getItinerary(reservationId: $reservationId){
    id
    listId
    hostId
    guestId
    checkIn
    checkOut
    listData {
      id
      title
      street
      city
      state
      country
      listingData {
        checkInStart
        checkInEnd
      }
      coverPhoto
      listPhotos {
        id
        name
      }
    }
    hostData {
      displayName
      picture
    }
  }
}

**/