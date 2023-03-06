import { gql } from 'react-apollo';

import { toastr } from 'react-redux-toastr';
import { GET_NFT_ERROR, GET_NFT_START, GET_NFT_SUCCESS } from '../../constants';

const query = gql`
query($id: Int!) {
    getNFT(nftId: $id) {
        results {
            id
            listId
            name
            thumbnail
            country
            city
            checkIn
            checkOut
            roomType
            guestNumber
            beds
            detail
            houseType
            address
            description
            qrCode
            province
            isMappingReservation
            reservationId
            isYourNFT
            isExpired
        }
        status
        errorMessage
    }
}`;
export function getNFT(id) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_NFT_START,
        });
        try {
            const { data } = await client.query({
                query,
                fetchPolicy: "network-only",
                variables: { id }
            });
            if (data?.getNFT?.status === 200) {
                dispatch({
                    type: GET_NFT_SUCCESS,
                    payload: {
                        data: data.getNFT.results || [],
                    }
                })
            } else {
                toastr.error("Failed", data?.getNFT?.errorMessage || "Something error.")
                dispatch({
                    type: GET_NFT_ERROR
                });
            }
        } catch (error) {
            toastr.error("Failed", error.message);
            dispatch({
                type: GET_NFT_ERROR
            });
        }
    }
}