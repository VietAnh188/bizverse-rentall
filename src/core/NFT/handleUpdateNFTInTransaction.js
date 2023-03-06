import { NFT } from '../../data/models';

export const handleUpdateNFTInTransaction = async (tokenId) => {
    NFT.update({
        inTransaction: false
    }, {
        where: {
            tokenId,
            inTransaction: true
        }
    })
}