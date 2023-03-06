import { UserProfile } from "../../data/models"

export const getUserProfile = async (userId) => {
    const userProfile = await UserProfile.findOne({
        where: {
            userId
        },
        raw: true
    })

    return userProfile || {}
}