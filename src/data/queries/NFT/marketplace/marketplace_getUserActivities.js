// Graphql
import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType
} from 'graphql';
import { User, NFTTransaction, UserProfile } from '../../../models';

// Types
import GetUserActivitiesType from '../../../types/NFTTransaction/GetUserActivitiesType';

const marketplace_getUserActivities = {
  type: GetUserActivitiesType,
  args: {
    page: { type: new NonNull(IntType) },
    limit: { type: IntType },
    orderBy: { type: StringType },
    orderDirection: { type: StringType }
  },
  async resolve({ request }, {
    page,
    limit = 10,
    orderBy = 'createdAt',
    orderDirection = 'DESC'
  }) {
    try {

      // authentication request
      if (!request.user) {
        return {
          status: 400,
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

      // Define conditions
      let where = {
        $or: [
          {
            from: userWallet
          },
          {
            to: userWallet
          }
        ]
      }

      const results = await NFTTransaction.findAndCountAll({
        where,
        order: [[orderBy, orderDirection]],
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

export default marketplace_getUserActivities;
