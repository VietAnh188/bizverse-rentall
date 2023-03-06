// Graphql
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

// Models
import { ListPhotos, User } from '../../models';

// Types
import ResponseType from '../../types/ResponseType';

const updatePhoto = {
    type: ResponseType,
    args: {
        id: { type: new NonNull(IntType) },
        isPanorama: { type: BooleanType }
    },
    async resolve({ request }, {
        id,
        isPanorama
    }){
        try  {
            // authentication request
            if (!request.user) {
                return {
                    status: 400 ,
                    errorMessage: 'You are not loggedIn'
                };
            }

            // User id
            const userId = request.user.id;

            // check userBanStatus
            const userData = await User.findOne({
                attributes: [
                    'userBanStatus'
                  ],
                  where: { id: userId },
                  raw: true
            })
            if (userData?.userBanStatus) {
                return {
                    errorMessage: 'Your account has blocked for some reason and please contact our support team.',
                    status: 500
                }
            }

            await ListPhotos.update({
                isPanorama
            }, {
                where: {
                    id
                }
            })

            return {
                status: 200
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default updatePhoto;