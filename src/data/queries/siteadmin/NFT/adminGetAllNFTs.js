// Query Type
import GetNFTsType from '../../../types/GetNFTsType';

// Database models
import { NFT } from '../../../models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

const adminGetAllNFTs = {
  type: GetNFTsType,
  args: {
    page: { type: IntType },
    limit: { type: IntType },
    searchText: { type: StringType },
  },

  async resolve({ request }, { page, searchText, limit = 10 }) {

    if (request.user && request.user.admin == true) {
        let where = {
            isDeleted: false
        }

        if (searchText) {
            where = {
                ...where,
                $or: [
                    {
                        name: {
                            $like: `%${searchText}%`
                        }
                    },
                    {
                        city: {
                            $like: `%${searchText}%`
                        }
                    },
                    {
                        country: {
                            $like: `%${searchText}%`
                        }
                    }
                ]
            } 
        }

        const results = await NFT.findAndCountAll({
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
    } else {
      return {
        status: 400,
        errorMessage: 'You are not the admin'
      }
    }
  },
};

export default adminGetAllNFTs;