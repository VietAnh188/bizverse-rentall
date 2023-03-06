// Graphql
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLList as List,
} from 'graphql';

// Models
import { NFT } from '../../models';

// Types
import GetTokenIdsByIDsType from "../../types/GetTokenIdsByIDsType";

// Helpers
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';

const getTokenIdsByIDs = {
    type: GetTokenIdsByIDsType,
    args: {
        nftIds: { type: new NonNull(new List(IntType))}
    },
    async resolve({ request }, {
        nftIds
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

            const results = await NFT.findAll({
                attributes: ["tokenId"],
                where: {
                    id: {
                        $in: nftIds
                    }
                },
                raw: true
            })

            const tokenIds = results.reduce((data, item) => {
                data.push(item.tokenId)

                return data;
            }, [])

            return {
                results: {
                    tokenIds
                },
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

export default getTokenIdsByIDs;