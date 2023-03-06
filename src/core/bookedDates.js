import sequelize from '../data/sequelize';
import { NFT, Reservation } from '../data/models';

export const dateRange = (startDate, endDate, steps = 1) => {
    const dateArray = [];
    let currentDate = new Date(startDate);
    
    while (currentDate < new Date(endDate)) {
        let dateFormat = new Date(currentDate)
        dateArray.push(dateFormat.toISOString().split('T')[0]);
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }
    
    return dateArray;
}

export const getNFTsBookedDatesRange = async (listId) => {
    let where = {
        listId,
        checkOut: { $gte:  new Date().toISOString().split('T')[0]},
        canBooking: true,
        isDeleted: false
    }

    // Get list of NFTs
    const nfts = await NFT.findAll({ 
        where,
        raw: true
    })

    const nftsBookedDatesRange = nfts.map(nft => {
        return {
            id: nft.id,
            dateRange: dateRange(nft.checkIn, nft.checkOut),
            tokenId: nft.tokenId
        }
    })

    return nftsBookedDatesRange
}

export const getBookedDatesFromNFT = async ({ 
    listId, 
    userId, 
    isCheckingAllNFTs = false, 
    includePast = false, 
    nftCondition = {} 
}) => {
    let where = {
        listId,
        isDeleted: false
    }

    if (!includePast) {
        where = {
            ...where,
            checkOut: { $gte:  new Date().toISOString().split('T')[0]}
        }
    }

    if (!isCheckingAllNFTs) {
        where = {
            ...where,
            $or: [
                {
                    hostId: userId // Minted dates, check for host
                },
                {
                    canBooking: false // Check for guest
                },
                {
                    owner: {
                        $not: sequelize.col('originalOwner') // Check NFT was sold
                    }
                }
            ]
        }
    }

    // Get list of NFTs
    const nfts = await NFT.findAll({ 
        where: {
            ...where,
            ...nftCondition
        },
        raw: true
    })

    let bookedDates = []
    nfts.forEach(nft => {
        let listBookedDates = dateRange(nft.checkIn, nft.checkOut)
        bookedDates = [...bookedDates, ...listBookedDates]
    })

    return bookedDates;
}

export const getBookedDates = async ({ 
    listId, 
    userId, 
    isCheckingAllNFTs = false, 
    includePast = false, 
    ignoreReservation = false,
    ignoreNFT = false
}) => {
    let listingReservation = [];

    if (!ignoreReservation) {
        // Get list of reservations
        listingReservation = await Reservation.findAll({ 
            where: { listId,  checkOut: { $gte:  new Date().toISOString().split('T')[0]}, reservationState: { in: ['approved','pending', 'completed', 'blocked']} }
        })
    }
    
    let bookedDates = []

    if (!ignoreNFT) {
        // Get list of NFTs
        const nfts = await getBookedDatesFromNFT({ listId, userId, isCheckingAllNFTs, includePast })

        bookedDates = nfts || []
    }

    listingReservation.forEach(bookedItem => {
        let listBookedDates = dateRange(bookedItem.checkIn, bookedItem.checkOut)
        bookedDates = [...bookedDates, ...listBookedDates]
    })
    
    // Unique booked dates
    bookedDates = bookedDates.reduce((result, item) => {
        if (!result.includes(item)) {
            result.push(item);
        }

        return result;
    }, [])

    return bookedDates || []
}

export const getBookedDatesFromReservation = async ({listId, isPaid = false}) => {
    let bookedDates = [];
    let paymentStateFilter = ['pending', 'completed'];
    
    // only filter payment state = completed
    if (isPaid) {
        paymentStateFilter = ['completed']
    }
    
    const listingReservation = await Reservation.findAll({ 
        where: { 
            listId,  
            checkOut: { $gte:  new Date().toISOString().split('T')[0]}, 
            reservationState: { in: ['approved','pending', 'completed', 'blocked']},
            paymentState: { in: paymentStateFilter },
         },
        raw: true
    })

    listingReservation.forEach(bookedItem => {
        let listBookedDates = dateRange(bookedItem.checkIn, bookedItem.checkOut)
        bookedDates = [...bookedDates, ...listBookedDates]
    })

    // Unique booked dates
    bookedDates = bookedDates.reduce((result, item) => {
        if (!result.includes(item)) {
            result.push(item);
        }
        return result;
    }, [])

    return bookedDates
}