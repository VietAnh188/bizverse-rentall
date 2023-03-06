import {
    GraphQLSchema as Schema,
    GraphQLObjectType as ObjectType,
  } from 'graphql';
  
  // NFT models
  import marketplace_removeNFT from './mutations/NFT/marketplace_removeNFT'
  import marketplace_getListingByNFT from './queries/NFT/marketplace/marketplace_getListingByNFT';

  import userLogin from './queries/userLogin';
  import userLogout from './queries/userLogout';
  import marketplace_getUser from './queries/marketplace/marketplace_getUser'
  
  // Marketplace
  import marketplace_getUserNFTs from './queries/NFT/marketplace/marketplace_getUserNFTs';
  import marketplace_getNFTs from './queries/NFT/marketplace/marketplace_getNFTs';
  import marketplace_sellNFTSuccess from './mutations/NFT/marketplace/marketplace_sellNFTSuccess';
  import marketplace_getFavoriteNFTs from './queries/NFT/marketplace/marketplace_getFavoriteNFTs';
  import marketplace_getUserActivities from './queries/NFT/marketplace/marketplace_getUserActivities';
  import marketplace_getUserActivity from './queries/NFT/marketplace/marketplace_getUserActivity';
  import toggleFavoriteNFT from './mutations/MarketplaceWishList/toggleFavoriteNFT';
  import marketplace_checkNFTAvailable from './queries/NFT/marketplace/marketplace_checkNFTAvailable'
  import marketplace_confirmTransactionStart from './mutations/NFT/marketplace/marketplace_confirmTransactionStart';
  import marketplace_createNFTCollection from './mutations/NFTCollection/marketplace_createNFTCollection';
  import marketplace_deleteNFTCollection from './mutations/NFTCollection/marketplace_deleteNFTCollection';
  import marketplace_getNFTCollection from './queries/NFTCollection/marketplace_getNFTCollection';
  import marketplace_getNFTCollections from './queries/NFTCollection/marketplace_getNFTCollections';
  import marketplace_updateNFTCollection from './mutations/NFTCollection/marketplace_updateNFTCollection';
  import marketplace_addNFTsToCollection from './mutations/NFTCollectionDetail/marketplace_addNFTsToCollection';
  import marketplace_removeNFTsOutCollection from './mutations/NFTCollectionDetail/marketplace_removeNFTsOutCollection';
  import marketplace_getNFTsOfCollection from './queries/NFTCollectionDetail/marketplace_getNFTsOfCollection'
  
  const schemaMarketplace = new Schema({
    query: new ObjectType({
      name: 'Query',
      fields: {
        userLogin,
        userLogout,
        marketplace_getUser,
        marketplace_getListingByNFT,
        marketplace_getUserNFTs,
        marketplace_getFavoriteNFTs,
        marketplace_getNFTs,
        marketplace_getUserActivities,
        marketplace_getUserActivity,
        marketplace_checkNFTAvailable,
        marketplace_getNFTCollection,
        marketplace_getNFTCollections,
        marketplace_getNFTsOfCollection
      }
    }),
    mutation: new ObjectType({
      name: 'Mutation',
      fields: {
        marketplace_removeNFT,
        marketplace_sellNFTSuccess,
        toggleFavoriteNFT,
        marketplace_confirmTransactionStart,
        marketplace_createNFTCollection,
        marketplace_deleteNFTCollection,
        marketplace_updateNFTCollection,
        marketplace_addNFTsToCollection,
        marketplace_removeNFTsOutCollection
      }
    })
  });
  
  export default schemaMarketplace;
  