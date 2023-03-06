// GraphQL
import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import { NFTCollection } from '../../models';

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';
import { savePhotoToS3 } from '../../../helpers/photo/saveToS3'

// Types
import GetNFTCollectionType from '../../types/NFTCollection/GetNFTCollectionType'

// Configs
import { collectionImageDir } from '../../../config'

const claimNFT = {
    type: GetNFTCollectionType,
    args: {
        name: { type: new NonNull(StringType)},
        description: { type: StringType },
        coverImagePath: { type: StringType },
        avatarPath: { type: StringType },
    },
    async resolve({ request }, {
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

        const totalCollections = await NFTCollection.count({
            where: {
                userId
            }
        })

        if (totalCollections >= 12) {
            return {
                status: 400,
                errorMessage: "You have too much collection"
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
        
        const result = await NFTCollection.create({
            name,
            description,
            userId,
            coverImage,
            avatar
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

export default claimNFT