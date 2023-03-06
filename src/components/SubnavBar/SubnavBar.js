import React, { Component } from 'react'
import { match } from 'node-match-path'

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SubnavBar.css';
import history from '../../core/history';
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Component
import Link from '../Link';

const MENU_ITEMS = [
  {
    paths: ['/dashboard'],
    mainPath: '/dashboard',
    message: messages.dashboard
  },
  {
    paths: ['/inbox', '/message/:id/guest'],
    mainPath: '/inbox',
    message: messages.inbox
  },
  {
    paths: ['/rooms', '/reservation/current', '/reservation/previous'],
    mainPath: '/rooms',
    message: messages.yourListings
  },
  {
    paths: ['/trips/current', '/trips/previous'],
    mainPath: '/trips/current',
    message: messages.yourTrips
  },
  {
    paths: ['/user/edit', '/user/photo', '/user/verification', '/user/reviews'],
    mainPath: '/user/edit',
    message: messages.profile
  },
  {
    paths: ['/user/payout', '/user/transaction', '/users/security'],
    mainPath: '/user/payout',
    message: messages.account
  }
]

class MenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  componentDidMount() {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }

  isMatch(paths) {
    const { location } = this.state;

    return paths.some(path => match(path, location).matches)
  }

  render() {
    const { menuItems = MENU_ITEMS } = this.props
    
    return (
      <div className={cx(s.progressContainer, s.bizverseBox, s.bizverseBoxSecondary, "hidden-xs", "hidden-print")}>
        <ul className={cx(s.navList)}>
          {menuItems.map(({ paths, mainPath, message }) => (
            <li key={mainPath} className={cx(s.navItemWrapper, {
              [s.active]: this.isMatch(paths)
              })}>
              <Link to={mainPath} className={cx(s.navItem, 'navRtl')}>
                <FormattedMessage {...message} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}


export default withStyles(s)(MenuComponent);
