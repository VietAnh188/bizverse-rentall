import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import NFTs from './NFTs';
import { restrictUrls } from '../../../helpers/adminPrivileges';


const title = 'NFTs Management';

export default async function action({ store }) {


  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState()?.adminPrevileges?.privileges?.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/nfts', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><NFTs title={title} /></AdminLayout>,
  };
}
