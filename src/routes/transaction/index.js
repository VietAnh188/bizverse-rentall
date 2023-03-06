import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import TransactionContainer from './TransactionContainer';

const title = 'Transaction History';

export default function action({ store }) {

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;
  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><TransactionContainer mode={"completed"} /></UserLayout>,
  };
}
