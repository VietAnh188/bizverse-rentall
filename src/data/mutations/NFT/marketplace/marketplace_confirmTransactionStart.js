import moment from 'moment';

// GraphQL
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import { NFT } from '../../../models';

// Type
import ResponseType from '../../../types/ResponseType';

const marketplace_confirmTransactionStart = {
    type: ResponseType,
    args: {
        nftId: { type: new NonNull(IntType) }
    },
    async resolve({ request }, {
        nftId
    }){
        try {
            // authentication request
            if (!request.user) {
                return {
                    status: 400 ,
                    errorMessage: 'You are not loggedIn'
                };
            }

            // Update NFT is in transaction
            await NFT.update({
                inTransaction: true,
                inTransactionAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            },{
                where: {
                    id: nftId
                }
            })

            return {
                status: 200
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong ' + error.message
            }
        }   
    }
}

export default marketplace_confirmTransactionStart