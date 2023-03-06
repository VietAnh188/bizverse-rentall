import React from 'react';
import UserLayout from '../../../components/Layout/UserLayout';
import CheckInTimeline from '../CheckInTimeline';

const title = 'CheckIn timeline';

export default function action({ store, params }) {

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
    component: <UserLayout><CheckInTimeline type="host" /></UserLayout>,
  };
}
