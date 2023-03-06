// Graphql
import {
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType
} from 'graphql';
import { Listing, ListPhotos, NFT } from '../../../models';

// Types
import GetListingByNFT from '../../../types/GetListingByNFT';

const marketplace_getListingByNFT = {
    type: GetListingByNFT,
    args: {
        id: { type: new NonNull(IntType) }
    },
    async resolve({ request }, {
       id
    }){
        try  {
            const nft =  await NFT.findOne({
                where: {
                    id
                },
                raw: true
            })

            if (!nft) {
                return {
                    status: 400,
                    errorMessage: "NFT is not exist"
                }
            }

           const listingData = await Listing.findOne({
            where: {
                id: nft.listId
            },
            raw: true
          });

          const listPhotos = await ListPhotos.findAll({
            where:{
                listId: nft.listId
          }, raw: true});   

           return {
            status: 200,
            results: {
                listing: listingData,
                nft,
                listPhotos
            }
           }
        } catch (error) {
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default marketplace_getListingByNFT;