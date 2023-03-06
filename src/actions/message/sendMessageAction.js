import { gql } from 'react-apollo';
import {
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  SHOW_GLOBAL_INDICATOR,
  HIDE_GLOBAL_INDICATOR
} from '../../constants';

const ThreadItemsQuery = gql`
query getThread($threadType: String, $threadId: Int){
  getThread(threadType: $threadType, threadId: $threadId) {
    id
    listId
    guest
    host
    listData {
      title
      city
      state
      country
      listingData {
        basePrice
        cleaningPrice
        currency
        monthlyDiscount
        weeklyDiscount
      }
    }
    threadItemForType {
      id
      threadId
      reservationId
      content
      sentBy
      type
      startDate
      endDate
      personCapacity
      createdAt
      cancelData {
        id
        reservationId
        cancellationPolicy
        guestServiceFee
        hostServiceFee
        refundToGuest
        payoutToHost
        total 
        currency
      }
      reservation {
        id
        listId
        hostId
        guestId
        checkIn
        checkOut
        basePrice
        cleaningPrice
        total
        currency
        guests
        confirmationCode
        guestServiceFee
        discount
        discountType
        createdAt
        updatedAt
        hostServiceFee
        reservationState
        paymentState
        isPayLater
        bookingSpecialPricing {
          id
          reservationId
          blockedDates
          isSpecialPrice
        }
      }
    }
    threadItems {
      id
      threadId
      reservationId
      content
      sentBy
      type
      startDate
      endDate
      createdAt
    }
    threadItemsCount
    guestProfile {
      profileId
      displayName
      firstName
      location
      reviewsCount
      userVerification {
        id
        isEmailConfirmed
        isFacebookConnected
        isGoogleConnected
        isIdVerification
      }
    }
    guestUserData {
      email
      userBanStatus
    }
    hostProfile {
      profileId
      displayName
      firstName
      picture
      location
      reviewsCount
      userVerification {
        id
        isEmailConfirmed
        isFacebookConnected
        isGoogleConnected
        isIdVerification
      }
    }
    hostUserData {
      email
    }
    status
  }
}
`;
export function sendMessageAction({
  threadId,
  threadType,
  content,
  type,
  startDate,
  endDate,
  personCapacity,
  reservationId,
  onSuccess,
  effectGlobal = true
}) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: SEND_MESSAGE_START,
    });

    if (effectGlobal) {
      dispatch({
        type: SHOW_GLOBAL_INDICATOR
      })
    }

    try {

      let mutation = gql`
          mutation sendMessage(
          $threadId: Int!, 
          $content: String, 
          $type: String,
          $startDate: String,
          $endDate: String,
          $personCapacity: Int,
          $reservationId: Int
          ) {
            sendMessage(
            threadId: $threadId, 
            content: $content, 
            type: $type,
            startDate: $startDate,
            endDate: $endDate,
            personCapacity: $personCapacity,
            reservationId: $reservationId
            ){
              errorMessage
              status
            }
          }
      `;
      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          threadId,
          content,
          type,
          startDate,
          endDate,
          personCapacity,
          reservationId
        },
        refetchQueries: [
          {
            query: ThreadItemsQuery,
            variables: {
              threadId,
              threadType
            },
          }
        ]
      });
      if (data?.sendMessage?.status === 200) {
        if (onSuccess) {
          onSuccess();
        }

        dispatch({
          type: SEND_MESSAGE_SUCCESS,
        });
      }

      dispatch({
        type: SEND_MESSAGE_ERROR,
        payload: {}
      });
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_ERROR,
        payload: {
          error
        }
      });
    }
    if (effectGlobal) {
      dispatch({
        type: HIDE_GLOBAL_INDICATOR
      })
    }
  };
}