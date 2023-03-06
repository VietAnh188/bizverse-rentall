import { UserListingData, ListSettings, ListSettingsTypes } from '../../data/models'

export const getHouseTypeRoomType = async (listId) => {
    try {
        // Get house type and room type
        const listingData = await UserListingData.findAll({
            where: {
                listId
            },
            raw: true
        })
        const listingDataIds = listingData.map(item => item.settingsId)
        const houseTypeRoomType = await ListSettingsTypes.findAll({
            where: {
                typeName: {
                    $in: ['roomType', 'houseType']
                }
            },
            raw: true
        })
        let roomTypeId, houseTypeId;
        houseTypeRoomType.forEach(item => {
            if (item.typeName === 'roomType') {
                roomTypeId = item.id
            } else if (item.typeName === 'houseType') {
                houseTypeId = item.id;
            }
        })
        const listSettings = await ListSettings.findAll({
            where: {
                id: {
                    $in: listingDataIds
                }
            },
            raw: true
        })

        let houseType, roomType;
        listSettings.forEach(item => {
            if (item.typeId === roomTypeId) {
                roomType = item.itemName
            } else if (item.typeId === houseTypeId) {
                houseType = item.itemName
            }
        })

        return {
            success: true,
            houseType,
            roomType
        }
    } catch(error) {
        console.log("---------------------- get roomType houseType error------------------------", JSON.stringify(error))

        return {
            success: false,
            houseType: null,
            roomType: null
        }
    }
}