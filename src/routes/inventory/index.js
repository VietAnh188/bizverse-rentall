import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import Inventory from './Inventory';

const title = 'NFT Inventory';

export default function action({ store }) {

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout backgroundPositionY="160px">
      <Inventory />
    </UserLayout>,
  };
}