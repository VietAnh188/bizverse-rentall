import { gql } from 'react-apollo';
// Toaster
import { toastr } from 'react-redux-toastr';
import {
  SITE_ADMIN_PUBLIC_LISTING_START,
  SITE_ADMIN_PUBLIC_LISTING_SUCCESS,
  SITE_ADMIN_PUBLIC_LISTING_ERROR
} from '../../../constants';

export function togglePublishListing(listId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SITE_ADMIN_PUBLIC_LISTING_START,
    });

    try {
        const mutation = gql`
            mutation adminTogglePublishListing($listId:Int!) {
                adminTogglePublishListing (listId:$listId) {
                    id
                    status
                    action
                }
            }
        `;
        // Send Request to get listing data
        const { data } = await client.mutate({
            mutation,
            variables: { listId },
        });

        if (data?.adminTogglePublishListing?.status === 200) {
            dispatch({
                type: SITE_ADMIN_PUBLIC_LISTING_SUCCESS,
            });
            const message = data.adminTogglePublishListing.action === 'public' ? "Listing published successfully" : "Listing unpublished successfully"

            toastr.success("Success!", message);
        } else {
            dispatch({
                type: SITE_ADMIN_PUBLIC_LISTING_ERROR,
            });
        }
    } catch (error) {
      dispatch({
        type: SITE_ADMIN_PUBLIC_LISTING_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
