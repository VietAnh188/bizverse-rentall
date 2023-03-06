import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType
} from 'graphql';
import { 
    NFT
} from '../../models';

const NFTTransactionType = new ObjectType({
    name: 'NFTTransactionType',
    fields:  {
        id: { type: IntType },
        transactionId: { type: StringType },
        nftId: { type: IntType },
        status: { type: StringType },
        from: { type: StringType },
        price: { type: FloatType },
        hash: { type: StringType },
        currency: { type: StringType },
        transactionCreatedAt: { type: StringType },
        transactionUpdatedAt: { type: StringType },
        updatedAt: { type: StringType },
        createdAt: { type: StringType },
        transferId: { type: StringType },
        to: { type: StringType },
        offerId: { type: StringType },
        transactionStatus: { type: StringType }, 
        transactionType: { type: StringType }, 
        nftName: {
            type: StringType,
            async resolve(transaction, { }, request) {
                const { nftId } = transaction;
                const targetNFT = await NFT.findOne({
                    where: {
                        id: nftId
                    },
                    raw: true
                })

                return targetNFT.name;
            }
        },
        nftCheckIn: {
            type: StringType,
            async resolve(transaction, { }, request) {
                const { nftId } = transaction;
                const targetNFT = await NFT.findOne({
                    where: {
                        id: nftId
                    },
                    raw: true
                })

                return targetNFT.checkIn;
            }
        },
        nftCheckOut: {
            type: StringType,
            async resolve(transaction, { }, request) {
                const { nftId } = transaction;
                const targetNFT = await NFT.findOne({
                    where: {
                        id: nftId
                    },
                    raw: true
                })

                return targetNFT.checkOut;
            }
        },
        tokenId: {
            type: IntType,
            async resolve(transaction, { }, request) {
                const { nftId } = transaction;
                const targetNFT = await NFT.findOne({
                    where: {
                        id: nftId
                    },
                    raw: true
                })

                return targetNFT.tokenId;
            }
        }
    }
})

export default NFTTransactionType
