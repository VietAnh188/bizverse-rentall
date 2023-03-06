import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import {
  GET_LISTINGS_START,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_ERROR,
} from '../../constants';

const query = gql`
query ($page: Int!, $limit: Int, $search: String, $checkIn: String, $checkOut: String) {
    getListings (page: $page, limit: $limit, search: $search, checkIn: $checkIn, checkOut: $checkOut) {
      results {
        rows {
            id
            title
        }
        count
      }
      status
      errorMessage
    }
  }
`;

export function getListings({ type, page = 1, search = '', limit, checkIn, checkOut, isSelling = false, isSold = false }) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_LISTINGS_START
        });

        try {
            const { data } = await client.query({
                query,
                fetchPolicy: "network-only",
                variables: {
                    page,
                    search,
                    checkIn,
                    checkOut,
                    limit
                }
            });

            if (data?.getListings?.status === 200) {
                dispatch({
                    type: GET_LISTINGS_SUCCESS,
                    payload: {
                        data: data.getListings.results || { rows: [], count: 0 }
                    }
                })
            } else {
                toastr.error("Failed", data?.getListings?.errorMessage || "Something error.")

                dispatch({
                    type: GET_LISTINGS_ERROR
                });
            }
        } catch (error) {
            toastr.error("Failed", error.message)

            dispatch({
                type: GET_LISTINGS_ERROR
            });
        }
    };
}
