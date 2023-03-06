import React from 'react';
import Layout from '../../components/Layout';

const title = 'Admin Page';
const isAdmin = false;

export default async function action() {
  if (!isAdmin) {
    return { redirect: '/login' };
  }

  const Admin = await require.ensure([], require => require('./Admin').default, 'admin');

  return {
    title,
    component: <Layout><Admin title={title} /></Layout>,
  };
}
