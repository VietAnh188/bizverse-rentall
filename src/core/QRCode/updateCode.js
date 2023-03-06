import uuid from 'uuid';
import { QRCode } from '../../data/models';

const updateQRCode = async ({ nftId }) => {
    const code = uuid().toString().replace(/-/g, '');

    await QRCode.update({
        code
    }, {
        where: {
            nftId
        }
    })
}

export default updateQRCode;