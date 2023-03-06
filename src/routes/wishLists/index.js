import React from 'react';
import WishLists from './WishLists';
import Layout from '../../components/Layout';
import UserLayout from '../../components/Layout/UserLayout';

const title = 'Wish Lists';

export default function action({ store, params }) {

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  let profileId, wishListId;
  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  if (isAuthenticated) {
    profileId = store.getState().account.data.profileId;
  }

  if (params && params.id) {
    wishListId = params.id;
  }

  return {
    title,
    component: <UserLayout><WishLists
      profileId={profileId}
      wishListId={wishListId}
    />
    </UserLayout>,
  };
}
