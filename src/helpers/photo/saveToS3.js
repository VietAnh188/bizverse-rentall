import { profilePhotoUploadDirS3, AWS_SERVICE_URL } from '../../config';
import { s3UploadSingleFile } from '../../core/s3Service';
import sharp from 'sharp';
import uuid from 'uuid';

export const savePhotoToS3 = async ({ 
    photo, 
    photoType = 'primary',
    smallSize = { width: 100, height: 100 }, 
    mediumSize = { width: 255, height: 255 }, 
    largeSize = { width: 400, height: 400 },
    save = { small: false, medium: false, large: false },
    s3Dir = profilePhotoUploadDirS3
}) => {
    const { small, medium, large } = save
    let fullPath = '';

    try {
        let photoName = uuid().toString().replace(/-/g, '');
        const request = require('request').defaults({ encoding: null });
        let responseBody;

        if (photoType === 'primary') {
            responseBody = await new Promise(resolve => {
                request.get(photo, function (err, res, body) {
                    resolve(body)
                })
            })
        } else {
            responseBody = photo
        }

        // Save original photo size
        const generalData = await new Promise(resolve => {
            sharp(responseBody)
            .rotate()
            .toBuffer()
            .then(data => {
                resolve(data);
            })
        })
        const originalImagePath = s3Dir + photoName;
        fullPath = AWS_SERVICE_URL + originalImagePath

        await s3UploadSingleFile(originalImagePath, generalData);

        // Save small size
        if (small) {
            const dataSmall = await new Promise(resolve => {
                sharp(responseBody)
                .rotate()
                .resize(smallSize.width, smallSize.height)
                .toBuffer()
                .then(data => {
                    resolve(data);
                })
            })

            await s3UploadSingleFile(s3Dir + 'small_' + photoName, dataSmall);
        }

        // Save medium size
        if (medium) {
            const dataMedium = await new Promise(resolve => {
                sharp(responseBody)
                .rotate()
                .resize(mediumSize.width, mediumSize.height)
                .toBuffer()
                .then(data => {
                    resolve(data);
                })
            })

            await s3UploadSingleFile(s3Dir + 'medium_' + photoName, dataMedium);
        }

        // Save large size
        if (large) {
            const dataLarge = await new Promise(resolve => {
                sharp(responseBody)
                .rotate()
                .resize(largeSize.width, largeSize.height)
                .toBuffer()
                .then(data => {
                    resolve(data);
                })
            })

            await s3UploadSingleFile(s3Dir + 'large_' + photoName, dataLarge); 
        }

        return {
            status: 200,
            photoName,
            fullPath
        }
    } catch(error) {
        console.log('-------------------------------- Upload photo error------------------------', error);
        
        return {
            status: 400
        }
    }
}
