import { profilePhotouploadDir, profilePhotoUploadDirS3 } from '../config';
import multer from 'multer';
const crypto = require('crypto');
const fs = require('fs');
const fse = require('fs-extra');
import bodyParser from 'body-parser';
import sharp from 'sharp';
import {s3UploadSingleFile} from './s3Service'
import { savePhotoToS3 } from '../helpers/photo/saveToS3';


var storage = multer.diskStorage({
//   destination: profilePhotouploadDir,
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      let ext;
      switch (file.mimetype) {
        case 'image/jpeg':
          ext = '.jpeg';
          break;
        case 'image/png':
          ext = '.png';
          break;
        case 'image/svg+xml':
          ext = '.svg';
          break;
      }
      cb(null, raw.toString('hex') + ext);
    })
  }
});
var upload = multer({ storage: storage });
function removeFiles(fileName, filePath) {
  if (fs.existsSync(filePath + fileName)) {
    // Original
    fs.unlink(filePath + fileName, (err) => {
      if (err) throw err;

    });
  }
  if (fs.existsSync(filePath + 'small_' + fileName)) {
    // small
    fs.unlink(filePath + 'small_' + fileName, (err) => {
      if (err) throw err;

    });
  }
  if (fs.existsSync(filePath + 'medium_' + fileName)) {
    // medium
    fs.unlink(filePath + 'medium_' + fileName, (err) => {
      if (err) throw err;

    });
  }
}
const profilePhotoUpload = app => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.post('/uploadProfilePhoto', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, upload.single('file'), async (req, res, next) => {
    let file = req.file;
    
    const { photoName } = await savePhotoToS3({
      photo: file.path,
      photoType: 'secondary',
      save: { small: true, medium: true }
    })

    res.send({ status: 'SuccessFully uploaded!', file: {
      ...file,
      filename: photoName
    } });
  });
  app.post('/deleteProfilePicture', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    let filePath = profilePhotouploadDir;
    let fileName = req.body.fileName;
    await removeFiles(fileName, filePath);
    res.send({ status: 'Got your file to remove!' });
  });


};
export default profilePhotoUpload;
