import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

import getLocaleMessage from '../../../helpers/message/getLocaleMessage';

import { NFT } from '../../models';

import NFTType from "../../types/NFTType";

const toggleTrendingNFT = {
    type: NFTType,
    args: {
        nftId: { type: new NonNull(IntType) },
        isTrending: { type: BooleanType }
    },
    async resolve({ request }, { nftId, isTrending }) {
        try {
            const nft = await NFT.findById(nftId);
            
            if (!nft) {
                return {
                    status: 404,
                    errorMessage: await getLocaleMessage({ locale: request.language, messageId: 'error.recordNotFound' })
                }
            }

            await NFT.update({
                isTrending
            }, {
                where: {
                    id: nftId
                }
            });

            const nftUpdated = await NFT.findOne({
                where: {
                    id: nftId
                },
                raw: true
            });

            return {
                status: 200,
                results: nftUpdated
            }
        } catch (error) {
            console.log(error);
            return {
                status: 400,
                errorMessage: error.message
            }
        }
    }
}

export default toggleTrendingNFT;
