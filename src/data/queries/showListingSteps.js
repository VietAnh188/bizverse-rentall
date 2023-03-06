import ShowListingStepsType from '../types/ShowListingStepsType';
import { UserListingSteps, Listing, Reservation } from '../../data/models';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const showListingSteps = {

  type: ShowListingStepsType,

  args: {
    listId: { type: new NonNull(StringType) },
  },

  async resolve({ request }, { listId }) {

    if (request.user) {
      if(!request.user.admin){
        const getList = await Listing.findOne({
          attributes: ['id'],
          where: {
            id: listId,
            userId: request.user.id
          }
        });
        if (getList) {
          // Get All Listing Data
          const listingSteps = await UserListingSteps.find({
            attributes: [
              'id',
              'listId',
              'step1',
              'step2',
              'step3',
              'step4'
            ],
            where: {
              listId: listId
            }
          });

          // let hasReservation = false;

          // const reservation = await Reservation.findOne({
          //   where: {
          //     listId
          //   }
          // })

          // if (reservation) {
          //   hasReservation = true;
          // }
  
          return {
            ...listingSteps.dataValues,
            hasReservation: false
          };
        }
      } else {
        return {
          status: 404
        }
      }
    }
  },
};

export default showListingSteps;
