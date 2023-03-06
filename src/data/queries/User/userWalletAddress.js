import FormData from 'form-data';
import axios from 'axios';

// Types
import UserWalletAddressType from '../../types/userWalletAddressType';

// Models
import UserProfile from '../../models/UserProfile';

const userWalletAddress = {
    type: UserWalletAddressType,

    async resolve({ request, response }) {
        let status, errorMessage, wallet;

        try {
            // check user login
            if (!request.user) {
                status = 500;
                errorMessage = 'Currently, you are not logged in.'
            } else {
                const profile = await UserProfile.findOne({ 
                   where: {
                    userId: request.user.id
                   },
                   raw: true
                })

                if (!profile) {
                    return {
                        status: 400,
                        errorMessage: 'User not found'
                    }
                }

                if (profile.wallet) {
                    status = 200;
                    wallet = profile.wallet
                } else {
                    // Get wallet from social
                    const access_token = request.user.access_token;
                    const URL = `${process.env.ACCESS_TOKEN_SERVER_URL}?access_token=${access_token}`;
                    const form = new FormData();

                    form.append('server_key', process.env.SERVER_KEY);
                    let socialCheckToken = await axios({
                        method: 'post',
                        url: URL,
                        data: form,
                        headers: { ...form.getHeaders() }
                    }).then((data) => data.data)

                    if (socialCheckToken?.data?.public_key) {
                        await UserProfile.update({
                            wallet: socialCheckToken.data.public_key
                        }, {
                            where: {
                                userId: request.user.id
                            }
                        })

                        status = 200;
                        wallet = socialCheckToken.data.public_key;
                    } else {
                        status = 400;
                        errorMessage = 'Your wallet is missing, please add your wallet in Bizverse social then try again!'
                    }
                }
            }

        } catch(error) {
            errorMessage = 'Something went wrong' + error,
            status = 400
        }

        return {
            status,
            errorMessage,
            results: {
                wallet
            }
        }
    }
};

export default userWalletAddress;