import React from 'react';

//Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideMenuTrips.css';

import { Col } from 'react-bootstrap';

// Locale
import messages from '../../../locale/messages';

// Component
import SubnavBar from '../../SubnavBar/SubnavBar'

class SideMenuTrips extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menuItems = [
      {
        paths: ['/trips/current'],
        mainPath: '/trips/current',
        message: messages.upcomingTrips
      },
      {
        paths: ['/trips/previous'],
        mainPath: '/trips/previous',
        message: messages.previousTrips
      },
      {
        paths: ['/dashboard'],
        mainPath: '/dashboard',
        message: messages.dashboard
      }
    ]

    return (
      <Col xs={12} sm={3} md={3} lg={3}>
        <SubnavBar menuItems={menuItems} />
      </Col>
    );
  }
}

export default withStyles(s)(SideMenuTrips);