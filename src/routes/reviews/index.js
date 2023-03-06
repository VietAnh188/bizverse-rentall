import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import ReviewsContainer from './ReviewsContainer';

const title = 'Reviews';

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
    component: <UserLayout><ReviewsContainer /></UserLayout>,
  };
}