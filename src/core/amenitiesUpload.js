import { amenitiesUploadDir, amenitiesUploadDirS3 } from '../config';
import multer from 'multer';
const crypto = require('crypto');
const fs = require('fs');
const fse = require('fs-extra');
import bodyParser from 'body-parser';
import sharp from 'sharp';
import { s3UploadSingleFile } from './s3Service'

var storage = multer.diskStorage({
//   destination: amenitiesUploadDir,
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
const amenitiesUpload = app => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.post('/uploadAmenities', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, upload.single('file'), async (req, res, next) => {
    let file = req.file;
    await sharp(file.path)
        .rotate()
        .toBuffer()
        .then(async data => {
            const awsFileName = amenitiesUploadDirS3 + file.filename
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
        })
    // small - 100 * 100
      await sharp(file.path)
        .rotate()
        .resize(100, 100)
        .toBuffer()
        .then(async data => {
            const awsFileName = amenitiesUploadDirS3 + 'small_' + file.filename
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
        })

    // medium - 255 * 255
    await new Promise((resolve, reject) => {
      sharp(file.path)
        .rotate()
        .resize(255, 255)
        .toBuffer()
        .then(async data => {
            const awsFileName = amenitiesUploadDirS3 + 'medium_' + file.filename
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
        })
    });
    res.send({ status: 'SuccessFully uploaded!', file });
  });
  app.post('/deleteAmenities', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    let filePath = amenitiesUploadDir;
    let fileName = req.body.fileName;
    await removeFiles(fileName, filePath);
    res.send({ status: 'Got your file to remove!' });
  });


};
export default amenitiesUpload;
