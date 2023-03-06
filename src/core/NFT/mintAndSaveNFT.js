// Models
import { 
    NFT, 
    UserProfile, 
    ListPhotos, 
    Listing, 
    Reservation
} from '../../data/models';

// helpers
import { minNFT } from '../../helpers/NFT/minNFT';
import { AWS_SERVICE_URL, MAX_TOKEN_ID, url  } from '../../config';
import { getNFTsBookedDatesRange } from '../bookedDates';
import dateRange from '../../data/mutations/Payment/dateRange'
import { burnNFTs } from '../../helpers/NFT/burnNFTs';
import { createReservationByNFT } from '../../core/reservation/createReservationByNFT'
import { getHouseTypeRoomType } from '../../helpers/listing/getHouseTypeRoomType';
import createQRCode from '../../core/QRCode/createQRCode'

export const mintAndSaveNFT = async ({ 
    payload, 
    isMintByReservation
}) => {
    try {
        const { 
            hostId, 
            listId, 
            reservationId, 
            requestUser, 
            guestNumber, 
            checkIn, 
            checkOut 
        } = payload
        let isHostMinted = !isMintByReservation
        let newReservationId = reservationId;
        
        // Check for pay later
        let ignoreCreateNFT = false;
        let nftId;
        let targetNFT;

        // Check for case pay later
        if (isMintByReservation) {

            targetNFT = await NFT.findOne({
                where: {
                    reservationId,
                    isDeleted: false
                },
                raw: true
            })

            // Burn conflicting NFTs 
            const reservation = await Reservation.findOne({
                where: {
                    id: reservationId
                },
                raw: true
            })

            // Ignore create NFT for pay later
            if (targetNFT && reservation?.isPayLater) {
                ignoreCreateNFT = true;
                nftId = targetNFT.id
            }

            // Deleted conflicting booking dates NFTs
            const { listId, checkIn, checkOut } = reservation;
            const nftsBookedDatesRange = await getNFTsBookedDatesRange(listId);
            const bookingDateRange = dateRange(checkIn, checkOut);
            const conflictingTokenIds = nftsBookedDatesRange.reduce((result, item) => {
                const isDuplicating = bookingDateRange.some(bookingDate => item.dateRange.includes(bookingDate))

                if (isDuplicating) {
                    result.push(item.tokenId)
                }

                return result;
            }, [])

            if (conflictingTokenIds.length) {
                const isBurnSuccess = await burnNFTs(conflictingTokenIds)

                // Update db
                NFT.update({
                    isDeleted: true,
                    deletedByReservationId: reservationId
                }, {
                    where: {
                        tokenId: {
                            $in: conflictingTokenIds
                        }
                    }
                })

                if (!isBurnSuccess) {
                    return {
                        status: 400,
                        errorMessage: 'Burn Existing NFTs failed'
                    }
                }
            }
        }

        // Get listing detail
        const targetListing = await Listing.findOne({
            where: {
                id: listId
            },
            raw: true
        })

        const {
        title,
        country,
        city,
        beds,
        street
        } = targetListing;
        const address = `${street || ''} ${city || ''}`

        // detail link
        const detail = `${url}/rooms/${listId}`;

        // Get house type and room type
        const { houseType, roomType } = await getHouseTypeRoomType(listId)

        // Token ID
        const maxTokenId = await NFT.max("tokenId")
        let tokenId = Number(maxTokenId || 1);
        tokenId = tokenId >= Number(MAX_TOKEN_ID) ? tokenId + 1 : Number(MAX_TOKEN_ID) + 1;

        // if (targetNFT) {
        //     tokenId = targetNFT.tokenId
        // }

        // Thumbnail
        let photoName;
        const listingPhoto = await ListPhotos.findOne({
            attributes: ['name'],
            where: {
                listId,
                isCover: true
            },
            raw: true
        })

        if (listingPhoto) {
            photoName = listingPhoto.name
        } else {
            const firstListingPhoto = await ListPhotos.findOne({
                attributes: ['name'],
                where: {
                    listId
                },
                raw: true
            })

            photoName = firstListingPhoto.name
        }

        const thumbnail = `${AWS_SERVICE_URL}images/upload/x_large_${photoName}`

        // wallet
        const userProfile = await UserProfile.findOne({
            attributes: ['wallet'],
            where: {
                userId: hostId
            },
            raw: true
        })
        const recipient = userProfile.wallet ? userProfile.wallet.toLowerCase() : undefined;

        let canContinue = true;
        let mintNFTData = {}
        if (!isMintByReservation) {
            const newReservation = await createReservationByNFT({
                listId,
                hostId,
                guests: guestNumber,
                checkIn,
                checkOut
            })

            newReservationId = newReservation.id;

            const { data: mintedData, success: isMintSuccess } = await minNFT({
                data: {
                    ...payload,
                    recipient,
                    id: listId,
                    thumbnail,
                    issuerId: hostId,
                    tokenId,
                    houseType,
                    roomType,
                    detail,
                    country,
                    city,
                    name: title,
                    beds,
                    address
                },
                isMintWithAdmin: false
            })

            canContinue = isMintSuccess;
            mintNFTData = mintedData
        }

        if (canContinue) {
            if (!ignoreCreateNFT) {
                // Define NFT data
                const nftData = {
                    ...payload,
                    thumbnail,
                    tokenId,
                    originalOwner: recipient,
                    owner: recipient,
                    detail,
                    country,
                    city,
                    name: title,
                    beds,
                    address,
                    houseType,
                    roomType,
                    reservationId: newReservationId,
                    requestUser: null,
                    isDeleted: isHostMinted, // Will set to false after host signed with metamask
                    isHostMinted,
                    isMinting: true,
                    mintedAt: new Date()
                }
        
                if (isMintByReservation) {
                    nftData.owner = 'admin'
                    nftData.reservationId = reservationId
                    nftData.requestUser = requestUser
                    nftData.claimWallet = null
                    nftData.canBooking = false,
                    nftData.isMinting = false
                }

                const existingNFT = await NFT.findOne({
                    where: {
                        tokenId,
                        isDeleted: false
                    },
                    raw: true
                })

                if (existingNFT) {
                    nftId = existingNFT.id;
                } else {
                    // Create new NFT
                    const nft = await NFT.create({
                        ...nftData,
                        state: 'active'
                    }, {
                        raw: true
                    })

                    nftId = nft.id

                    // generate new qrCode
                    createQRCode({ nftId })
                }
            }
            
            // Integrate with metamask
            const { signedMessage, mintingNonce, delegatee, mut, uri } = mintNFTData;

            return {
                status: 200,
                results: {
                    mintData: {
                        signedMessage, 
                        mintingNonce, 
                        delegatee, 
                        recipient, 
                        mut, 
                        uri,
                        tokenId
                    },
                    nftId
                }
            }
        } else {
            return {
                status: 400,
                errorMessage: 'Mint NFT failed.'
            }
        }
    } catch(error) {
        console.log("------------------------- Mint and save error --------------------------", error)
        return {
            status: 400,
            errorMessage: 'Mint NFT failed.'
        }
    }
}