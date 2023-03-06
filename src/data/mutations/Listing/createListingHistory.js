// GrpahQL
import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
} from 'graphql';

// GraphQL Type
import EditListingType from '../../types/EditListingType';

// Sequelize models
import {
    ListingPermissionHistory
} from '../../models';

const createListingHistory = {

    type: EditListingType,

    args: {
        listId: { type: IntType },
        userId: { type: StringType },
        status: { type: StringType },
        reason: { type: StringType },
    },

    async resolve({ request, response }, {
        listId,
        userId,
        status,
        reason
    }) {


        if (request.user || request.user.admin) {
            const createHistory = await ListingPermissionHistory.create({
                listId,
                userId,
                status,
                reason
            })

            if (createHistory) {
                return {
                    status: "200"
                }
            } else {
                return {
                    status: "400"
                }
            }

        } else {
            return {
                status: "500",
            };
        }

    },
};

export default createListingHistory;

