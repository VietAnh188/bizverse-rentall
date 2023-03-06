import { NFT } from '../../../data/models';
import sequelize from '../../../data/sequelize';

var CronJob = require('cron').CronJob;

const updateIsMintingToFalse = (app) => {
  new CronJob(
    '*/3 * * * * *', // Run every 5m
    async function() {
      try {
        console.log(
          '================================================================================================================='
        );
        console.log('HOLY MOLY REMOVE NFT isMinting after 5 minutes CRON STARTED');

        const nfts = await sequelize.query(`
            SELECT 
                id
            FROM
                ${process.env.DATABASE_DBNAME}.NFT
            WHERE
                NFT.mintedAt < DATE_SUB(NOW(), INTERVAL 5 MINUTE)
                    AND NFT.isDeleted = false
                    AND NFT.isMinting = true
        `, { type: sequelize.QueryTypes.SELECT }) 

        for(let index = 0; index < nfts.length; index ++) {
          const nftId = nfts[index].id;

          const nft = await NFT.findOne({
            where: {
              id: nftId
            },
            raw: true
          })

          const updateData = {
            isMinting: false
          }

          if (nft?.isHostMinted) {
            updateData.isDeleted = true
          }

          NFT.update(updateData, {
            where: {
              id: nftId
            }
          })
        }

      } catch(error) {
        console.log("----------------- REMOVE NFT isMinting after 5 minutes CRON ERROR", error)
      }

      console.log('HOLY MOLY REMOVE NFT isMinting after 5 minutes CRON END');
      console.log(
        '================================================================================================================='
      );
    },
    null,
    true,
    'Asia/Ho_Chi_Minh'
  );
};

export default updateIsMintingToFalse;