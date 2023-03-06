import ShowListingType from '../../types/ShowListingType';
import { Listing } from '../../models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const managePublish = {

  type: ShowListingType,

  args: {
    listId: { type: new NonNull(IntType) },
    action: { type: new NonNull(StringType) },
  }, 

  async resolve({ request }, { listId, action }) {

    const where = { id: listId, isReady: true };

    if (request.user) {
        if (!request.user.admin) {
            where.userId = request.user.id
        }

        let isListingUpdated = false;
            
        // Only admin can public listing
        if(action === 'publish' && request.user.admin) {
            await Listing.update({
                isPublished: true,
                listApprovalStatus: 'approved'
            },{
                where
            }).spread(function(instance){
                // Check if any rows are affected
                if(instance > 0) {
                    isListingUpdated = true;
                }
            });
        } else if (action === 'unPublish') {
            await Listing.update({
                isPublished: false,
                listApprovalStatus: null
            },{
                where
            }).spread(function(instance){
                // Check if any rows are affected
                if(instance > 0) {
                    isListingUpdated = true;
                }
            });
        }

        if (isListingUpdated) {
            return {
                status: 200,
                id: listId
            }
        } else {
            return {
                status: 400,
                message: 'List is not updated'
            }
        }
    } 

    return {
        status: 400,
        message: 'You are not logged in'
    }
}};

export default managePublish;