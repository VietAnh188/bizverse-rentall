import React from 'react';
import Layout from '../../components/Layout';
import WhyHostNew from './WhyHostNew';

const title = 'whyhost';

export default function action() {
  return {
    title,
    component: <Layout showBreadcrumb={false}><WhyHostNew title={title} /></Layout>,
  };
}
