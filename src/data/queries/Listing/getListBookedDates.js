// GraphQL
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

import BookedDatesType from '../../types/BookedDatesType';
import { getBookedDates } from '../../../core/bookedDates';

const getListBookedDates = {

    type: BookedDatesType,

    args: {
        listId: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { listId }) {
        try {
            const bookedDates = await getBookedDates({ listId, userId: request?.user?.id });
    
            return {
                bookedDates,
                status: 200
            }
        } catch(error) {
            return {
                status: 500,
                errorMessage: error.message
            }
        }
        
    }
};

export default getListBookedDates;
