import { ethers } from "ethers";
import { USDT_DECIMAL } from '../../../constants/contract'

// import models
import { BlockNumber, NFT, NFTTransaction } from '../../../data/models';
import { request, gql } from 'graphql-request';
import * as config from '../../../config';
import { handleBlockReservationAfterSoldNFT } from '../../NFT/handleBlockReservationAfterSoldNFT'
import { handleUnlockReservationAfterCancelSellNFT } from '../../NFT/handleUnlockReservationAfterCancelSellNFT';
import { handleUpdateNFTInTransaction } from '../../NFT/handleUpdateNFTInTransaction';
import { handleOnNFTisSold } from '../../NFT/handleOnNFTIsSold';
import { createAndWatchNFTTransaction } from '../../NFTTransaction/createAndWatchNFTTransaction';
import updateCode from '../../QRCode/updateCode';

var CronJob = require('cron').CronJob;

// Get offers
const getOffers = async () => {
  const currentBlock = await BlockNumber.findOne({
    where: {
      type: 'offer'
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
      where: {blockNumber_gte: "${currentBlock.blockNumber}"}`;
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

const nftOffers = (app) => {
  new CronJob(
    '*/3 * * * * *', // Run every 3s
    async function() {
      try {
        console.log(
          '================================================================================================================='
        );
        console.log('HOLY MOLY CHECK NFT OFFERS CRON STARTED');

        let nftBlocks = await getOffers();

        if (nftBlocks?.length) {
          const maxId = await BlockNumber.max("id", {
            where: {
              type: 'offer'
            }
          }) || 0
          const latestRow = await BlockNumber.findOne({
            where: {
              id: maxId
            },
            raw: true
          });

          if (Number(latestRow?.typeId) !== Number(nftBlocks[nftBlocks.length - 1]?.id)) {
            // Update block number
            await BlockNumber.create({
              blockNumber: Number(nftBlocks[nftBlocks.length - 1]?.blockNumber),
              type: 'offer',
              typeId: nftBlocks[nftBlocks.length - 1]?.id
            });
          }

          // check uri for each new nfts offers
          for (let index = 0; index < nftBlocks.length; index++) {
            const {
              nft: { tokenId },
              blockNumber,
              status,
              price: offerPrice,
              currency,
              id,
              seller: currentSeller,
              hash,
              createdAt,
              updatedAt,
              buyer: currentBuyer,
              blockTimestamp
            } = nftBlocks[index];
            let buyer = currentBuyer ? String(currentBuyer).toLowerCase() : undefined;
            const seller = currentSeller ? String(currentSeller).toLowerCase() : undefined;

            const price = Number(ethers.utils.formatUnits(offerPrice, USDT_DECIMAL))

            // Check if offer is existing
            const existingOffer = await NFTTransaction.findOne({
              where: {
                offerId: id,
                transactionUpdatedAt: updatedAt
              },
              raw: true
            })

            if (existingOffer) {
              continue;
            }

            // Check if nft is not existing
            const nft = await NFT.findOne({
              where: {
                tokenId,
                isDeleted: false
              },
              raw: true
            });

            if (!nft) {
              continue;
            }

            let nftDataUpdates = {};
            const offerStatus = status.toLocaleLowerCase();

            // Update NFT inTransaction 
            new Promise((resolve) => {
              handleUpdateNFTInTransaction(tokenId)
              resolve(true)
            })

            switch (offerStatus) {
              case 'created':
              case 'replaced':
                nftDataUpdates = {
                  currentPrice: price,
                  currency: currency,
                  offerId: id,
                  isSelling: true,
                  sellAt: new Date()
                };

                new Promise(resolve => {
                  handleBlockReservationAfterSoldNFT({ tokenId, seller })
                  resolve(true)
                })

                break;

              case 'closed':
                nftDataUpdates = {
                  owner: buyer,
                  lastPrice: price,
                  isSelling: false,
                  offerId: null
                }

                new Promise(resolve => {
                  handleOnNFTisSold({ seller, buyer, price, currency, nft: {...nft, ...nftDataUpdates}})

                  // Update QRCode
                  updateCode({ nftId: nft.id })

                  resolve(true)
                })

                break;

              case 'cancelled':
                nftDataUpdates = {
                  currentPrice: null,
                  isSelling: false,
                  currency: null,
                  offerId: null
                }

                new Promise(resolve => {
                  handleUnlockReservationAfterCancelSellNFT({ tokenId, seller })

                  resolve(true)
                })

                break;

              default:
                break;
            }

            NFT.update(nftDataUpdates, {
              where: {
                id: nft.id
              }
            });

            const transactionData = {
              transactionId: id,
              nftId: nft.id,
              status: offerStatus,
              from: seller,
              price,
              hash,
              currency,
              transactionCreatedAt: createdAt,
              transactionUpdatedAt: updatedAt,
              to: buyer,
              blockNumber,
              blockTimestamp,
              offerId: id,
              transactionStatus: 'success',
              transactionType: 'offer'
            }

            // Create Transaction
            if (offerStatus === 'created') {
              new Promise(() => {
                setTimeout(async () => {
                  const existingChangePriceTransaction = await NFTTransaction.findOne({
                    where: {
                      transactionUpdatedAt: updatedAt,
                      nftId: nft.id,
                      status: 'replaced'
                    },
                    raw: true
                  })
  
                  if (!existingChangePriceTransaction) {
                    createAndWatchNFTTransaction(transactionData)
                  }
                }, 350)
              })
            } else {
              createAndWatchNFTTransaction(transactionData)
            }
          }
        }
      } catch (e) {
        console.log("HOLY MOLY CHECK NFT OFFERS CRON ERROR ----------------------------------------", e)
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

export default nftOffers;
