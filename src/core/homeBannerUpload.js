
import { homebanneruploadDir, homeBannerUploadDirS3 } from '../config';
import multer from 'multer';
const crypto = require('crypto');
const fs = require('fs');
const fse = require('fs-extra');
import bodyParser from 'body-parser';
import sharp from 'sharp';
import { s3UploadSingleFile } from './s3Service'

var storage = multer.diskStorage({
//   destination: homebanneruploadDir,
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
      console.log('successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'x_' + fileName)) {
    // Resized Image
    fs.unlink(filePath + 'x_' + fileName, (err) => {
      if (err) throw err;
      console.log('successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'xx_large_' + fileName)) {
    // Resized Image
    fs.unlink(filePath + 'xx_large_' + fileName, (err) => {
      if (err) throw err;
      console.log('successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'placeholder_' + fileName)) {
    // Resized Image
    fs.unlink(filePath + 'placeholder_' + fileName, (err) => {
      if (err) throw err;
      console.log('successfully deleted');
    });
  }
}

const homeBannerUpload = app => {

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/uploadHomeBanner', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, upload.single('file'), async (req, res, next) => {
    let file = req.file;
    sharp(file.path)
        .toBuffer()
        .then(async data => {
          const awsFileName = homeBannerUploadDirS3 + file.filename
          const results = await s3UploadSingleFile(awsFileName, data); 
          return results
    })
    // Resized for home page - 655 * 345
    if (file.mimetype === 'image/jpeg') {
      sharp(file.path)
        .resize(2400, null)
        .toBuffer()
        .then(async data => {
          const awsFileName = homeBannerUploadDirS3 + 'xx_large_' + file.filename
          const results = await s3UploadSingleFile(awsFileName, data); 
          return results
        })
      
      // placeholder - 48 * auto
      sharp(file.path)
        .resize(48, null)
        .toBuffer()
        .then(async data => {
          const awsFileName = homeBannerUploadDirS3 + 'placeholder_' + file.filename
          const results = await s3UploadSingleFile(awsFileName, data); 
          return results
        })
         
    } else if (file.mimetype === 'image/png') {
      sharp(file.path)
        .resize(2400, null)
        .toBuffer()
        .then(async data => {
          const awsFileName = homeBannerUploadDirS3 + 'xx_large_' + file.filename
          const results = await s3UploadSingleFile(awsFileName, data); 
          return results
        })

      // placeholder - 48 * auto
      sharp(file.path)
        .resize(48, null)
        .toBuffer()
        .then(async data => {
          const awsFileName = homeBannerUploadDirS3 + 'placeholder_' + file.filename
          const results = await s3UploadSingleFile(awsFileName, data); 
          return results
        })
    }

    res.send({ status: 'SuccessFully uploaded!', file });

  });

  app.post('/deleteHomeBanner', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    let filePath = homebanneruploadDir;
    let fileName = req.body.fileName;

    await removeFiles(fileName, filePath);
    res.send({ status: 'Got your file to remove!' });
  });

};

export default homeBannerUpload;
