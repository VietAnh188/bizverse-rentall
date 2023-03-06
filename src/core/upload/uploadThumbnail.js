import { savePhotoToS3 } from '../../helpers/photo/saveToS3';
import { AWS_SERVICE_URL, thumbnailUploadDirS3 } from '../../config';

const uploadThumbnail = async (req, res, _next) => {
  try {
    const file = req.file;

    const { photoName, status, fullPath } = await savePhotoToS3({
      photo: file.path,
      photoType: 'secondary',
      s3Dir: thumbnailUploadDirS3,
      save: { small: true, medium: true },
      smallSize: { width: 50, height: 50 },
      mediumSize: { width: 100, height: 100 }
    });

    if (status !== 200) {
      return { status: 400 }
    }

    res.send({
      status: 200,
      file: {
        ...file,
        path: thumbnailUploadDirS3 + photoName,
        filename: photoName
      },
      fullLink: fullPath
    });
  } catch (error) {
    console.log('-- Upload Thumbnail error --', error);

    res.send({
      status: 400
    })
  }
}

export default uploadThumbnail;
