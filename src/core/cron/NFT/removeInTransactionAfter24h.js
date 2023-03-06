// import models
import { NFT } from '../../../data/models';

var CronJob = require('cron').CronJob;

const removeInTransactionAfter24h = () => {
    new CronJob('0 0 * * * *', // Run every hour
    async function() {
      try {
        console.log(
          '================================================================================================================='
        );
        console.log('HOLY MOLY REMOVE NFT inTransaction after 24h CRON STARTED');

        const nfts = await NFT.findAll({
            where: {
                isDeleted: false,
                inTransaction: true,
                inTransactionAt: {
                    $gt: new Date(Date.now() - (24 * 60 * 60 * 1000)),
                }
            },
            raw: true
        })

        if (nfts.length) {
            NFT.update({
                inTransaction: false
            }, {
                where: {
                    id: nfts.map(nft => nft.id)
                }
            })
        }

      } catch(error) {
        console.log("----------------- REMOVE NFT inTransaction after 24h CRON ERROR", error)
      }

      console.log('HOLY MOLY REMOVE NFT inTransaction after 24h CRON END');
      console.log(
        '================================================================================================================='
      );
    })
}

export default removeInTransactionAfter24h