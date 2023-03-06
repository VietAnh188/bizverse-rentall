// Graphql
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import userLoginType from '../types/userLoginType';

// Authentication Utils
import bcrypt from 'bcrypt';
import { createJWToken } from '../../helpers/auth';
import { getSocialUserInformation } from '../../helpers/user/getSocialUserInformation'
import { savePhotoToS3 } from '../../helpers/photo/saveToS3'

// Sequelize models
import { User, UserProfile, UserVerifiedInfo, EmailToken,  UserToken } from '../../data/models';
const userLogin = {
  type: userLoginType,
  args: {
    access_token:{type: new NonNull(StringType)}
  },

  async resolve({ request, response }, {
    access_token
  }) {
    try {
        // Check if user already logged in
        if (!request.user) {
            let currentUser;
            const { status: getUserStatus, userData } = await getSocialUserInformation({ accessToken: access_token })
    
            if(getUserStatus === 200) {
                let checkUser = await User.findOne({ 
                    attributes: ['id', 'email', 'password', 'userBanStatus'],
                    where: {
                        bizverseUserId: userData.bizverseUserId,
                        userDeletedAt: {
                            $eq: null
                        },
                    },
                    order: [
                        [`createdAt`, `DESC`],
                    ],
                    raw: true
                })
                
                if (checkUser) {
                    currentUser = checkUser;
                } else {
                    // new user login from social 
                    let signupType = 'bizverse';

                    // Save avatar to s3
                    let picture;

                    if (userData.avatar) {
                        const { photoName } = await savePhotoToS3({ photo: userData.avatar, save: { medium: true, small: true } })

                        picture = photoName
                    }

                    // create new user
                    const user = await User.create({
                        bizverseUserId: userData.bizverseUserId,
                        email: userData.email,
                        emailConfirmed: true,
                        password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD, bcrypt.genSaltSync(8), null),
                        type: signupType,
                        userBanStatus: false,
                        profile: {
                            ...userData,
                            picture,
                        },
                        userVerifiedInfo: {
                            isEmailConfirmed: true
                        },
                        emailToken: {
                            email: userData.email,
                            token: Date.now()
                        }
                    },
                    {
                        raw: true,
                        include: [
                            { model: UserProfile, as: 'profile' },
                            { model: UserVerifiedInfo, as: 'userVerifiedInfo' },
                            { model: EmailToken, as: 'emailToken' }
                        ]
                    })

                    currentUser = user;
                }

                // Get use token
                const targetUserToken = await UserToken.findOne({
                    where: {
                        userId: currentUser.id
                    },
                    raw: true
                })

                // create or update user token
                if (targetUserToken) {
                    UserToken.update({
                        accessToken: access_token
                    }, {
                        where: {
                            userId: currentUser.id
                        }
                    });
                } else {
                    UserToken.create({
                        userId: currentUser.id,
                        accessToken: access_token,
                        tokenSavedAt: new Date(),
                        email:  currentUser.email
                    });
                }

                // Create new login token and return
                let token = await createJWToken(
                    currentUser.id, 
                    userData.email, 
                    access_token, 
                    userData.displayName,
                    userData.type
                );

                // TODO: Update user login
                // UserLogin...

                // set cookie for web request
                const expiresIn = 86400 ; // 1 days
                response.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });

                const currentUserProfile = await UserProfile.findOne({
                    where: {
                        userId: currentUser.id
                    },
                    raw: true
                })

                let preferredLanguageName = null;
                let languages = [
                    { value: 'id', label: 'Bahasa Indonesia' },
                    { value: 'ms', label: 'Bahasa Melayu' },
                    { value: 'ca', label: 'Català' },
                    { value: 'da', label: 'Dansk' },
                    { value: 'de', label: 'Deutsch' },
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Español' },
                    { value: 'el', label: 'Eλληνικά' },
                    { value: 'fr', label: 'Français' },
                    { value: 'it', label: 'Italiano' },
                    { value: 'hu', label: 'Magyar' },
                    { value: 'nl', label: 'Nederlands' },
                    { value: 'no', label: 'Norsk' },
                    { value: 'pl', label: 'Polski' },
                    { value: 'pt', label: 'Português' },
                    { value: 'fi', label: 'Suomi' },
                    { value: 'sv', label: 'Svenska' },
                    { value: 'tr', label: 'Türkçe' },
                    { value: 'is', label: 'Íslenska' },
                    { value: 'cs', label: 'Čeština' },
                    { value: 'ru', label: 'Русский' },
                    { value: 'th', label: 'ภาษาไทย' },
                    { value: 'zh', label: '中文 (简体)' },
                    { value: 'zh-TW', label: '中文 (繁體)' },
                    { value: 'ja', label: '日本語' },
                    { value: 'ko', label: '한국어' }
                ];
                
                if (currentUserProfile.preferredLanguage) {
                    languages.forEach(item => {
                        if (item.value === currentUserProfile.preferredLanguage) {
                            preferredLanguageName = item.label
                        }
                    })
                }

                return {
                    status: 200,
                    result: {
                        ...currentUserProfile,
                        token,
                        userId: currentUser.id,
                        email: currentUser.email,
                        preferredLanguageName
                    }
                };

            } else {
                response.clearCookie('id_token');

                return {
                    errorMessage: 'Access token is not valid',
                    status: 400
                }
            }
            
        } else {
            if (request.user.admin == true) {
                return {
                    status: 400,
                };
            } else {
                return {
                    status: 200,
                };
            }
        }
    } catch (error) {
        console.log(error)
    }
  },
};
export default userLogin;
