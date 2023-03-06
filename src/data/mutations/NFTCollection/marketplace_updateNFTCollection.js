// GraphQL
import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType
} from 'graphql';
import { NFTCollection } from '../../models';

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';
import { savePhotoToS3 } from '../../../helpers/photo/saveToS3'

// Types
import GetNFTCollectionType from '../../types/NFTCollection/GetNFTCollectionType'

// Configs
import { collectionImageDir } from '../../../config'

const marketplace_updateNFTCollection = {
    type: GetNFTCollectionType,
    args: {
        id: { type: new NonNull(IntType)},
        name: { type: new NonNull(StringType)},
        description: { type: StringType },
        coverImagePath: { type: StringType },
        avatarPath: { type: StringType },
    },
    async resolve({ request }, {
        id,
        name = '',
        description = '',
        coverImagePath,
        avatarPath
    }){
      try {
        const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

        if (userStatus !== 200) {
            return {
                status: userStatus,
                errorMessage: userErrorMessage
            }
        }

        const userId = request.user.id;

        const collection = await NFTCollection.findOne({
            where: {
                id,
                userId
            },
            raw: true
        })

        if (!collection) {
            return {
                status: 400,
                errorMessage: 'Collection is not existing'
            }
        }

        if (!name.trim().length) {
            return {
                status: 400,
                errorMessage: 'Collection name is invalid'
            }
        }

        // Save cover image
        let coverImage = '';

        if (coverImagePath) {
            const { fullPath: coverImageFullPath } = await savePhotoToS3({
                photo: coverImagePath,
                photoType: 'secondary',
                save: { medium: true },
                s3Dir: collectionImageDir
            })

            coverImage = coverImageFullPath;
        }

        // Save avatar
        let avatar;

        if (avatarPath) {
            const { fullPath: avatarFullPath } = await savePhotoToS3({
                photo: avatarPath,
                photoType: 'secondary',
                save: { medium: true },
                s3Dir: collectionImageDir
            })

            avatar = avatarFullPath;
        }

        const updateData = {
            name,
            description,
            coverImage: coverImage.length ? coverImage : undefined,
            avatar: avatar.length ? avatar : undefined
        }

        const result = await NFTCollection.update(updateData, {
            where: {
                id
            }
        })

        return {
            status: 200,
            result
        }

      } catch (error) {
        return {
            status: 400,
            errorMessage: 'Something went wrong ' + error.message
        }
      }
    }
}

export default marketplace_updateNFTCollection;