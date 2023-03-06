
import multer from 'multer';
import bodyParser from 'body-parser';

// upload functions
import uploadFooterImage from './footerImage'
import uploadEmailLogo from './uploadEmailLogo';
import uploadThumbnail from './uploadThumbnail';

// remove functions
import removeThumbnail from './removeThumbnail';

const crypto = require('crypto');
const storage = multer.diskStorage({
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

const upload = multer({ storage });

const checkUser = (req, res, next) => {
  if (!req.user) {
    res.send(403);
  } else {
    next();
  }
}

const uploadFile = app => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/uploadFooterPhoto', checkUser, upload.single('file'), uploadFooterImage)
  app.post('/uploadEmailLogo', checkUser, upload.single('file'), uploadEmailLogo)
  app.post('/uploadThumbnail', checkUser, upload.single('file'), uploadThumbnail)

  app.delete('/removeThumbnail', checkUser, removeThumbnail);
}

export default uploadFile;
