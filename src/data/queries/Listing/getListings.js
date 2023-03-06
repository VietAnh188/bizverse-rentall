// GraphQL
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication'

// Models
import { Listing } from '../../models';

// Types
import { GetListingsType } from '../../types/ListingType';

const getListings = {
    type: GetListingsType,
    args: {
        page: { type: new NonNull(IntType) },
        limit: { type: IntType },
        search: { type: StringType },
        checkIn: { type: StringType },
        checkOut: { type: StringType }
    },
    async resolve({ request }, {
        page,
        limit = 12,
        search = '',
        checkIn,
        checkOut
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

            // Define conditions
            let where = {
                isPublished: true,
                userId
            }

            // Filter by name
            if (search.trim()) {
                where.title = {
                    $like: `%${search.trim()}%`
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

            const results = await Listing.findAndCountAll({
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

export default getListings;