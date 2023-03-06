import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import {
  GET_NFTs_START,
  GET_NFTs_SUCCESS,
  GET_NFTs_ERROR,
} from '../../constants';

const query = gql`
query ($page: Int!, $limit: Int, $type: String!, $search: String, $checkIn: String, $checkOut: String, $isSelling: Boolean, $isSold: Boolean) {
    getNFTs (type: $type, page: $page, limit: $limit, search: $search, checkIn: $checkIn, checkOut: $checkOut, isSelling: $isSelling, isSold: $isSold) {
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
            isExpired
            isClaimed
            isBought
            isOnMarketplace
            owner
            isMinting
        }
        count
      }
      status
      errorMessage
    }
  }
`;

export function getNFTs({ type, page = 1, search = '', limit = 8, checkIn, checkOut, isSelling = false, isSold = false }) {
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
                    search,
                    checkIn,
                    checkOut,
                    isSelling,
                    isSold,
                    limit
                }
            });

            if (data?.getNFTs?.status === 200) {
                dispatch({
                    type: GET_NFTs_SUCCESS,
                    payload: {
                        data: data.getNFTs.results || { rows: [], count: 0 }
                    }
                })
            } else {
                toastr.error("Failed", data?.getNFTs?.errorMessage || "Something error.")

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
