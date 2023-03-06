import moment from 'moment';

// Graphql
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { NFT, NFTCollectionDetail, User, UserProfile } from '../../../models';

// Types
import GetNFTsType from '../../../types/GetNFTsType';

const marketplace_getUserNFTs = {
    type: GetNFTsType,
    args: {
        page: { type: new NonNull(IntType) },
        limit: { type: new NonNull(IntType) },
        search: { type: StringType },
        checkIn: { type: StringType },
        checkOut: { type: StringType },
        order: { type: StringType },
        orderDirection: { type: StringType },
        guestNumber: { type: IntType },
        beds: { type: IntType },
        isExpired: { type: BooleanType },
        isSelling: { type: BooleanType },
        ignoreCollectionId: { type: IntType },
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
        beds,
        isExpired,
        isSelling,
        ignoreCollectionId
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

            // Search by name, city, country
            const searchText = search.trim();

            // Define conditions
            let where = {
                isDeleted: false,
                isOnMarketplace: true,
                owner: userWallet,
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

            if (isSelling !== undefined) { // isSelling can be false
                where.isSelling = isSelling
            }

            if (isExpired !== undefined) { // isExpired can be false
                // Define checkout condition if user get expired NFTs
                const checkOutCondition = isExpired ? '$lte' : '$gt'

                where.checkOut = {
                    [checkOutCondition]: moment().format('YYYY-MM-DD')
                }
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

            // Ignore NFT 
            let existingNFTIds = []

            if (ignoreCollectionId) {
                const existingData = await NFTCollectionDetail.findAll({
                    where: {
                        collectionId: ignoreCollectionId
                    },
                    raw: true
                }) 

                if (existingData?.length) {
                    existingNFTIds = existingData.map(item => item.nftId)

                    where = {
                        ...where,
                        id: {
                            $notIn: existingNFTIds
                        }
                    }
                }
            }

            const results = await NFT.findAndCountAll({
                where,
                order: [[order, orderDirection]],
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

export default marketplace_getUserNFTs;