import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';

const title = 'Log In';

export default function action({ store, query }) {

  // From Redux Store
  let warning = false;
  let refer = query.refer;

  if (refer && refer != null) {
    refer = refer.indexOf('---') >= 0 ? refer.replace('---', '?') : refer;
    refer = refer.indexOf('--') >= 0 ? refer.replace('--', '&') : refer;
  }

  if ('verification' in query) {
    warning = true;
  }

  return {
    title,
    component: <Layout showBreadcrumb={false}><Login  title={title} warning={warning} refer={refer} /></Layout>,
  };
}
