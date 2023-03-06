import { gql } from 'react-apollo';

import history from '../../core/history';
import {
  BOOKING_PROCESS_START,
  BOOKING_PROCESS_SUCCESS,
  BOOKING_PROCESS_ERROR,
} from '../../constants';

import { getListingFields } from '../../actions/getListingFields';

export function bookingProcess(listId, guests, startDate, endDate, preApprove, taxRate, isPayLater, reservationId) {

  return async (dispatch, getState, { client }) => {

    dispatch(getListingFields());

    dispatch({
      type: BOOKING_PROCESS_START,
      payload: {
        bookingLoading: true
      }
    });

    try {

      let query = gql`
          query UserListing($listId:String!) {
            UserListing (listId:$listId) {
              id
              userId
              title
              coverPhoto
              country
              city
              state
              personCapacity
              bookingType
              isPayLater
              listPhotos{
                id
                name
              }
              user {
                id
                email
                profile{
                  profileId
                  displayName
                  firstName
                  picture
                }
              }
              settingsData {
                id
                settingsId
                listsettings {
                  id
                  itemName
                  settingsType {
                    typeName
                  }
                }
              }
              houseRules {
                houseRulesId
                listsettings{
                  itemName
                  isEnable
                  settingsType {
                    typeName
                  }
                }
              }
              listingData {
                checkInStart,
                checkInEnd,
                basePrice,
                cleaningPrice,
                currency,
                weeklyDiscount,
                monthlyDiscount,
                taxRate
                cancellation {
                  id
                  policyName
                }
              }
              listBlockedPrice {
                id
                listId
                isSpecialPrice
                blockedDates
              }
            }
        }
      `;

      const { data } = await client.query({
        query,
        variables: {
          listId
        },
      });

      if (data && data.UserListing) {
        dispatch({
          type: BOOKING_PROCESS_SUCCESS,
          payload: {
            data: data.UserListing,
            bookDetails: {
              guests,
              startDate,
              endDate,
              preApprove,
              // taxRate,
            },
            bookingLoading: false
          }
        });
        let path = `/book/${listId}`;

        if (isPayLater) {
          path += `?isPayLater=true&reservationId=${reservationId}`
        }

        history.push(path);
      }

    } catch (error) {
      dispatch({
        type: BOOKING_PROCESS_ERROR,
        payload: {
          error,
          bookingLoading: false
        }
      });
      return false;
    }

    return true;
  };
}

