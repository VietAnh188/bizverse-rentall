import { updateReservation } from './updateReservation';
// import { createTransaction } from './createTransaction';
import { emailBroadcast } from './email';
import { Listing, Reservation, ReservationPreApproved, Transaction } from '../../data/models'
import { getBookedDatesFromNFT } from '../../core/bookedDates'
import dateRange from '../../data/mutations/Payment/dateRange';
import { mintAndSaveNFT } from '../NFT/mintAndSaveNFT'; 
import { createThreadItemApproveReservation } from '../../core/payment/stripe/helpers/createThreadItemApproveReservation';
import { createReservationMessage } from '../../core/thread/createReservationMessage'

export const handleOnPaymentSuccess = async ({
    reservationId,
    payerEmail,
    payerId,
    receiverEmail,
    receiverId,
    transactionId,
    total,
    transactionFee,
    currency,
    ipn_track_id,
    paymentMethodId,
    ignoreTransaction = false
}) => {
    try {
        let reservationState = 'pending';
        let canContinue = true;

        // Get target reservation
        const targetReservation = await Reservation.findOne({
            where: {
                id: reservationId
            },
            raw: true
        })
        const { checkIn, checkOut, listId, hostId, guestId, guests, isPayLater } = targetReservation;

        // Check if reservation was pre-approved
        let reservationPreApproved = await ReservationPreApproved.findOne({
            where: {
                listId,
                checkIn,
                checkOut,
                guestId,
                hostId,
                status: 'completed'
            },
            raw: true
        })

        // Host need to approve reservation (include booking instant) if the booking dates duplicate with any NFT
        const nftBookedDates = await getBookedDatesFromNFT({ 
            listId, 
            userId: hostId, 
            isCheckingAllNFTs: true, 
            nftCondition: {
                canBooking: true
            } 
        })
        const bookingDateRange = dateRange(checkIn, checkOut);
        const isDuplicateBookingDate = bookingDateRange.some(bookingDate => nftBookedDates.includes(bookingDate));
        const originalReservationState = targetReservation.reservationState.toLowerCase();
        const targetListing = await Listing.findOne({
            where: {
                id: listId
            }
        })

        // Check should change reservation status to approved
        if (originalReservationState === 'approved'
            || (
                (reservationPreApproved 
                || targetListing.bookingType === 'instant')
                && !isDuplicateBookingDate
            )
        ) {
            reservationState = 'approved';

            // Mint a NFT if reservation is approved
            const { status } = await mintAndSaveNFT({
                payload: {
                    hostId,
                    listId,
                    checkIn,
                    checkOut,
                    reservationId,
                    requestUser: guestId,
                    guestNumber: guests,
                    userId: hostId,
                    canBooking: false
                },
                isMintByReservation: true
            })

            canContinue = status === 200; 
        }

        if (!ignoreTransaction) {
            // Create transaction for the payment
            const transaction = await Transaction.findOrCreate({
                where: {
                    reservationId,
                    transactionId
                },
                defaults: {
                    reservationId,
                    payerEmail,
                    payerId,
                    receiverEmail,
                    receiverId,
                    transactionId,
                    total,
                    transactionFee,
                    currency,
                    ipn_track_id,
                    paymentMethodId
                }
            });

            if (transaction && ipn_track_id) {
                Transaction.update({
                    ipn_track_id
                },
                {
                    where: {
                    id: reservationId,
                    transactionId
                    }
                })
            }
        }
        
        if (!canContinue) {
            return {
                status: 400
            }
        }

        // Update Reservation information
        const reservationNewData = {
            reservationState
        }

        if (targetReservation.isPayLater) {
            reservationNewData.isPayLater = false
        }

        await updateReservation(reservationId, reservationNewData);
            
        // Reservation message created for pay later
        if (!isPayLater) {
            await createReservationMessage(reservationId);
        }
        
        if (reservationState === 'approved' && originalReservationState !== 'approved') {
            createThreadItemApproveReservation(reservationId);
        }

        emailBroadcast(reservationId);

        return {
            status: 200,
            reservationState
        };
    } catch(error) {
        console.log("---------------- error handle on payment success ------------------", error.message)
        return {
            status: 400
        }
    }
}