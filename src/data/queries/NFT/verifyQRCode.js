// Graphql
import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';

// Models
import { Listing, NFT, QRCode, Reservation, User, UserProfile } from '../../models';

// Types
import VerifyQRCodeType from "../../types/VerifyQRCodeType";

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';
import getLocaleMessage from '../../../helpers/message/getLocaleMessage'
import { getUserInfoByUniqueKey } from '../../../helpers/user/getUserInfoByUniqueKey'
const verifyQRCode = {
    type: VerifyQRCodeType,
    args: {
        code: { type: new NonNull(StringType) }
    },
    async resolve({ request }, {
        code
    }){
        try  {
            // Check user authentication
            const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

            if (userStatus !== 200) {
                return {
                    status: userStatus,
                    errorMessage: userErrorMessage
                }
            }

            const qrCode = await QRCode.findOne({
                where: {
                    code,
                    isAvailable: true
                },
                raw: true
            })

            if (!qrCode) {
                return {
                    status: 400,
                    errorMessage: await getLocaleMessage({ locale: request.language, messageId: 'error.QRCodeNotFound' })
                }
            }


            // reject if the NFT is selling on the marketplace
            let nft = await NFT.findOne({
                where: {
                    id: qrCode.nftId,
                }, 
                raw: true
            });
             // get user generate QR code
            let userProfile;
            if(qrCode.owner && qrCode.owner !== 'admin'){
                userProfile = await getUserInfoByUniqueKey({ wallet: qrCode.owner });
            }else{
                userProfile = await getUserInfoByUniqueKey({ userId: nft.requestUser});
            }

            // check expired date of QRCode by nft checkout date
            if (new Date(nft.checkOut) - new Date() < 0) {
                // update available to false when it still available
                if (qrCode.isAvailable) {
                    await QRCode.update({
                        isAvailable: false
                    }, {
                        where: {
                            id: qrCode.id
                        }
                    })
                }
                return {
                    status: 200,
                    results: {
                        isValid: false,
                        message: await getLocaleMessage({ locale: request.language, messageId: 'error.QRCodeExpired' })
                    }
                }
            }

            if (userProfile?.wallet?.trim()) {
                // check owner of nft
                if (userProfile.wallet.toString().toLowerCase() === nft.owner.toString().toLowerCase()) {
                    let listing = await Listing.findOne({
                        where: {
                            id: nft.listId
                        }
                    })

                    return {
                        status: 200,
                        results: {
                            isValid: true,
                            message: "Successfully check in",
                            nft,
                            listing
                        }
                    }
                } else {
                    return {
                        status: 400,
                        errorMessage: await getLocaleMessage({ locale: request.language, messageId: 'error.noPermission' })
                    }
                }

            } else {
                if (!nft.reservationId) {
                    return {
                        status: 200,
                        errorMessage: "QR Code is not valid"
                    }
                }

                let reservation = await Reservation.findOne({
                    where: {
                        id: nft.reservationId
                    },
                    raw: true
                })

                return {
                    status: 200,
                    results: {
                        isValid: true,
                        reservation
                    }
                }
            }
            
        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default verifyQRCode;