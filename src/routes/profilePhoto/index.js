import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import ProfilePhotoContainer from './ProfilePhotoContainer';

const title = 'Profile Photo';

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
    component: <UserLayout><ProfilePhotoContainer /></UserLayout>,
  };
}
