// Graphql
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { MarketplaceWishList, UserProfile, User } from '../../models';

// Types
import ToggleFavoriteNFTType from "../../types/MarketplaceWishList/ToggleFavoriteNFTType";

const toggleFavoriteNFT = {
    type: ToggleFavoriteNFTType,
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

        // User id
        const userId = request.user.id;

        // check userBanStatus
        const userData = await User.findOne({
            attributes: [
                'userBanStatus'
              ],
              where: { id: userId },
              raw: true
        })

        if (userData?.userBanStatus) {
            return {
                errorMessage: 'Your account has blocked for some reason. Please contact our support team.',
                status: 500
            }
        }

        const userProfile = await UserProfile.findOne({
            where: {
                userId: request.user.id
            },
            raw: true
        })

        const wallet = String(userProfile?.wallet).toLowerCase();

        if (!wallet) {
            return {
                status: 400,
                errorMessage: 'You did not connect your wallet to this account'
            }
        }

        const existingNFT = await MarketplaceWishList.findOne({
            where: {
                nftId,
                wallet
            },
            raw: true
        })

        let targetNFT;

        if (existingNFT) {
            await MarketplaceWishList.destroy({
                where: {
                    id: existingNFT.id
                }
            })
        } else {
            const favoriteNFTsCount = await MarketplaceWishList.count({ 
                where: { 
                    wallet 
                }
            });

            if (favoriteNFTsCount >= 30) {
                return {
                    status: 400,
                    errorMessage: 'You have too much favorite NFTs'
                }
            }

            targetNFT = await MarketplaceWishList.create({
                wallet,
                nftId
            })
        }

        return {
            status: 200,
            action: targetNFT ? 'add' : 'remove',
            nft: targetNFT
        }

      } catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong: ' + error.message
            }
      }
    }
}

export default toggleFavoriteNFT