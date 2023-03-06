import { gql } from 'react-apollo';
import {
    GET_ONE_FIN_PAYMENT_STATUS_START,
    GET_ONE_FIN_PAYMENT_STATUS_SUCCESS,
    GET_ONE_FIN_PAYMENT_STATUS_ERROR
} from '../../constants';

export function getOneFinPaymentStatus(trxRefNo) {
    return async (dispatch, getState, { client }) => {
        const query = gql`
            query($trxRefNo: String) {
                getOneFinPaymentStatus(trxRefNo: $trxRefNo) {
                    results {
                        reservationState
                    }
                    errorMessage
                    status
                }
            }
        `;

        dispatch({
            type: GET_ONE_FIN_PAYMENT_STATUS_START,
        });

        try {
            const { data } = await client.query({
                query,
                variables: { trxRefNo },
                fetchPolicy: 'network-only'
            })

            if (data && data.getOneFinPaymentStatus) {
                dispatch({
                    type: GET_ONE_FIN_PAYMENT_STATUS_SUCCESS,
                    payload: {
                        reservationState: data.getOneFinPaymentStatus?.results?.reservationState
                    }
                });
            } else {
                dispatch({
                    type: GET_ONE_FIN_PAYMENT_STATUS_ERROR,
                });
            }

        } catch (error) {
            dispatch({
                type: GET_ONE_FIN_PAYMENT_STATUS_ERROR,
            });
        }
    }
}