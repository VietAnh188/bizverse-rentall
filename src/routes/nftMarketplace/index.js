import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import NFTMarketplace from './NFTMarketplace';

const title = 'Create NFT';

export default function action({ store }) {
  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  return {
    title,
    component: <UserLayout>
      <NFTMarketplace />
    </UserLayout>,
  };
}