import { NFT } from '../../data/models'

export const handleOnNFTToAdminWallet = async ({ nftId }) => {
    NFT.update({
        // isDeleted: true,
        owner: 'admin'
    }, {
        where: {
            id: nftId
        }
    })
}