// Types
import GetUserType from '../../types/Marketplace/GetUserType'

// Helpers
import axios from 'axios';

const getNFT = {
    type: GetUserType,
    args: {},
    async resolve({ request }){
        try  {
            const { user } = request;

            if (!user) {
                return {
                    status: 400,
                    errorMessage: 'User is not logged in'
                }
            }

            const { access_token} = user;

            const { data } = await axios.get(`${process.env.BIZVERSE_LINK_SOCIAL_APP}app_api?access_token=${access_token}&type=get_user_data`);
            
            if (data?.status === 200) {
                return {
                    status: 200,
                    results: {
                        ...data.user_data,
                        access_token
                    }
                }
            }

            return {
                status: 400,
                errorMessage: 'Get user information error'
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default getNFT;