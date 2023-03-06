// Authentication Utils
import FormData from 'form-data';
import axios from 'axios';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import moment from 'moment';
import { User, Country } from '../../data/models';

export const getSocialUserInformation = async ({ accessToken }) => {
    try {
        // get social check accessToken status
        const URL = `${process.env.ACCESS_TOKEN_SERVER_URL}?access_token=${accessToken}`;
        const form = new FormData();

        form.append('server_key', process.env.SERVER_KEY);
        let socialUserData = await axios({
            method: 'post',
            url: URL,
            data: form,
            headers: { ...form.getHeaders() }
        }).then((data) => data.data)

        if(socialUserData?.api_status === 200) {
            const { data: socialUserProfile } = socialUserData

            const currentUser = await User.findOne({ 
                where: {
                    bizverseUserId: socialUserProfile.user_id,
                },
                raw: true
            })
                
            let updatedFirstName = capitalizeFirstLetter(
                socialUserProfile.first_name.trim() ? socialUserProfile.first_name.trim() 
                    : (currentUser.firstName || socialUserProfile.email.trim().split("@")[0])
            );
            let displayName = socialUserProfile.username || (updatedFirstName + ' ' + socialUserProfile.last_name);
            

            const countryId = socialUserProfile.country_id;
            let country, countryCode, countryName;

            if (countryId) {
                const targetCountry = await Country.findOne({
                    where: {
                        id: countryId
                    },
                    raw: true
                })

                if (targetCountry) {
                    country = targetCountry.id
                    countryCode = targetCountry.dialCode
                    countryName = targetCountry.countryCode
                }
            }

            return {
                status: 200,
                userData: {
                    bizverseUserId: socialUserProfile.user_id,
                    info: socialUserProfile.about,
                    avatar: socialUserProfile.avatar,
                    firstName: updatedFirstName,
                    lastName: socialUserProfile.last_name,
                    displayName: displayName,
                    dateOfBirth: moment(socialUserProfile.birthday).format("MM-YYYY-DD"),
                    wallet: socialUserProfile.public_key,
                    phoneNumber: socialUserProfile.phone_number,
                    gender: socialUserProfile.gender[0].toUpperCase() + socialUserProfile.gender.substring(1),
                    preferredLanguage: socialUserProfile.language,
                    email: socialUserProfile.email,
                    location: socialUserProfile.address,
                    country,
                    countryCode,
                    countryName
                }
            };
        } else {
            return {
                status: 400
            }
        }

    } catch(error) {
        return {
            status: 400
        }
    }
}