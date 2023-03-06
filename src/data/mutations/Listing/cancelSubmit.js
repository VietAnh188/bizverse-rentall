// GrpahQL
import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
  } from 'graphql';
  
  // GraphQL Type
  import EditListingType from '../../types/EditListingType';
  
  // Sequelize models
  import {
    Listing
  } from '../../models';
  
  const cancelSubmitListing = {
  
    type: EditListingType,
  
    args: {
      id: { type: IntType }
    },
  
    async resolve({ request, response }, {
      id
    }) {
      let isListingUpdated = false;
      const where = {
          id
      }

      if (request.user && !request.user.admin) {
        where.userId = request.user.id
      }

      if (request.user) {
        await Listing.update({
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
            id
          }
      } else {
          return {
              status: 400,
              message: 'This listing is not updated'
          }
      }
    },
  };
  
  export default cancelSubmitListing;
  