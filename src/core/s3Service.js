const uuid = require('uuid').v4;
import * as AWS from 'aws-sdk';

async function s3UploadMultipleFile(files) {
  const s3 = new AWS.S3();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${username}/${uuid()}-${file.originalname}`,
      Body: file.buffer
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
}

async function s3UploadSingleFile(filename, buffer) {
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: buffer
  }
  return s3.upload(params).promise()
}

async function deleteFile(fileName) {
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName
  }
  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);
  })
}

export {
  s3UploadSingleFile,
  s3UploadMultipleFile,
  deleteFile
}
