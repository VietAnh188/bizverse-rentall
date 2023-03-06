import { ZERO_WALLET, ADMIN_WALLET, TARGET_WALLETS } from '../../config';
import { Minting, NFT, Reservation } from '../../data/models';
import { handleOnNFTToAdminWallet } from './handleOnNFTToAdminWallet'
import { createAndWatchNFTTransaction } from '../NFTTransaction/createAndWatchNFTTransaction'
import { sendMailTransfer } from '../../helpers/send-mail/sendMailTransfer';
import updateCode from '../../core/QRCode/updateCode'

export const handleOnNFTIsTransferred = async ({ 
    blockTimestamp,
    blockNumber,
    from,
    id,
    to, 
    nft 
}) => {
    try {
        const { tokenId } = nft;
        const prevOwner = String(from).toLowerCase();
        const owner = String(to).toLowerCase();
        const zeroWallet = String(ZERO_WALLET).toLowerCase()

        const targetNFT = await NFT.findOne({
            where: {
                tokenId
            },
            raw: true
        })

        if (!targetNFT) {
            return;
        }

        // ----------------- START BLOCK: CREATE NFT TRANSACTION -----------------
        new Promise((resolve) => {
            let status = 'transferred';

            if (prevOwner === zeroWallet) {
                status = 'minted'
            }

            if (owner === zeroWallet) {
                status = 'burned'
            }

            createAndWatchNFTTransaction({
                transactionId: id,
                nftId: targetNFT.id,
                status,
                from,
                // price: 0,
                hash: id,
                // currency: '',
                // transactionCreatedAt: '',
                // transactionUpdatedAt: '',
                to,
                blockNumber,
                blockTimestamp,
                transferId: id,
                transactionStatus: 'success',
                transactionType: 'transfer'
            })

            resolve(true)
        })
        // ---------------------- END BLOCK ------------------------

        // ------------------ START BLOCK: BLOCK RESERVATION IF GUEST TRANSFER NFT TO ANOTHER GUEST ---------------
        if (!TARGET_WALLETS.includes(prevOwner) && !TARGET_WALLETS.includes(owner)) {
            if (owner !== targetNFT.owner) {
                Reservation.update({
                    reservationState: 'blocked'
                }, {
                    where: {
                        id: targetNFT.reservationId
                    }
                })
            } else {
                // TODO: may be change reservationState to approved, check later
            }
        }
        // ---------------------- END BLOCK -------------------------

        // Define update NFT data
        let updatingPayload;

        // Check if NFT is send to admin wallet
        if (owner === ADMIN_WALLET.toLowerCase()) {
            new Promise(resolve => {
                handleOnNFTToAdminWallet({ tokenId, nftId: targetNFT.id })

                resolve(true)
            })
        // Check if NFT is minted
        } else if (prevOwner === String(ZERO_WALLET).toLowerCase()) {

            updatingPayload = {
                isMinting: false
            }

            const minting = await Minting.findOne({
                where: {
                    nftId: targetNFT.id
                },
                raw: true
            })

            // Check in case guest signed metamask success but can not call api claim NFT 
            if (minting) {
                if (targetNFT.owner !== owner) {
                    updatingPayload = {
                        ...updatingPayload,
                        owner,
                        claimWallet: owner
                    }
                }

            // Check in case Host signed with metamask success but can not call api minted success
            } else if (targetNFT.owner === owner 
                && targetNFT.isDeleted 
                && targetNFT.nftState !== 'burned'
                && !targetNFT.deletedByReservationId) {
                updatingPayload = {
                    ...updatingPayload,
                    isDeleted: false
                }
            }

        // Check if NFT is transferred
        } else {
            if ((owner !== targetNFT.owner)) {
                updatingPayload = {
                    ...updatingPayload,
                    owner
                }
            }
        }

        if (updatingPayload) {
            NFT.update(updatingPayload, {
                where: {
                    id: targetNFT.id
                }
            })

            // Update QRCode
            updateCode({ nftId: targetNFT.id })
        }
        // send mail to notify host
        sendMailTransfer({ from, to, nft })
    } catch(error) {
        console.log(`--------------------- handleOnNFTIsTransferred error --------------------------: `, error)
    }
}