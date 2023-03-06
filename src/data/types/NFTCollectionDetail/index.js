import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType
} from 'graphql';
import { 
    NFT,
    NFTCollection
} from '../../models';

import { NFT as NFTType } from '../NFTType';
import NFTCollectionType from '../NFTCollection'

const NFTCollectionDetailType = new ObjectType({
    name: 'NFTCollectionDetailType',
    fields:  {
        id: { type: IntType },
        collectionId: { type: IntType },
        nftId: { type: IntType },
        nft: {
            type: NFTType,
            async resolve(nftCollectionDetail) {
                const { nftId } = nftCollectionDetail;
                const targetNFT = await NFT.findOne({
                    where: {
                        id: nftId
                    },
                    raw: true
                })

                return targetNFT;
            }
        },
        collection: {
            type: NFTCollectionType,
            async resolve(nftCollectionDetail) {
                const { collectionId } = nftCollectionDetail;
                const collection = await NFTCollection.findOne({
                    where: {
                        id: collectionId
                    },
                    raw: true
                })

                return collection;
            }
        }
    }
})

export default NFTCollectionDetailType