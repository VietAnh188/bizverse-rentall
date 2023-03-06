import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import AddPayoutContainer from './AddPayoutContainer';

const title = 'Add Payout Preferences';

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

  let accountData = store.getState().account.data;

  return {
    title,
    component: <UserLayout><AddPayoutContainer title={title} initialData={accountData} /></UserLayout>,
  };
}
