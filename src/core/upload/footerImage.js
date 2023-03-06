import { fileUploadDirS3 } from '../../config';
import { savePhotoToS3 } from '../../helpers/photo/saveToS3'

const uploadFooterImage = async (req, res, next) => {
    try {
        let file = req.file;

        const { status, photoName } = await savePhotoToS3({
            photo: file.path,
            photoType: 'secondary',
            s3Dir: fileUploadDirS3
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
                path: fileUploadDirS3 + photoName,
                filename: photoName
            }
        });
    } catch(error) {
        console.log("-------------------------- Upload footer image error --------------", error)

        res.send({
            status: 400
        })
    }
}

export default uploadFooterImage;