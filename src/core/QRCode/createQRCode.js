import uuid from 'uuid';
import { QRCode, NFT } from '../../data/models';

const createQRCode = async ({ nftId }) => {
    const code = uuid().toString().replace(/-/g, '');

    const nft = await NFT.findOne({
        where: {
            id: nftId
        },
        raw: true
    })

    if (!nft) {
        return;
    }

    // Check if existing QRCode
    const qrCode = await QRCode.findOne({
        where: {
            nftId,
            isAvailable: true
        },
        raw: true
    })

    if (qrCode) {
        return;
    }

    // Create new QRCode
    const { owner, hostId } = nft;
           
    await QRCode.create({
        code, 
        nftId, 
        owner: owner,
        userId: hostId,
        isAvailable: true
    })
}

export default createQRCode;