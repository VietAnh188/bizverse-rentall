import React from 'react';
import ManageListing from './ManageListing';
import UserLayout from '../../components/Layout/UserLayout';
import { getListingSteps, resetListingSteps } from '../../actions/getListingSteps';

const title = "Manage Listing";

export default async function action({ store }) {

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;

  store.dispatch(resetListingSteps());
  await store.dispatch(getListingSteps());

  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><ManageListing /></UserLayout>,
  };
}
