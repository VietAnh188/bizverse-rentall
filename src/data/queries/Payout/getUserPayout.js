import PayoutType from '../../types/PayoutType';
import { Payout } from '../../models';

const getUserPayout = {
    type: PayoutType,

    async resolve({ request }) {
        if (request.user && !request.user.admin) {
            return Payout.findOne({
                where: {
                    userId: request.user.id
                }
            })
        } else {
            return {
                status: 400,
            };
        }
    }
};

export default getUserPayout;