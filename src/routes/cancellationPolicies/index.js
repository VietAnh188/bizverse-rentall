import React from 'react';
import Layout from '../../components/Layout';
import Policies from './Policies';

const title = 'Cancellation Policies';

export default function action({store, params }) {

  // From URL
  const policyType = params.type;
  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  return {
    title,
    component: <Layout showBreadcrumb={false}><Policies policyType={policyType} /></Layout>,
  };
}