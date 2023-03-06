import { logoUploadDirS3 } from '../../config';
import { savePhotoToS3 } from '../../helpers/photo/saveToS3'

const uploadEmailLogo = async (req, res, next) => {
  try {
    let file = req.file;

    const { photoName, status } = await savePhotoToS3({
      photo: file.path,
      photoType: 'secondary',
      s3Dir: logoUploadDirS3,
      save: { small: true, medium: true },
      smallSize: { width: 50, height: 50 },
      mediumSize: { width: 100, height: 100 }
    })

    if (status !== 200) {
      return {
        status: 400
      }
    }

    res.send({
      status: 200,
      file: {
        ...file,
        path: logoUploadDirS3 + photoName,
        filename: photoName
      }
    });
  } catch (error) {
    console.log("-------------------------- Upload email logo error --------------", error)

    res.send({
      status: 400
    })
  }
}

export default uploadEmailLogo;
