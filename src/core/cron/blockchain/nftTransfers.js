// import models
import { BlockNumber, NFT, NFTTransaction } from '../../../data/models';

import { request, gql } from 'graphql-request';
import * as config from '../../../config';
import { handleOnNFTIsTransferred } from '../../NFT/handleOnNFTIsTransferred';
import { handleUpdateNFTInTransaction } from '../../NFT/handleUpdateNFTInTransaction';

var CronJob = require('cron').CronJob;

const nftTransfers = (app) => {
  new CronJob(
    '*/3 * * * * *', // Run every 3s
    async function() {
      try {
        console.log(
          '================================================================================================================='
        );
        console.log('HOLY MOLY CHECK NFT TRANSFERS CRON STARTED');

        // console.log('call update cron');
        const currentBlock = await BlockNumber.findOne({
          where: {
            type: 'transfer'
          },
          raw: true,
          order: [['id', 'DESC']]
        });

        let queryFilter = '';
        if (!currentBlock) {
          queryFilter = ` first: 1
            orderDirection: desc
            orderBy: blockNumber`;
        } else {
          queryFilter = ` first: ${config.NFT_PER_CRON}
            orderDirection: asc
            orderBy: blockNumber
            where: {blockNumber_gte: "${currentBlock.blockNumber}"}`;
        }

        const query = gql`
            query MyQuery {
                nfttransfers(
                    ${queryFilter}
                ) {
                    blockTimestamp
                    blockNumber
                    from
                    id
                    to
                    nft {
                        createdAt
                        id
                        tokenId
                        tokenURI
                        owner
                        updatedAt
                        updatedAtBlock
                    }
                }
            }
        
        `;

        let nftBlocks;
        nftBlocks = await request(config.NFT_API_GRAPHQL, query).then(
          (data) => {
            return data.nfttransfers;
          }
        );

        if (nftBlocks?.length) {
          const maxId = await BlockNumber.max("id", {
            where: {
              type: 'transfer'
            },
          }) || 0
          const latestRow = await BlockNumber.findOne({
            where: {
              id: maxId
            },
            raw: true
          });

          if (Number(latestRow?.typeId) !== Number(nftBlocks[nftBlocks.length - 1]?.id)) {
            // Update owner of NFTs
            for (let index = 0; index < nftBlocks.length; index++) {
              const { to, id, from, nft: { tokenId } } = nftBlocks[index]

              const existingTransaction = await NFTTransaction.findOne({
                where: {
                  hash: id
                },
                raw: true
              })

              if (String(to).toLowerCase() !== config.MARKETPLACE_WALLET 
                && String(from).toLowerCase() !== config.MARKETPLACE_WALLET && !existingTransaction) {
                // Check if nft is not existing
                const nft = await NFT.findOne({
                  where: {
                    tokenId
                  },
                  raw: true
                });

                if (!nft) {
                  continue;
                }

                // Update NFT inTransaction to false
                handleUpdateNFTInTransaction(tokenId)

                // Handle on NFT is transferred
                handleOnNFTIsTransferred(nftBlocks[index]);
              }
            }

            // save last block number
            await BlockNumber.create({
              blockNumber: Number(nftBlocks[nftBlocks.length - 1]?.blockNumber),
              type: 'transfer',
              typeId: nftBlocks[nftBlocks.length - 1]?.id
            });
          }
        }
      } catch (error) {
        console.log("----------------------------- HOLY MOLY CHECK NFT TRANSFERS CRON ERROR ---------------", error)
      }

      console.log('HOLY MOLY CHECK NFT TRANSFERS CRON COMPLETED');
      console.log(
        '================================================================================================================='
      );
    },
    null,
    true,
    'Asia/Ho_Chi_Minh'
  );
};

export default nftTransfers;