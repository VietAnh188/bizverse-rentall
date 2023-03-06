import React from 'react';
import Layout from '../../../components/Layout';
import WhyHost from './WhyHost';

const title = 'whyhost';

export default function action({store}) {
  let isMaintenance = store.getState().maintenance.isMaintenance;

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  return {
    title,
    component: <Layout><WhyHost title={title} /></Layout>,
  };
}
