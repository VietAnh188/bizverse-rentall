import { gql } from 'react-apollo';
// Toaster
import { toastr } from 'react-redux-toastr';

import {
  MANANGE_LISTING_PUBLISH_STATUS_START,
  MANANGE_LISTING_PUBLISH_STATUS_SUCCESS,
  MANANGE_LISTING_PUBLISH_STATUS_ERROR,
} from '../../constants';
import { adminEmail } from '../../config';
import { sendEmail } from '../../core/email/sendEmail';
import { sendNotifications } from '../../helpers/sendNotifications';

// To Refresh the Manage Listing Status
const ManageListingQuery = gql` 
    query ManageListings{
        ManageListings {
            id
            title
            city
            updatedAt
            coverPhoto
            isPublished
            listApprovalStatus
            isReady
            listPhotos{  
                id
                name
            }
            settingsData {
                listsettings {
                    id
                    itemName
                }
            }
            listingSteps {
                id
                step1
                step2
                step3
                step4
            }
        }
  }`;

// To Refresh Listing Steps Query
const ListingStepsQuery = gql`
    query ($listId:String!) {
        showListingSteps (listId:$listId) {
            id
            listId
            step1
            step2
            step3
            step4
            listing {
                id
                isReady
                isPublished
                listApprovalStatus
            }
        }
    }`;

const getUpcomingBookingQuery = gql`
query getUpcomingBookings ($listId: Int!){
    getUpcomingBookings(listId: $listId){
      count
    }
  }`;

const ListingQuery = gql` 
  query UserListing($listId:String!,$preview: Boolean) {
    UserListing(listId:$listId, preview: $preview) {
      id
      userId
      title
      coverPhoto
      country
      city
      state
      personCapacity
      zipcode
      user {
        id
        email
        profile{
          profileId
          displayName
          firstName
        }
      }
    }
  }`;


export function ManagePublishStatus(listId, action) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: MANANGE_LISTING_PUBLISH_STATUS_START,
      payload: {
        publishListLoading: true
      }
    });

    let mutation = gql`
            mutation ManagePublish($listId: Int!, $action: String!) {
                managePublish(listId: $listId, action: $action) {
                    status
                }
            }
        `;

    // Update List Status
    let wishListStatus = gql`
            mutation updateListStatus($listId:Int!, $action: String!) {
                 updateListStatus (listId:$listId, action: $action) {
                    status
                 }
             }
        `;

    let upcomingBookingCount;
    const bookedData = await client.query({
      query: getUpcomingBookingQuery,
      variables: {
        listId
      },
      fetchPolicy: 'network-only'
    });

    if (bookedData && bookedData.data && bookedData.data.getUpcomingBookings) {
      upcomingBookingCount = bookedData.data.getUpcomingBookings.count;
    }

    try {

      let type = 'Publish Listing';
      if (action === 'unPublish') {
        type = 'UnPublish Listing'
      }

      if (upcomingBookingCount > 0 && action === 'unPublish') {
        toastr.error(type, 'You cannot unpublish as you have upcoming bookings or enquiries for this listing.');
        dispatch({
          type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
          payload: {
            publishListLoading: false
          }
        });
      } else {

        const { data } = await client.mutate({
          mutation,
          variables: {
            listId,
            action
          },
          refetchQueries: [
            { query: ManageListingQuery },
          ]
        });

        if (data.managePublish.status === '200') {

          const { dataList } = await client.mutate({
            mutation: wishListStatus,
            variables: {
              listId,
              action
            },
          });

          // Reload Existing Steps Page
          const { data } = await client.query({
            query: ListingStepsQuery,
            variables: { listId },
            fetchPolicy: 'network-only',
          });
          toastr.success(type, type + " is success!");
          dispatch({
            type: MANANGE_LISTING_PUBLISH_STATUS_SUCCESS,
            payload: {
              listingSteps: data.showListingSteps,
              publishListLoading: false
            }
          });
        } else {

          toastr.error(type, type + " is failed!");
          dispatch({
            type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
            payload: {
              status: data.managePublish.status,
              publishListLoading: false
            }
          });
        }
      }
    } catch (error) {
      dispatch({
        type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
        payload: {
          error,
          publishListLoading: false
        }
      });
    }
  };
}

export function submitForVerification(listId, listApprovalStatus) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: MANANGE_LISTING_PUBLISH_STATUS_START,
      payload: {
        publishListLoading: true
      }
    });

    let mutation = gql`
        mutation submitForVerification($id: Int,$listApprovalStatus: String){
          submitForVerification(id:$id, listApprovalStatus: $listApprovalStatus){
              id
              status
              errorMessage
            }
          }
        `;

    try {
      const dataListingQuery = await client.query({
        query: ListingQuery,
        variables: {
          listId,
          preview: true
        },
        fetchPolicy: 'network-only',
      });

      const { data } = await client.mutate({
        mutation,
        variables: {
          id: listId,
          listApprovalStatus
        }
      });
      if (data.submitForVerification.status === '200') {
        // Reload Existing Steps Page
        const { data } = await client.query({
          query: ListingStepsQuery,
          variables: { listId },
          fetchPolicy: 'network-only',
        });

        dispatch({
          type: MANANGE_LISTING_PUBLISH_STATUS_SUCCESS,
          payload: {
            listingSteps: data.showListingSteps,
            publishListLoading: false
          }
        });

        if (dataListingQuery && dataListingQuery.data.UserListing) {
          let listDetails = dataListingQuery.data.UserListing;
          let content = {
            listId: listDetails.id,
            listTitle: listDetails.title,
            hostName: listDetails.user.profile.firstName,
          }
          toastr.success('Success!', 'Your Listing has been submitted for Approval');

          let createHistory = gql`
            mutation createListingHistory($listId:Int!, $userId: String, $status: String, $reason: String) {
              createListingHistory (listId:$listId, userId: $userId, status:$status, reason:$reason) {
                    status
                 }
             }
        `;
          const { data } = await client.mutate({
            mutation: createHistory,
            variables: {
              listId,
              userId: listDetails.userId,
              status: "submitForverification",
            }
          });
          await sendEmail(adminEmail, 'listPublishRequest', content);
        }
      } else {

        toastr.error("Failed Action!");
        dispatch({
          type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
          payload: {
            status: data.managePublish.status,
            publishListLoading: false
          }
        });
      }

    } catch (error) {
      dispatch({
        type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
        payload: {
          error,
          publishListLoading: false
        }
      });
    }
  };
}

export function approveListing(listId, listApprovalStatus, reason) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: MANANGE_LISTING_PUBLISH_STATUS_START,
      payload: {
        publishListLoading: true
      }
    });

    let mutation = gql`
			mutation approveListing($id: Int, $listApprovalStatus: String){
				approveListing(id:$id, listApprovalStatus:$listApprovalStatus){
					id
					status
				}
			}
        `;

    try {

      const dataListingQuery = await client.query({
        query: ListingQuery,
        variables: {
          listId,
          preview: true
        },
        fetchPolicy: 'network-only',
      });

      const { data } = await client.mutate({
        mutation,
        variables: {
          id: listId,
          listApprovalStatus
        },
      });
      if (data.approveListing.status === "200") {
        const { data } = await client.query({
          query: ListingStepsQuery,
          variables: { listId },
          fetchPolicy: 'network-only',
        });

        if (dataListingQuery && dataListingQuery.data.UserListing) {
          let listDetails = dataListingQuery.data.UserListing;
          let content = {
            listId: listDetails.id,
            listTitle: listDetails.title,
            hostName: listDetails.user.profile.firstName,
            reason: listApprovalStatus === 'declined' ? reason : null,
          }

          let createHistory = gql`
            mutation createListingHistory($listId:Int!, $userId: String, $status: String!, $reason: String) {
              createListingHistory (listId:$listId, userId: $userId, status:$status, reason:$reason) {
                    status
                 }
             }
        `;

          if (listApprovalStatus === 'declined') {
            toastr.success('Success!', 'The Listing review request has been declined successfully.');
            const { data } = await client.mutate({
              mutation: createHistory,
              variables: {
                listId,
                userId: listDetails.userId,
                status: "declined",
                reason: reason,
              }
            });

            let notifyContent = {
              "screenType": "becomeahost",
              "userType": 'host',
              "listId": listId,
              "userName": listDetails.user.profile.firstName,
              "listTitle": listDetails.title,
              "reason": reason
            };
            sendNotifications('listDeclined', notifyContent, listDetails.userId);
            sendEmail(listDetails.user.email, 'adminListReject', content);

          } else {
            toastr.success('Success!', 'Listing is approved successfully!');
            const { data } = await client.mutate({
              mutation: createHistory,
              variables: {
                listId,
                userId: listDetails.userId,
                status: "approved",
              }
            });

            
            let notifyContent = {
              "screenType": "becomeahost",
              "userType": 'host',
              "listId": listId,
              "userName": listDetails.user.profile.firstName,
              "listTitle": listDetails.title,
            };
            sendNotifications('listApproved', notifyContent, listDetails.userId);
            sendEmail(listDetails.user.email, 'adminListApprove', content);
          }
        }
        dispatch({
          type: MANANGE_LISTING_PUBLISH_STATUS_SUCCESS,
          payload: {
            listingSteps: data.showListingSteps,
            publishListLoading: false
          }
        });
      } else {
        toastr.error("Failed Action!");
        dispatch({
          type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
          payload: {
            publishListLoading: false
          }
        });
      }

    } catch (error) {
      dispatch({
        type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
        payload: {
          error,
          publishListLoading: false
        }
      });
    }
  };
}
