import checkUserAuthentication from '../../core/auth/checkUserAuthentication';
import { NFTCollection } from '../../data/models';
import { savePhotoToS3 } from '../../helpers/photo/saveToS3';
import { collectionImageDir } from '../../config'
import getLocaleMessage from "../../helpers/message/getLocaleMessage";

const createNtfCollection = async (req, res, _next) => {
  try {
    const collectionName = req.body.name;
    const description = req.body.description;
    const coverImage = req.files.coverImage[0];
    const avatar = req.files.avatar[0];
    const userId = req.user.id;
    //const userId = "56048f40-3fc5-11ed-8559-67e7497dd666"

    const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(req);

    if (userStatus !== 200) {
      return {
        status: userStatus,
        errorMessage: userErrorMessage
      }
    }

    if (!collectionName.trim().length) {
      return {
        status: 400,
        errorMessage: await getLocaleMessage({ locale: req.language, messageId: 'error.invalidInput' }) 
      }
    }

    let coverImageFullPath = '';
    if (coverImage) {
      const { fullPath } = await savePhotoToS3({
        photo: coverImage.path,
        photoType: 'secondary',
        s3Dir: collectionImageDir,
        save: { medium: true }
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

    const result = await NFTCollection.create({
      name: collectionName,
      description,
      userId,
      coverImage: coverImageFullPath,
      avatar: avatarFullPath
    });

    res.send({
      status: 200,
      result
    })
  } catch (error) {
    console.log(error);
    res.send({
      status: 400,
      errorMessage: 'Something went wrong ' + error.message
    });
  }
}

export default createNtfCollection;
