// import models
import { BlockNumber, NFT, NFTTransaction } from '../../data/models';
import { request, gql } from 'graphql-request';
import * as config from '../../config';

var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(25);

// Get offers
const getOffers = async () => {
  const currentBlock = await BlockNumber.findOne({
    where: {
      type: 'offers'
    },
    raw: true,
    order: [['id', 'DESC']]
  });

  let queryFilter = '';
  if (!currentBlock) {
    queryFilter = `first: 1
      orderDirection: desc
      orderBy: blockNumber`;
  } else {
    queryFilter = `first: ${config.NFT_PER_CRON}
      orderDirection: asc
      orderBy: blockNumber
      where: {blockNumber_gt: "${currentBlock.blockNumber}"}`;
  }

  const query = gql`
  query QueryOffers {
      offers(
        ${queryFilter}
      ) {
          updatedAt
          status
          seller
          price
          hash
          currency
          createdAt
          buyer
          blockNumber
          blockTimestamp
          id
          nft {
              id
              owner
              tokenId
              tokenURI
              updatedAt
              updatedAtBlock
          }
      }
  }
  `;

  return await request(config.NFT_API_GRAPHQL, query).then(
    (data) => data.offers
  );
}

const updateNFTs = (app) => {
  new CronJob(
    '*/30 * * * * *', // Run every 30s
    async function() {
      try {
        console.log(
          '================================================================================================================='
        );
        console.log('HOLY MOLY CHECK NFT OFFERS CRON STARTED');

        let nftBlocks = await getOffers();

        if (nftBlocks?.length) {
          // Update block number
          BlockNumber.create({
            blockNumber: Number(nftBlocks[nftBlocks.length - 1]?.blockNumber),
            type: 'offers'
          });

          //   check uri for each new nfts offers
          for (let index = 0; index < nftBlocks.length; index++) {
            const {
              nft: { tokenId },
              blockNumber,
              status,
              price,
              currency,
              id,
              seller,
              hash,
              createdAt,
              buyer,
              blockTimestamp
            } = nftBlocks[index];
            const nft = await NFT.findOne({
              where: {
                tokenId
              },
              raw: true
            });

            if (!nft) {
              continue;
            }

            let nftDataUpdates = {};
            const offerStatus = status.toLocaleLowerCase();
            
            switch (offerStatus) {
              case 'created':
              case 'replaced':
                nftDataUpdates = {
                  currentPrice: price,
                  currency: currency,
                  offerId: id,
                  isSelling: true
                };  

                break;

              case 'closed':
                nftDataUpdates = {
                  owner: buyer,
                  lastPrice: price,
                  isSelling: false
                }

                break;

              case 'cancelled':
                nftDataUpdates = {
                  currentPrice: null,
                  isSelling: false,
                  currency: null,
                  offerId: null
                }

                break;
            
              default:
                break;
            }

            await NFT.update(nftDataUpdates, {
              where: {
                tokenId
              }
            });

            // check exist nft and create new NFT transaction
            await NFTTransaction.create({
              transactionId: id,
              nftId: nft.id,
              status,
              seller,
              price,
              hash,
              currency,
              transactionCreatedAt: createdAt,
              buyer,
              blockNumber,
              blockTimestamp
            });
          }
        }
      } catch (e) {
        console.log("err----------------------------------------", e)
        console.log(e);
      }

      console.log('HOLY MOLY CHECK NFT OFFERS CRON COMPLETED');
      console.log(
        '================================================================================================================='
      );
    },
    null,
    true,
    'Asia/Ho_Chi_Minh'
  );
};

export default updateNFTs;
