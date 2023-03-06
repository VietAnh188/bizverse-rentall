import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
    GraphQLList as List
} from 'graphql';
import { getQRCode } from '../../helpers/QRCode/getQRCode';
import { 
    Listing, 
    QRCode, 
    UserProfile,
    MarketplaceWishList,
    NFTCollectionDetail
} from '../models';
import moment from 'moment';

export const NFT = new ObjectType({
    name: 'NFT',
    fields:  {
        id: { type: IntType },
        listId: { type: IntType },
        hostId: {type: StringType },
        state: { type: StringType },
        address: { type: StringType },
        checkIn: { type: StringType },
        checkOut: { type: StringType },
        thumbnail: { type: StringType },
        roomType: { type: StringType },
        name: { type: StringType },
        country: { type: StringType },
        guestNumber: { type: IntType },
        beds: { type: IntType },
        detail: { type: StringType },
        city: { type: StringType },
        houseType:  { type: StringType },
        owner:  { type: StringType },
        nftState:  { type: StringType },
        isSelling:  { type: BooleanType },
        isTrending: { type: BooleanType },
        isMinting: { type: BooleanType },
        isOnMarketplace: { type: BooleanType },
        canBooking:  { type: BooleanType },
        originalOwner:  { type: StringType },
        isSold: { 
            type: BooleanType,
            async resolve(nft, {}, request) {
                const userProfile = await UserProfile.findOne({
                    where: {
                        userId: request?.user?.id
                    },
                    raw: true
                })

                if (!userProfile) {
                    return false;
                }
                
                const wallet = String(userProfile.wallet).toLowerCase();
                const { lastPrice, originalOwner, claimWallet, owner } = nft;

                return (wallet === originalOwner || wallet === claimWallet)
                    && lastPrice !== null && lastPrice !== undefined // lastPrice can be 0
                    && wallet !== owner
            }
        },
        tokenId: { type: IntType },
        offerId: { type: IntType },
        reservationId: { type: IntType },
        requestUser:  { type: StringType },
        claimWallet:  { type: StringType },
        mintingPrice: { type: StringType },
        currentPrice: { type: StringType },
        lastPrice: { type: StringType },
        inTransaction: { type: BooleanType },
        currency: { type: StringType },
        isMappingReservation: {
            type: BooleanType,
            resolve(nft) {
                const nftOwner = String(nft.owner).toLowerCase();

                return nftOwner === 'admin' || nftOwner === String(nft.claimWallet).toLowerCase();
            }
        },
        description: {
            type: StringType,
            async resolve(nft) {
                const listing = await Listing.findOne({
                    where: {
                        id: nft.listId
                    },
                    raw: true,
                })

                return listing?.description || '';
            }
        },
        province: {
            type: StringType,
            async resolve(nft) {
                const listing = await Listing.findOne({
                    where: {
                        id: nft.listId
                    },
                    raw: true,
                })

                return listing?.state || '';
            }
        },
        qrCode: {
            type: StringType,
            async resolve(nft, { }, request){
                const { owner, requestUser } = nft;
                const userProfile = await UserProfile.findOne({
                    where: {
                        userId: request?.user?.id
                    },
                    raw: true
                })

                if (owner === 'admin') {
                    if (request?.user.id !== requestUser) {
                        return '';
                    }
                } else if (owner !== String(userProfile?.wallet).toLowerCase()) {
                    return ''
                }

                const qrCode = await QRCode.findOne({
                    where: {
                        nftId: nft.id,
                        isAvailable: true
                    },
                    raw: true
                });
                
                if (!qrCode) {
                    return '';
                }

                return getQRCode(qrCode.code)
            }
        },
        isYourNFT: {
            type: BooleanType,
            async resolve(nft, { }, request) {
                const userProfile = await UserProfile.findOne({
                    where: {
                        userId: request?.user?.id
                    },
                    raw: true
                })

                if (userProfile) {
                    return String(userProfile.wallet).toLowerCase() === String(nft.originalOwner).toLowerCase()
                }

                return false
            }
        },
        isExpired: {
            type: BooleanType,
            async resolve(nft, { }, request) {
                const { checkOut } = nft;

                return moment(checkOut).isBefore()
            }
        },
        isHostMinted: {
            type: BooleanType
        },
        isYourFavorite: {
            type: BooleanType,
            async resolve(nft, { }, { user }) {
                if (!user) {
                    return false;
                }

                const userProfile = await UserProfile.findOne({
                    where: {
                        userId: user.id
                    },
                    raw: true
                })

                if (!userProfile) {
                    return false
                }

                const existingNFT = await MarketplaceWishList.findOne({
                    where: {
                        nftId: nft.id,
                        wallet: userProfile.wallet
                    },
                    raw: true
                })

                return !!existingNFT;
            }
        },
        isClaimed: {
            type: BooleanType,
            async resolve(nft, { }, request) {
                const { isHostMinted, claimWallet, lastPrice } = nft;
                const isBought = lastPrice !== null && lastPrice !== undefined // Last price can be 0

                if (isHostMinted || !!claimWallet || isBought) {
                    return true;
                }

                return false;
            }
        },
        isBought: {
            type: BooleanType,
            async resolve(nft, { }, request) {
                const { lastPrice } = nft;

                return lastPrice !== null && lastPrice !== undefined; // Last price can be 0
            }
        },
        collectionIds: {
            type: new List(IntType),
            async resolve(nft, { }, request) {
                const { id } = nft;
                const existingCollections = await NFTCollectionDetail.findAll({
                    attributes: ["id", "collectionId"],
                    where: {
                        nftId: id
                    },
                    raw: true
                })

                if (existingCollections) {
                    return existingCollections.map(item => item.collectionId)
                }

                return [];
            }
        },
        sellAt: { type: StringType }
    }
})

const NFTType = new ObjectType({
    name: 'NFTType',
    fields: {
        results: { 
            type: NFT
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        maxTokenId: {
            type: IntType
        }

    }
});

export const CheckListingHasNFTResponseType = new ObjectType({
    name: 'CheckListingHasNFTResponseType',
    fields: {
        hasNFT: {
            type: BooleanType
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        }

    }
});

export default NFTType;
