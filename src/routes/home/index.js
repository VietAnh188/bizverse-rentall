import React from 'react';
import Home from './Home';
import HomeLayout from '../../components/Layout/HomeLayout';

import { getListingFields } from '../../actions/getListingFields';
import { getHomeBannerImages } from '../../actions/getHomeBannerImages';
import { getStaticBlockInfo } from '../../actions/siteadmin/getStaticBlockInfo';
import { setPersonalizedValues } from '../../actions/personalized';
import { getSideMenu } from '../../actions/siteadmin/getSideMenu';

export default async function action({ store, client }) {
  const title = store.getState().siteSettings.data.siteTitle;
  const description = store.getState().siteSettings.data.metaDescription;
  const listingFields = store.getState().listingFields.data;
  const layoutType = store.getState().siteSettings.data.homePageType;
  let isMaintenance = store.getState().maintenance.isMaintenance;

  

  if (listingFields === undefined) {
    store.dispatch(getListingFields());
  }
  await store.dispatch(getHomeBannerImages());
  await store.dispatch(getStaticBlockInfo());
  await store.dispatch(getSideMenu());
  if (layoutType != 1) {
    await store.dispatch(setPersonalizedValues({ name: 'personCapacity', value: Number(1) }));
  }
  

  if(isMaintenance) {
    return { redirect: '/maintenance'}
  }
  
  return {
    title: title,
    description,
    listingFields,
    component: <HomeLayout layoutType={layoutType}><Home layoutType={layoutType} /></HomeLayout>,
  };
}
