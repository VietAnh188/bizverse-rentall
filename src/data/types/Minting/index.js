import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { NFT } from '../../models'

const MintingType = new ObjectType({
    name: 'MintingType',
    fields:  {
        id: { type: IntType },
        nftId: { type: IntType },
        uri: { type: StringType },
        signedMessage: { type: StringType },
        mintingNonce: { type: IntType },
        delegatee: { type: StringType },
        recipient: { type: StringType },
        mut: { type: BooleanType },
        tokenId: {
            type: IntType,
            async resolve(minting, { }, request) {
                const { nftId } = minting;
                const targetNFT = await NFT.findOne({
                    where: {
                        id: nftId
                    },
                    raw: true
                })

                return targetNFT.tokenId;
            }
        },
    }
})

export default MintingType