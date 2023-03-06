import { User } from '../../data/models'
import getLocaleMessage from "../../helpers/message/getLocaleMessage";

const checkUserAuthentication = async ({ user: requestUser, language }) => {
    try {
        // authentication request
        if (!requestUser) {
            return {
                status: 400,
                errorMessage: await getLocaleMessage({ language, messageId: 'error.login' })
            };
        }

        // check userBanStatus
        const user = await User.findOne({
            where: { id: requestUser.id },
            raw: true
        })

        if (user?.userBanStatus) {
            return {
                status: 400,
                errorMessage: await getLocaleMessage({ language, messageId: 'error.accountBlocked' })
            };
        }

        return { 
            status: 200
        }
    } catch(error) {
        return {
            status: 400,
            errorMessage: await getLocaleMessage({ language, messageId: 'error.something' })
        }
    }
}

export default checkUserAuthentication;