import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import TripsContainer from './TripsContainer';

const title = 'Trips';

export default function action({ store, params }) {

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  const type = params.type;
  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><TripsContainer userType="guest" type={type} /></UserLayout>,
  };
}
