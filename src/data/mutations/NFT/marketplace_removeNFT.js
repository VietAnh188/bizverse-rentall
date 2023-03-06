// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType
} from 'graphql';
import { NFT, User, UserProfile } from '../../models';

// Types
import NFTType from "../../types/NFTType";

import * as config from "../../../config"

const marketplace_removeNFT = {
    type: NFTType,
    args: {
        uri: { type: new NonNull(StringType) },
        wallet: { type: new NonNull(StringType) }
    },
    async resolve({ request }, {
        uri,
        wallet
    }){
        try {
            const nft = await NFT.findOne({
                where: { 
                    uri
                },
                raw: true
            })

            if (!nft) {
                return {
                    status: 400,
                    errorMessage: "NFT is not exist"
                }
            }

            if (nft?.owner?.toString()?.toLowerCase() !== wallet.toString().toLowerCase()) {
                console.log(typeof nft.owner,"owner of the nft");
                console.log(wallet,"wallet address")
                return {
                    status: 400,
                    errorMessage: "You are not the owner of the NFT"
                }
            }

            console.log(nft.isSelling)

            if (Number(nft?.isSelling) === 0){
                return {
                    status: 400,
                    errorMessage: "This NFT is not available on marketplace"
                }
            }

            await NFT.update({
                isSelling: false,
            },{
               where: {
                    owner: wallet,
                    uri
               }
            })

            const nftUpdated =  await NFT.findOne({
                where: { 
                    uri
                },
                raw: true
            }) 

            return {
                status: 200,
                results: nftUpdated
            }

        } catch (error) {
            console.log(error)
            return {
                status: 400,
                errorMessage: 'Something went wrong' + error
            }
        }   
    }
}

export default marketplace_removeNFT