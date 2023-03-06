import checkUserAuthentication from '../../core/auth/checkUserAuthentication';
import { NFTCollection } from '../../data/models';
import { savePhotoToS3 } from '../../helpers/photo/saveToS3';
import { collectionImageDir } from '../../config';
import getLocaleMessage, { getLocalesError } from "../../helpers/message/getLocaleMessage";

const updateNftCollection = async (req, res, _next) => {
  try {
    const coverImage = req.files.coverImage?.[0];
    const avatar = req.files.avatar?.[0];
    const { id, name, description } = req.body;
    const userId = req.user.id;

    const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(req);

    if (userStatus !== 200) {
      res.send({
        status: userStatus,
        errorMessage: userErrorMessage
      })
    }

    const collection = await NFTCollection.findOne({
      where: {
        id,
        userId
      },
      raw: true
    });

    if (!collection) {
      res.send({
        status: 400,
        errorMessage: await getLocaleMessage({ locale: req.language, messageId: 'error.recordNotFound' }) 
      })
    }

    if (!name.trim().length) {
      res.send({
        status: 400,
        errorMessage: await getLocaleMessage({ locale: req.language, messageId: 'error.invalidInput' }) 
      })
    }

    let coverImageFullPath = '';
    if (coverImage) {
      const { fullPath } = await savePhotoToS3({
        photo: coverImage.path,
        photoType: 'secondary',
        save: { medium: true },
        s3Dir: collectionImageDir
      });
      coverImageFullPath = fullPath;
    }

    let avatarFullPath = '';
    if (avatar) {
      const { fullPath } = await savePhotoToS3({
        photo: avatar.path,
        photoType: 'secondary',
        save: { medium: true },
        s3Dir: collectionImageDir
      });
      avatarFullPath = fullPath;
    }

    const updateData = {
      name,
      description,
    }

    if (coverImageFullPath) {
      updateData.coverImage = coverImageFullPath
    }

    if (avatarFullPath) {
      updateData.avatar = avatarFullPath
    }

    const result = await NFTCollection.update(updateData, {
      where: {
        id
      }
    });

    res.send({
      status: 200,
      result
    })
  } catch (error) {
    console.log(error);
    res.send({
      status: 400,
      errorMessage: error.message
    });
  }
}

export default updateNftCollection;
