// Graphql
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

// Types
import { CheckListingHasNFTResponseType } from '../../types/NFTType';

// helpers
import dateRange from '../../mutations/Payment/dateRange';
import { getBookedDatesFromNFT } from '../../../core/bookedDates';
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication'

const checkListingHasNFT = {
    type: CheckListingHasNFTResponseType,
    args: {
        listId: { type: new NonNull(IntType) },
        checkIn: { type: new NonNull(StringType) },
        checkOut: { type: new NonNull(StringType) }
    },
    async resolve({ request }, {
        listId,
        checkIn,
        checkOut
    }){
        try  {
            // Check user authentication
            const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

            if (userStatus !== 200) {
                return {
                    status: userStatus,
                    errorMessage: userErrorMessage
                }
            }

            // Define condition to get NFT
            const nftCondition = {
                hostId: {
                    $not: request?.user?.id
                }
            }
            const bookedDates = await getBookedDatesFromNFT({ 
                listId, 
                userId: request?.user?.id, 
                isCheckingAllNFTs: true, 
                includePast: true, 
                nftCondition 
            })
            const bookingDateRange = dateRange(checkIn, checkOut);

            let isDuplicateBookingDate = bookingDateRange.some(bookingDate => bookedDates.includes(bookingDate));
      
            if (isDuplicateBookingDate) {
                return {
                    status: 200,
                    hasNFT: true
                }
            }

            return {
                status: 200,
                hasNFT: false
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default checkListingHasNFT;