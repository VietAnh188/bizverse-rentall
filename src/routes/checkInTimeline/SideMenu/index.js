import React from 'react';
import { FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';
import bt from '../../../components/commonStyle.css';
import {
  Col
} from 'react-bootstrap';

// Locale
import messages from '../../../locale/messages';

// Component
import SubnavBar from '../../../components/SubnavBar/SubnavBar'

class SideMenu extends React.Component {
  render() {
    const menuItems = [
      {
        paths: ['/checkIn-timeline/guest'],
        mainPath: '/checkIn-timeline/guest',
        message: messages.hostCheckIn
      },
      {
        paths: ['/checkIn-timeline/host'],
        mainPath: '/checkIn-timeline/host',
        message: messages.guestCheckIn
      }
    ]

    return (
      <Col xs={12} sm={3} md={3} lg={3}>
        <SubnavBar menuItems={menuItems} />
      </Col>
    );
  }
}

export default withStyles(s, bt)(SideMenu);