import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import Loader from '../../components/Loader/Loader';
import NFTsDetail from './NFTDetail';


const title = 'NFT Detail';

export default function action({ store, params }) {

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  let nftId;
  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }
  if (params && params.id) {
    nftId = params.id;
  }
  return {
    title,
    component: <UserLayout>
      <NFTsDetail nftId={nftId}/>
    </UserLayout>,
  };
}