import AdminTogglePublishListingType from '../../../types/siteadmin/AdminTogglePublishListingType';
import { Listing } from '../../../models';

import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const adminTogglePublishListing = {

  type: AdminTogglePublishListingType,

  args: {
    listId: { type: new NonNull(IntType) },
  },

  async resolve({ request }, { listId }) {
    // Check whether user is logged in
    if (request.user && request.user.admin) {
      const publishedListing = await Listing.findOne({
        where: {
          isPublished: true,
          id: listId
        },
        raw: true
      })

      const updateData = {
        isPublished: !publishedListing,
        listApprovalStatus: publishedListing ? 'pending' : 'approved'
      }

      await Listing.update(
        updateData,
        {
            where: {
                id: listId
            }
        }
      )

      return {
        id: listId,
        status: 200,
        action: publishedListing ? 'unpublish' : 'public'
      }
    } else {
      return {
        status: 400,
        errorMessage: 'You are not logged In'
      };
    }
  },
};

export default adminTogglePublishListing;