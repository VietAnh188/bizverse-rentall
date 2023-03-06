
import { fileuploadDir,fileUploadDirS3 } from '../config';
import multer from 'multer';
const crypto = require('crypto');
const fs = require('fs');
const fse = require('fs-extra');
import bodyParser from 'body-parser';
import sharp from 'sharp';
import { s3UploadSingleFile } from './s3Service'


var storage = multer.diskStorage({
//   destination: fileuploadDir,
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

  if (fs.existsSync(filePath + 'small_' + fileName)) {
    // small
    fs.unlink(filePath + 'small_' + fileName, (err) => {
      if (err) throw err;
      console.log('successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'x_small_' + fileName)) {
    // x_small
    fs.unlink(filePath + 'x_small_' + fileName, (err) => {
      if (err) throw err;
      console.log('successfully deleted');
    });
  }


  if (fs.existsSync(filePath + 'x_medium_' + fileName)) {
    // x_medium
    fs.unlink(filePath + 'x_medium_' + fileName, (err) => {
      if (err) throw err;
      console.log('successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'x_large_' + fileName)) {
    // x_large
    fs.unlink(filePath + 'x_large_' + fileName, (err) => {
      if (err) throw err;
      console.log('successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'xx_large_' + fileName)) {
    // xx_large
    fs.unlink(filePath + 'xx_large_' + fileName, (err) => {
      if (err) throw err;
      console.log('successfully deleted');
    });
  }

  if (fs.existsSync(filePath + 'placeholder_' + fileName)) {
    // placeholder
    fs.unlink(filePath + 'placeholder_' + fileName, (err) => {
      if (err) throw err;
      console.log('successfully deleted');
    });
  }
}

const fileUpload = app => {

  app.post('/photos', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, upload.array('file'), async (req, res, next) => {
    let files = req.files;
    // original file
    await sharp(files[0].path)
    .toBuffer()
    .then(async data => {
        const awsFileName = fileUploadDirS3 + files[0].filename;
        const results = await s3UploadSingleFile(awsFileName, data); 
        return results
    })

    // small - 101 * 67
    const smallImage = await sharp(files[0].path)
        .rotate()
        .resize(101, null)
        .toBuffer()
        .then(async data => {
            const awsFileName = fileUploadDirS3 + 'small_' + files[0].filename;
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
        })

    // x_small - 300 * 144
    const xSmallImage = await sharp(files[0].path)
        .rotate()
        .resize(300, null)
        .toBuffer()
        .then(async data => {
            const awsFileName = fileUploadDirS3 + 'x_small_' + files[0].filename;
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
        })

    if (files[0].mimetype === 'image/jpeg') {
      // x_medium - 450 * 300  
      const mediumImage = await sharp(files[0].path)
          .rotate()
          .resize(450, null)
          .toBuffer()
          .then(async data => {
                const awsFileName = fileUploadDirS3 + 'x_medium_' + files[0].filename;
                const results = await s3UploadSingleFile(awsFileName, data); 
                return results
          })

      // x_large - 900 * 650
      const largeImage = await sharp(files[0].path)
          .rotate()
          .resize(900, null)
          .toBuffer()
          .then(async data => {
            const awsFileName = fileUploadDirS3 + 'x_large_' + files[0].filename;
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
          })

      // xx_large - 1280 * 960
      const largeImageSize = await sharp(files[0].path)
          .rotate()
          .resize(1280, null)
          .toBuffer()
          .then(async data => {
            const awsFileName = fileUploadDirS3 + 'xx_large_' + files[0].filename;
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
          })

      // placeholder - 60 * 37
      const placeholderImage = await sharp(files[0].path)
          .rotate()
          .resize(60, null)
          .toBuffer()
          .then(async data => {
            const awsFileName = fileUploadDirS3 + 'placeholder_' + files[0].filename;
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
          })

    } else if (files[0].mimetype === 'image/png') {

      // x_medium - 450 * 300  
      const mediumImage = await sharp(files[0].path)
          .rotate()
          .resize(450, null)
          .toBuffer()
          .then(async data => {
            const awsFileName = fileUploadDirS3 + 'x_medium_' + files[0].filename;
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
          })

      // x_large - 900 * 650
      const largeImage = await sharp(files[0].path)
          .rotate()
          .resize(900, null)
          .toBuffer()
          .then(async data => {
            const awsFileName = fileUploadDirS3 + 'x_large_' + files[0].filename;
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
          })

      // xx_large - 1280 * 960
      const largeImageSize = await sharp(files[0].path)
          .rotate()
          .resize(1280, null)
          .toBuffer()
          .then(async data => {
            const awsFileName = fileUploadDirS3 + 'xx_large_' + files[0].filename;
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
          })

      // placeholder - 48 * auto
      const placeholderImage = await sharp(files[0].path)
          .rotate()
          .resize(48, null)
          .toBuffer()
          .then(async data => {
            const awsFileName = fileUploadDirS3 + 'placeholder_' + files[0].filename;
            const results = await s3UploadSingleFile(awsFileName, data); 
            return results
          })
    }
    res.send({ status: 'SuccessFully uploaded!', files });

  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/deletePhotos', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    let filePath = fileuploadDir;
    let fileName = req.body.fileName;
    await removeFiles(fileName, filePath);
    res.send({ status: 'Got your file to remove!' });
  });

  app.post('/removeMultiFiles', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    var files = req.body.files;
    let filePath = fileuploadDir;
    if (files != undefined && files.length > 0) {
      files.map(async function (item) {
        await removeFiles(item.name, filePath);
      });
      res.send({ status: 'SuccessFully removed!' });
    } else {
      res.send({ status: 'No files to remove' });
    }
  });


  /*app.post('/removeDir', function (req, res, next) {
    var folderName = req.body.folderName;
    var pathToRemove = 'public/' + folderName;
    if(folderName != undefined && folderName != null){
      // Remove Dir
      /*fse.remove(pathToRemove, function (err) {
        if (err) return console.error(err)

        console.log('success!')
      });*/

  // Make Dir
  /*fse.ensureDir(pathToRemove, function (err) {
    if (err) return console.error(err)

    console.log('success!');
  })
}
res.send({ status: 'Do you want to remove this dir?' }); 
});*/

};

export default fileUpload;