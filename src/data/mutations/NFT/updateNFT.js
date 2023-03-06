// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { NFT, User, UserProfile } from '../../models';
import getLocaleMessage from "../../../helpers/message/getLocaleMessage";

// Types
import NFTType from "../../types/NFTType";

import * as config from "../../../config"

const updateNFT = {
    type: NFTType,
    args: {
        nftId: { type: new NonNull(IntType)},
        state: { type: StringType },
        uri: { type: StringType },
        isSelling: { type: BooleanType },
        isOnMarketplace: { type: BooleanType },
        isDeleted: { type: BooleanType },
        sellAt: { type: StringType }
    },
    async resolve({ request }, {
        nftId,
        state,
        uri,
        isDeleted,
        isSelling = undefined,
        isOnMarketplace = undefined,
        sellAt
    }){
      try {
        // authentication request
        if (!request.user) {
            return {
                status: 400 ,
                errorMessage: 'You are not loggedIn'
              };
        }

        // check userBanStatus
        const userData = await User.findOne({
            attributes: [
                'userBanStatus'
              ],
              where: { id: request.user.id },
              raw: true
        })
        if (userData &&  userData.userBanStatus === 1) {
            return {
                errorMessage: await getLocaleMessage({ locale: request.language, messageId: 'error.accountBlocked' }),
                status: 500
            }
        }

        // check wallet address
        const userProfile = await UserProfile.findOne({
            attributes: ['wallet'],
            where: {
                userId: request.user.id
            },
            raw: true
        })
        if (!userProfile || !userProfile.wallet || !userProfile.wallet.trim()) {
            return {
                status: 400,
                errorMessage: await getLocaleMessage({ locale: request.language, messageId: 'error.walletNotFound' })
            }
        }

        // check state nft valid or not
        if (!!state && !config.NFT_STATE.ALL.includes(state.toString().toLowerCase())) {
            return {
                status: 400,
                errorMessage: "Invalid nft state"
            }
        }

        // FIXME: Check nft is belongsTo host or not
        const updateData = {}

        if (state) {
            updateData.state = state;
        }

        if (uri) {
            updateData.uri = uri;
        }

        if (isSelling) {
            updateData.isSelling = isSelling;
        }

        if (isOnMarketplace) {
            updateData.isOnMarketplace = isOnMarketplace;
        }

        if (isDeleted) {
            updateData.isDeleted = isDeleted;
        }

        if (sellAt) {
            updateData.sellAt = new Date(sellAt);
        }

        await NFT.update(updateData, {
            where: {
                id: nftId
            }
        })

        const nftUpdated = await NFT.findOne({
            where: {
                id: nftId
            },
            raw: true
        })

        return {
            status: 200,
            results: nftUpdated
        }

      } catch (error) {
        return {
            status: 400,
            errorMessage: 'Something went wrong' + error
        }
    }
    }
}

export default updateNFT
