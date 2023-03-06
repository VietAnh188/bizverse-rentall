import React from 'react';
import HeadLessLayout from '../../../components/Layout/HeadLessLayout';
import AdminLogin from './AdminLogin';

const title = 'Admin Log In';

export default function action(context) {

  // From Redux Store
  let isAdminAuthenticated = context.store.getState().runtime.isAdminAuthenticated;

  if (isAdminAuthenticated) {
    return { redirect: '/siteadmin/users' };
  }

  return {
    title,
    component: <HeadLessLayout><AdminLogin title={title} /></HeadLessLayout>,
  };
}
