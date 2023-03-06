import { gql } from 'react-apollo';

const query = gql`
query ($checkIn: String!, $checkOut: String!, $listId: Int!) {
    checkListingHasNFT (checkIn: $checkIn, checkOut: $checkOut, listId: $listId) {
      hasNFT
      status
      errorMessage
    }
  }
`;

export function checkListingHasNFT({ listId, checkIn, checkOut }) {
    return async (dispatch, getState, { client }) => {
        try {
            const { data } = await client.query({
                query,
                variables: {
                    listId,
                    checkIn,
                    checkOut
                }
            });

            return data?.checkListingHasNFT?.hasNFT || false
        } catch (error) {
            return false
        }
    };
}
