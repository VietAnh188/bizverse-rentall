import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import PayoutContainer from './PayoutContainer';
import { getPayouts } from '../../actions/Payout/getPayouts';

const title = 'Payout Preferences';

export default async function action({ store, query }) {

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;
  let currentAccountId = query && query.account;
  const userId = store.getState().account && store.getState().account.data && store.getState().account.data.userId;
  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  await store.dispatch(getPayouts(currentAccountId, userId));

  return {
    title,
    component: <UserLayout><PayoutContainer title={title} currentAccountId={currentAccountId} /></UserLayout>,
  };
}
