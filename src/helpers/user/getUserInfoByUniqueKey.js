
import { UserProfile, User } from '../../data/models';
const userFields = ['email', 'bizverseUserId'];
const userProfileFields = ['userId', 'profileId', 'wallet'];
/**
 * 
 * @param {{ email?: String, bizverseUserId?: Number,
 * userId?: String, profileId?: Number, wallet?: String
 * }} ObjectUniqueKey 
 * @returns 
 */
export const getUserInfoByUniqueKey = async (ObjectUniqueKey) => {
   try {
       for(const [key, value] of Object.entries(ObjectUniqueKey)){
        if(userFields.includes(key)){
            const user = await User.findOne({
                where: {
                    [key]: value
                },
                attributes: { exclude: ['createdAt', 'updatedAt']},
                raw: true
            });
            const userProfile = await UserProfile.findOne({
                where: {
                    userId: user.id
                },
                attributes: { exclude: ['createdAt', 'updatedAt']},
                raw: true
            })
            return { ...user, ...userProfile };
        }
        if(userProfileFields.includes(key)){
            const userProfile = await UserProfile.findOne({
                where: {
                    [key]: value
                },
                attributes: { exclude: ['createdAt', 'updatedAt']},
                raw: true
            });
            const user = await User.findOne({
                where: {
                    id: userProfile.userId
                },
                attributes: { exclude: ['createdAt', 'updatedAt']},
                raw: true
            });
            return { ...user, ...userProfile}
        }
       }
   } catch (error) {
     return null
   } 
} 