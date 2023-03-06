// Graphql
import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ThreadItemsType from '../types/ThreadItemsType';

// Sequelize models
import { ThreadItems, Threads } from '../../data/models';

const readMessage = {

  type: ThreadItemsType,

  args: {
    threadId: { type: new NonNull(IntType) }
  },

  async resolve({ request, response }, {
    threadId
  }) {

    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;

      const existingUnreadMessage = await ThreadItems.findOne({
        where: {
          threadId,
          isRead: false
        },
        order: [['createdAt', 'DESC']]
      })

      let shouldUpdateThread = true;

      if(existingUnreadMessage?.sentBy === userId) {
        shouldUpdateThread = false;
      } 

      // Create a thread item
      await ThreadItems.update({
        isRead: true
      }, {
        where: {
          threadId,
          sentBy: {
            $ne: userId
          },
          isRead: false
        }
      }); 

    
      if (shouldUpdateThread) {
        await Threads.update({
          isRead: true,
          messageUpdatedDate: new Date()
        }, {
            where: {
              id: threadId,
            }
        });
      }

      return {
        status: 'updated'
      };
    } else {
      return {
        status: 'notLoggedIn',
      };
    }
  },
};

export default readMessage;
