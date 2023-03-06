import { ListingSnapshot, Listing } from '../../data/models'
import { getHouseTypeRoomType } from '../../helpers/listing/getHouseTypeRoomType'

export const createListingSnapshot = async (id) => {
    const currentListing = await Listing.findOne({
        where: {
            id
        },
        raw: true
    })
    const { houseType, roomType } = await getHouseTypeRoomType(currentListing.id)

    try {
        await ListingSnapshot.create({
            ...currentListing,
            id: undefined,
            originalListingId: currentListing.id,
            houseType,
            roomType,
            createdAt: undefined,
            updatedAt: undefined
        })

    } catch(error) {
        console.log("Create listing snapshot error", error.message)
    }
}