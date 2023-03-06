import React from 'react';
import { FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideMenu.css';
import bt from '../../../components/commonStyle.css';
import {
  Button,
  Col,
  FormGroup
} from 'react-bootstrap';
import cx from 'classnames';

// Locale
import messages from '../../../locale/messages';

// Component
import SubnavBar from '../../SubnavBar/SubnavBar'
import history from '../../../core/history';

class SideMenu extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  handleClick() {
    history.push('/become-a-host');
  }

  render() {
    const menuItems = [
      {
        paths: ['/rooms'],
        mainPath: '/rooms',
        message: messages.yourListings
      },
      {
        paths: ['/reservation/current'],
        mainPath: '/reservation/current',
        message: messages.upcomingReservations
      },
      {
        paths: ['/reservation/previous'],
        mainPath: '/reservation/previous',
        message: messages.previousReservations
      },
      {
        paths: ['/dashboard'],
        mainPath: '/dashboard',
        message: messages.dashboard
      },
    ]

    return (
      <Col xs={12} sm={3} md={3} lg={3}>
        <SubnavBar menuItems={menuItems} />

        <Col cols={12} className={cx(s.noPadding, s.space2, s.spaceTop2)} >
          <FormGroup className={s.formGroup}>
            <Button className={cx(s.button, bt.btnPrimary, s.sideMenuBtn)} onClick={this.handleClick}>
              <FormattedMessage {...messages.addListing} />
            </Button>
          </FormGroup>
        </Col>
      </Col>
    );
  }
}

export default withStyles(s, bt)(SideMenu);