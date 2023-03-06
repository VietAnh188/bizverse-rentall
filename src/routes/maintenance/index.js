import React from 'react';
import Maintenance from './Maintenance';

const title = 'Maintenance Page';

export default function action() {
  return {
    title,
    component: <Maintenance />,
  };
};