// GraphQL
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

// Models
import { NFT, UserProfile } from '../../models';

// Types
import GetNFTsType from '../../types/GetNFTsType';

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';

const getNFTs = {
    type: GetNFTsType,
    args: {
        type: { type: new NonNull(StringType) },
        page: { type: new NonNull(IntType) },
        limit: { type: IntType },
        search: { type: StringType },
        checkIn: { type: StringType },
        checkOut: { type: StringType },
        isSold: { type: BooleanType },
        isSelling: { type: BooleanType }
    },
    async resolve({ request }, {
        type,
        page,
        limit = 12,
        search = '',
        checkIn,
        checkOut,
        isSelling: isOnMarketplace = false,
        isSold = false
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

            // User id
            const userId = request.user.id;

            const userProfile = await UserProfile.findOne({
                attributes: ['wallet'],
                where: {
                    userId
                },
                raw: true
            })

            const wallet = String(userProfile?.wallet).toLowerCase();

            // Define conditions
            let where = {
                isDeleted: false,
                isOnMarketplace
            }

            // Search
            const searchText = search.trim();

            // Filter by checkIn
            if (checkIn) {
                where.checkIn = checkIn
            }

            // Filter by checkOut
            if (checkOut) {
                where.checkOut = checkOut;
            }

            // Filter by type
            if (type === 'host') {
                where = {
                    ...where,
                    requestUser: null,
                    owner: wallet,
                    originalOwner: wallet,
                    lastPrice: null, // NFT is not sold
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
            } else {
                where = {
                    ...where,
                    $or: [
                        // Host sold, then bought again
                        {
                            owner: wallet,
                            lastPrice: {
                                $not: null // NFT is sold
                            },
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

                        // Receive NFT from transfer, guest mint and  transfer
                        {
                            owner: wallet,
                            requestUser: {
                                $not: null
                            },
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

                        // Receive NFT from transfer, host mint and transfer
                        {
                            owner: wallet,
                            requestUser: null,
                            originalOwner: {
                                $not: wallet
                            },
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

                        // Guest booking
                        {
                            requestUser: request.user.id,
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
            }

            if (isOnMarketplace) {
                where = {
                    ...where,
                    owner: wallet
                }
            }

            if (isSold) {
                where = {
                    ...where,
                    owner: {
                        $not: wallet
                    },
                    isOnMarketplace: true,
                    lastPrice: {
                        $not: null
                    }
                }

                if (type === 'host') {
                    where = {
                        ...where,
                        originalOwner: wallet
                    }
                // Guest
                } else {
                    where = {
                        ...where,
                        claimWallet: wallet
                    }
                }
            }

            const results = await NFT.findAndCountAll({
                where,
                order: [['createdAt', 'DESC']],
                limit,
                offset: (page - 1) * limit,
                raw: true
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

export default getNFTs;