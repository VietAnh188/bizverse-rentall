import nftTransfers from "./nftTransfers";
import nftOffers from "./nftOffers";

const syncBlockChain = app => {
  nftTransfers(app)
  nftOffers(app)
}

export default syncBlockChain;
