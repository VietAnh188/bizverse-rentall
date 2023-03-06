import ResponseType from '../../types/ResponseType';
import { getSocialUserInformation } from '../../../helpers/user/getSocialUserInformation'
import { savePhotoToS3 } from '../../../helpers/photo/saveToS3'
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';
import getLocaleMessage from '../../../helpers/message/getLocaleMessage'

// Sequelize models
import { 
    User, 
    UserToken, 
    UserProfile 
} from '../../models';

const syncBizverseSocial = {
    type: ResponseType,

    async resolve({ request, response }) {
        try {

            const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

            if (userStatus !== 200) {
                return {
                    status: userStatus,
                    errorMessage: userErrorMessage
                }
            }
            
            const userId = request.user.id

            // Get User Token
            const userToken = await UserToken.findOne({
                where: {
                    userId
                },
                raw: true
            })
            const { accessToken } = userToken
            const { status, userData } = await getSocialUserInformation({ accessToken })

            if(status === 200) {
                const { photoName } = await savePhotoToS3({ photo: userData.avatar, save: { small: true, medium: true } })

                // create new user
                await User.update({
                    email: userData.email,
                },
                {
                    where: {
                        id: userId
                    }
                })

                await UserProfile.update({
                    ...userData,
                    picture: photoName
                }, {
                    where: {
                        userId
                    }
                })

                return {
                    status: 200,
                };
            }

            return {
                status: 400,
                errorMessage: await getLocaleMessage({ locale: request.language, messageId: 'error.something' })
            }
        } catch (error) {
            console.log("--------------------- Sync social error --------------------------", error)

            return {
                status: 200,
                errorMessage: error.message
            }
        }
    },
};

export default syncBizverseSocial;
