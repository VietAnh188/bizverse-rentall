// GraphQL
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

// Models
import { Listing, NFT, ListBlockedDates, UserProfile } from '../../models';

// Types
import NFTType from '../../types/NFTType';

// helpers
import dateRange from '../../mutations/Payment/dateRange';
import { getBookedDates } from '../../../core/bookedDates';
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication'
import getLocaleMessage from '../../../helpers/message/getLocaleMessage'

const checkNFTIsValid = {
    type: NFTType,
    args: {
        listId: { type: new NonNull(IntType) },
        checkIn: { type: new NonNull(StringType) },
        checkOut: { type: new NonNull(StringType) },
        isMintByReservation: { type: BooleanType }
    },
    async resolve({ request }, {
        listId,
        checkIn,
        checkOut,
        isMintByReservation = false
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

            const userId = request.user.id;

            // check wallet address
            const userProfile = await UserProfile.findOne({
                attributes: ['wallet'],
                where: {
                    userId
                },
                raw: true
            })
            if (!userProfile || !userProfile.wallet || !userProfile.wallet.trim()) {
                return {
                    status: 400,
                    errorMessage: await getLocaleMessage({ locale: request.language, messageId: 'error.walletNotFound' })
                }
            }

            // check Reservation is valid for the host
            const listing = await Listing.findOne({
                where: {
                    userId,
                    id: listId,
                    isReady: true,
                    isPublished: true
                }
            })

            if (!listing) {
                return {
                    status: 400,
                    errorMessage: await getLocaleMessage({ locale: request.language, messageId: 'error.noPermission' })
                };
            }

            // ================= START check valid checkIn checkOut dates =================
            const bookingDateRange = dateRange(checkIn, checkOut);
            const bookedDates = await getBookedDates({ 
                listId, 
                userId, 
                isCheckingAllNFTs: true, 
                ignoreReservation: isMintByReservation
            }) || []

            // add blockedDates to bookedDates
            const listBlockedDates = await ListBlockedDates.findAll({
                attributes: ['blockedDates'],
                where: {
                    listId: listId,
                    blockedDates: { $gte:  new Date().toISOString().split('T')[0]}
                },
                raw: true
            });
            listBlockedDates.forEach(blockedDate => {
                bookedDates.push(blockedDate.blockedDates);
            });
            
            // check duplicateBookingDate
            let duplicateBookingDate = bookingDateRange.some(bookingDate => bookedDates.includes(bookingDate));
            
            if (duplicateBookingDate) {
                return {
                    status:  400,
                    errorMessage: await getLocaleMessage({ locale: request.language, messageId: 'error.selectedDatesNotAvailable' })
                }
            }

            const maxTokenId = await NFT.max("tokenId")

            return {
                status: 200,
                maxTokenId
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default checkNFTIsValid;