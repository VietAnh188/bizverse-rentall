
import { logouploadDir, logoUploadDirS3, fileUploadDirS3 } from '../config';
import multer from 'multer';
const crypto = require('crypto');
const fs = require('fs');
const fse = require('fs-extra');
import bodyParser from 'body-parser';
import sharp from 'sharp';
import { s3UploadSingleFile } from './s3Service'
import { savePhotoToS3 } from '../helpers/photo/saveToS3'

var storage = multer.diskStorage({
//   destination: logouploadDir,
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
      console.log(fileName, 'successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'small_' + fileName)) {
    // small
    fs.unlink(filePath + 'small_' + fileName, (err) => {
      if (err) throw err;
      console.log('small_' + fileName, 'successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'medium_' + fileName)) {
    // medium
    fs.unlink(filePath + 'medium_' + fileName, (err) => {
      if (err) throw err;
      console.log('medium_' + fileName, 'successfully deleted');
    });
  }

}

const logoUpload = app => {

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/removeLogoFile', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    let filePath = logouploadDir;
    let fileName = req.body.fileName;

    await removeFiles(fileName, filePath);
    res.send({ status: 'Got your file to remove!' });
  });

  app.post('/uploadLogo', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, upload.single('file'), async (req, res, next) => {
    let file = req.file;

    const defaultImage = await sharp(file.path).toBuffer().then(async data=>{
        const awsFileName = logoUploadDirS3 + file.filename
        const results = await s3UploadSingleFile(awsFileName, data); 
        return results
    })

    // small - 50 * 50
    sharp(file.path)
      .resize(50, 50)
      .toBuffer()
      .then(async data => {
        const awsFileName = logoUploadDirS3 + 'small_' + file.filename;
        const results = await s3UploadSingleFile(awsFileName, data);
        return results
      })

    // medium - 100 * 100
    sharp(file.path)
      .resize(100, 100)
      .toBuffer()
      .then(async data => {
        const awsFileName = logoUploadDirS3 + 'medium_' + file.filename;
        const results = await s3UploadSingleFile(awsFileName, data); 
        return results
      })

    res.send({ status: 'SuccessFully uploaded!', file });

  });

  app.post('/removeEmailLogo', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    let filePath = logouploadDir;
    let fileName = req.body.fileName;

    await removeFiles(fileName, filePath);
    res.send({ status: 'Got your file to remove!' });
  });


};

export default logoUpload;
