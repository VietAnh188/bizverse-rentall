import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import {
  GET_NFTs_START,
  GET_NFTs_SUCCESS,
  GET_NFTs_ERROR,
} from '../../constants';

const query = gql`
  query getCheckInTimeline ($type: String!, $page: Int!, $limit: Int){
    getCheckInTimeline(type: $type, page: $page, limit: $limit){
      results {
        rows {
            id
            name
            thumbnail
            country
            city
            checkIn
            checkOut
            guestNumber
            beds
            isSold
            isSelling
            nftState
            claimWallet
            requestUser
            reservationId
            isMappingReservation
            address
            province
        }
        count
      }
      status
      errorMessage
    }
  }
`;

export function getCheckInTimeline({ type, page = 1, limit = 5 }) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_NFTs_START
        });

        try {
            const { data } = await client.query({
                query,
                fetchPolicy: "network-only",
                variables: {
                    page,
                    type,
                    limit
                }
            });

            if (data?.getCheckInTimeline?.status === 200) {
                dispatch({
                    type: GET_NFTs_SUCCESS,
                    payload: {
                        data: data.getCheckInTimeline.results || { rows: [], count: 0 }
                    }
                })
            } else {
                toastr.error("Failed", data?.getCheckInTimeline?.errorMessage || "Something error.")

                dispatch({
                    type: GET_NFTs_ERROR
                });
            }
        } catch (error) {
            toastr.error("Failed", error.message)

            dispatch({
                type: GET_NFTs_ERROR
            });
        }
    };
}
