import { deleteFile } from '../s3Service';

const removeThumbnail = async (req, res, _next) => {
  try {
    const fileName = req.body.filename;
    await deleteFile(fileName);
    res.send({ status: 200 });
  } catch (error) {
    console.log('-------------- remove thumbnail error -----------', error);
    res.send({ status: 500 });
  }
}

export default removeThumbnail;
