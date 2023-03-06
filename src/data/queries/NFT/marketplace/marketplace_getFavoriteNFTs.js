// Graphql
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import { MarketplaceWishList, NFT, User, UserProfile } from '../../../models';

// Types
import GetNFTsType from '../../../types/GetNFTsType';

const marketplace_getUserNFTs = {
    type: GetNFTsType,
    args: {
        page: { type: new NonNull(IntType) },
        limit: { type: IntType },
        search: { type: StringType },
        checkIn: { type: StringType },
        checkOut: { type: StringType },
        order: { type: StringType },
        orderDirection: { type: StringType },
        guestNumber: { type: IntType },
        beds: { type: IntType },
    },
    async resolve({ request }, {
        page,
        limit = 12,
        search = '',
        checkIn,
        checkOut,
        order = "updatedAt",
        orderDirection = 'asc',
        guestNumber,
        beds
    }){
        try  {
            // authentication request
            if (!request.user) {
                return {
                    status: 400 ,
                    errorMessage: 'You are not loggedIn'
                };
            }

            // User id
            const userId = request.user.id;

            // check userBanStatus
            const userData = await User.findOne({
                attributes: [
                    'userBanStatus'
                  ],
                  where: { id: userId },
                  raw: true
            })

            if (userData?.userBanStatus) {
                return {
                    errorMessage: 'Your account has blocked for some reason. Please contact our support team.',
                    status: 500
                }
            }

            const userProfile = await UserProfile.findOne({
                where: {
                    userId: request.user.id
                },
                raw: true
            })

            const userWallet = String(userProfile?.wallet).toLowerCase();
            const searchText = search.trim();

            // Define conditions
            let where = {
                isDeleted: false,
                $or: [
                    {
                        owner: {
                            $not: userWallet
                        },
                        isSelling: true,
                        $or: [
                            {
                                name: {
                                    $like: `%${searchText}%`
                                }
                            },
                            {
                                city: {
                                    $like: `%${searchText}%`
                                }
                            },
                            {
                                country: {
                                    $like: `%${searchText}%`
                                }
                            }
                        ]
                    },
                    {
                        owner: userWallet,
                        isOnMarketplace: true,
                        $or: [
                            {
                                name: {
                                    $like: `%${searchText}%`
                                }
                            },
                            {
                                city: {
                                    $like: `%${searchText}%`
                                }
                            },
                            {
                                country: {
                                    $like: `%${searchText}%`
                                }
                            }
                        ]
                    }
                ]
            }

            // Filter by checkIn
            if (checkIn) {
                where.checkIn = checkIn
            }

            // Filter by checkOut
            if (checkOut) {
                where.checkOut = checkOut;
            }

            // Filter guestNumber
            if (guestNumber) {
                where.guestNumber = guestNumber;
            }

            // Filter beds
            if (beds) {
                where.beds = beds;
            }

            const results = await NFT.findAndCountAll({
                where,
                order: [[order, orderDirection]],
                limit,
                offset: (page - 1) * limit,
                raw: true,
                include: [{
                    model: MarketplaceWishList, as: 'marketplaceWishList', required: true,
                    attributes: []
                }],
            })

            return {
                results,
                status: 200
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default marketplace_getUserNFTs;