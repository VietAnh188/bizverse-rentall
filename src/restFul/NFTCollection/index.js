import multer from 'multer';
import bodyParser from "body-parser";
import crypto from 'crypto';

import createNtfCollection from "./create";
import updateNftCollection from './update';

const cors = require('cors');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (error, raw) => {
      if (error) return cb(error);

      let extension = '';

      switch (file.mimetype) {
        case 'image/jpeg':
          extension = '.jpeg';
          break;
        case 'image/png':
          extension = '.png';
          break;
      }

      cb(null, raw.toString('hex') + extension);
    });
  }
});

const upload = multer({ storage });

const nftCollection = app => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/marketplace-create-nft-collection', cors(), upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'avatar', maxCount: 1 }
  ]), createNtfCollection);

  app.post('/marketplace-update-nft-collection', cors(), upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'avatar', maxCount: 1 }
  ]), updateNftCollection);
}

export default nftCollection;
