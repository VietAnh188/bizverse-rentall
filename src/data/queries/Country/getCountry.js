// Graphql
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

// Messages
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication'

// Models
import { Country } from '../../models';

// Types
import GetCountryType from '../../types/Country/GetCountryType';

const getCountry = {
    type: GetCountryType,
    args: {
        id: { type: new NonNull(IntType) },
    },
    async resolve({ request }, {
        id
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
            
            // Get country
            const country = await Country.findOne({
                where: {
                    id
                },
                raw: true
            })

            if (!country) {
                return {
                    status: 400,
                    errorMessage: "Country is not found"
                }
            }

            return {
                status: 200,
                results: country
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default getCountry;