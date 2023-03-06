import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import AddPayoutFailure from './AddPayoutFailure';

const title = 'Payout Failure';

export default function action({ store, query }) {

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;
  let currentAccountId = query && query.account;
  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><AddPayoutFailure title={title} currentAccountId={currentAccountId} /></UserLayout>,
  };
};
