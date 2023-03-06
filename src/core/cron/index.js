import removeInTransactionAfter24h from './NFT/removeInTransactionAfter24h'
import syncBlockChain from './blockchain/index'
import syncCountryAndCurrency from './countryAndCurrency'
import updateIsMintingToFalse from './NFT/updateIsMintingToFalse';

const cronJobs = app => {
    // NFT cron jobs
    removeInTransactionAfter24h()
    updateIsMintingToFalse(app);

    // Sync with blockchain data
    syncBlockChain(app)

    // // Country, currency
    syncCountryAndCurrency(app)
}

export default cronJobs;