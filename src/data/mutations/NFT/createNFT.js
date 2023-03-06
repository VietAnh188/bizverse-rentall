// GraphQL
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { getBookedDates } from '../../../core/bookedDates';

// Models
import { Listing, User, ListBlockedDates, UserProfile } from '../../models';

// Types
import MintNFTType from '../../types/MintNFTType'

// helpers
import dateRange from '../Payment/dateRange';
import { mintAndSaveNFT } from '../../../core/NFT/mintAndSaveNFT';

const createNFT = {
    type: MintNFTType,
    args: {
        listId: { type: new NonNull(IntType) },
        reservationId: { type: IntType },
        requestUser: { type: StringType },
        claimWallet: { type: StringType },
        tokenId: { type: IntType },
        checkIn: { type: new NonNull(StringType) },
        checkOut: { type: new NonNull(StringType) },
        thumbnail: { type: StringType },
        roomType: { type: StringType },
        houseType: { type: StringType },
        name: { type: new NonNull(StringType) },
        country: { type: new NonNull(StringType) },
        city: { type: new NonNull(StringType) },
        detail: { type: StringType },
        address: { type: new NonNull(StringType) },
        uri: { type: StringType },
        guestNumber: { type: new NonNull(IntType) },
        beds: { type: new NonNull(IntType) },
        owner: { type: StringType},
        originalOwner: { type: StringType},
        canBooking: { type: new NonNull(BooleanType) },
        isMintByReservation: { type: BooleanType }
    },
    async resolve({ request }, payload){
        try  {
            const { 
                listId,
                isMintByReservation,
                checkIn,
                checkOut
            } = payload;

            // authentication request
            if (!request.user) {
                return {
                    status: 400 ,
                    errorMessage: 'You are not loggedIn'
                };
            }

            const userId = request.user.id;

            // check userBanStatus
            const userData = await User.findOne({
                attributes: [
                    'userBanStatus'
                ],
                where: { id: userId },
                raw: true
            })
            if (userData &&  userData.userBanStatus === 1) {
                return {
                    errorMessage: 'Your account has blocked for some reason and please contact our support team.',
                    status: 500
                }
            }

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
                    errorMessage: "Your wallet address is not exist. Please update your wallet address"
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
                    status: 400 ,
                    errorMessage: 'You do not have permission to do this action'
                  };
            }

            // ================= START check valid checkIn checkOut dates =================
            if (!isMintByReservation) {
                const bookingDateRange = dateRange(checkIn, checkOut);
                let bookedDates = await getBookedDates({ 
                    listId, 
                    userId, 
                    isCheckingAllNFTs: true
                })

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
                let duplicateBookingDate = bookingDateRange.some(bookingDate=>bookedDates.includes(bookingDate));
                if (duplicateBookingDate) {
                    return {
                        status:  400,
                        errorMessage: "The selected date has been booked or blocked!"
                    }
                }
            }
            // ================= END check valid checkIn checkOut dates =================

            return await mintAndSaveNFT({ 
                payload: {
                    ...payload,
                    hostId: userId
                },
                isMintByReservation
            })

        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong' + error
            }
        }
    }
}

export default createNFT;