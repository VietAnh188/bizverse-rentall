import { getNFTsBookedDatesRange, dateRange } from '../../core/bookedDates';
import {
    Listing
} from '../../data/models';

export const getConflictingNFTsWithListing = async ({ 
    listId,
    checkIn,
    checkOut
}) => {
    try {
        const targetListing = await Listing.findOne({
            where: {
                id: listId
            },
            raw: true
        })

        if (!targetListing) {
            return {
                status: 400
            }
        }

        const nftsBookedDatesRange = await getNFTsBookedDatesRange(listId);
        const bookingDateRange = dateRange(checkIn, checkOut);
        const ids = nftsBookedDatesRange.reduce((result, item) => {
            const isDuplicating = bookingDateRange.some(bookingDate => item.dateRange.includes(bookingDate))
    
            if (isDuplicating) {
                result.push(item.id)
            }
    
            return result;
        }, [])

        return {
            status: 200,
            nftIds: ids
        }
    } catch(error) {
        console.log("-------------------------- get conflicting NFTs error ---------------------", error)
        return {
            status: 400
        }
    }
}