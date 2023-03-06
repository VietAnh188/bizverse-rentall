import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { match } from 'node-match-path';

import history from '../../core/history';

import { NavItem } from 'react-bootstrap';
// Redux action
import { toggleClose } from '../../actions/Menu/toggleControl';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class NavLink extends React.Component {
  static propTypes = {
    to: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.any,
    noLink: PropTypes.bool,
    className: PropTypes.string,
    toggleClose: PropTypes.any.isRequired,
  };

  handleClick = (event) => {
    const { noLink, toggleClose } = this.props;
    toggleClose();
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();

    if (!noLink) {
      history.push(this.props.to);
    }
  };
  isMatch(path) {
    if (typeof window !== "undefined") {
      const result = match(path, location.pathname);
      return result.matches;
    }
  }
  checkActiveNavlink() {
    switch (true) {
      case this.isMatch('/'):
        return '/';
      case this.isMatch('/whyhost'):
        return '/whyhost';
        
      case this.isMatch('/dashboard'):
        return '/dashboard';
      case this.isMatch('/user/edit'):
      case this.isMatch('/user/photo'):
      case this.isMatch('/user/reviews'):  
        return '/user/edit';

      case this.isMatch('/inbox'): 
      case this.isMatch('/message/:id'):
      case this.isMatch('/message/:id/:subpath'):
        return '/inbox';

      case this.isMatch('/nft/inventory'):  
        return '/nft/inventory';

      case this.isMatch('/trips/current'):
      case this.isMatch('/trips/previous'):
        return '/trips/current';

      case this.isMatch('/wishlists'):
      case this.isMatch('/wishlists/:id'):
        return '/wishlists';

      case this.isMatch('/user/payout'):
      case this.isMatch('/user/transaction'):
        return '/user/payout';

      case this.isMatch('/rooms'):
      case this.isMatch('/become-a-host'):
      case this.isMatch('/become-a-host/:id'):
      case this.isMatch('/become-a-host/:id/:subpath'):
      case this.isMatch('/reservation/current'):
      case this.isMatch('/reservation/previous'):
      case this.isMatch('/users/trips/itinerary/:id'):
      case this.isMatch('/users/trips/receipt/:id'):
        return '/rooms';

      case this.isMatch('/help'):
        return '/help';

      default:
        return false;
        break;
    }
  }
  render() {
    const { to, children, className } = this.props;
    return <NavItem href={to} onClick={this.handleClick} className={className} active={this.checkActiveNavlink()===to}>{children}</NavItem>;
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  toggleClose
};

export default connect(mapState, mapDispatch)(NavLink);
