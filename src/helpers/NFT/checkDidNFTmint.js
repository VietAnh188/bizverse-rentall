import { gql, request } from 'graphql-request';
import { NFT_API_GRAPHQL } from '../../config';

export const checkDidNFTMint = async (tokenId) => {
    const query = gql`
        query {
            nft(id: ${tokenId}) {
                tokenId
                owner
            }
        }
    `

  try {
    const { nft } = await request(NFT_API_GRAPHQL, query)

    return {
      data: nft,
      success: !!nft
    }
  } catch (error) {
    console.log("-------------- Error Check NFT minted -----------------------------------------", error)

    return {
      success: false
    };
  }
}