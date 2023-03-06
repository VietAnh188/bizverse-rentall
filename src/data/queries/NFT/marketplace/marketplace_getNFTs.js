// Graphql
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { NFT } from '../../../models';
import moment from 'moment';

// Types
import GetNFTsType from '../../../types/GetNFTsType';

const marketplace_getNFTs = {
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
        listId: { type: IntType },
        isTrending: { type: BooleanType }
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
        listId,
        isTrending
    }){
        try  {
            // Search by name, city, country
            const searchText = search.trim();

            // Define conditions
            let where = {
                isDeleted: false,
                isOnMarketplace: true,
                isSelling: true,
                checkOut: {
                    $gt: moment().format('YYYY-MM-DD')
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

            // File by list
            if (listId) {
                where.listId = listId
            }

            if (isTrending) {
                where.isTrending = isTrending
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

export default marketplace_getNFTs;