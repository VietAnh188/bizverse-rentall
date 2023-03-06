// Graphql
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import { NFTTransaction } from '../../../models';

// Types
import GetUserActivityType from '../../../types/NFTTransaction/GetUserActivityType';

const marketplace_getUserActivity = {
    type: GetUserActivityType,
    args: {
        activityId: { type: new NonNull(IntType) }
    },
    async resolve({ request }, {
        activityId
    }){
        try  {
            const activity = await NFTTransaction.findOne({
                where: {
                    id: activityId
                },
                raw: true
            })

            if (!activity) {
                return {
                    status: 400,
                    errorMessage: 'Activity not found'
                }
            }

            return {
                activity,
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

export default marketplace_getUserActivity;