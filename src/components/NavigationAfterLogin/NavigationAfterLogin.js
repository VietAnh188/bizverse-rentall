import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';
import { match } from 'node-match-path';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationAfterLogin.css';
import {
  Nav,
  NavDropdown
} from 'react-bootstrap';

// Configs
import { MARKETPLACE_URL } from '../../config'

// Internal Components
import NavLink from '../NavLink';
import MenuItemLink from '../MenuItemLink';
import Avatar from '../Avatar';
import Logout from '../Logout';
import Message from '../Message';
import WishListModal from '../WishListModal';
import HeaderModal from '../HeaderModal';
import NavLinksLanguageCurrency from '../NavigationBeforeLogin/NavLinksLanguageCurrency';

// Graphql
import UserBanStatusQuery from './getUserBanStatus.graphql';
import CheckUserStatusQuery from './getCheckUserStatus.graphql';
import UserStatusQuery from './getUserStatus.graphql';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

import { setUserLogout } from '../../actions/logout';
import { openHeaderModal } from '../../actions/modalActions';
import { formatLocale, getCountryCode } from '../../helpers/formatLocale';
import ReactCountryFlag from 'react-country-flag';
import { showCurrencySymbol } from '../../helpers/currencyConvertion';
//Icon
import IconBtnClose from '../../../public/SiteImages/btnClose.png';

class NavigationAfterLogin extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.any,
    formatMessage: PropTypes.any,
    loginUserBanStatus: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUserBanStatus: PropTypes.shape({
        userBanStatus: PropTypes.number,
      }),
    }),
  };
  static defaultProps = {
    loginUserBanStatus: {
      loading: true,
      getUserBanStatus: {
        userBanStatus: 0,
      },
    },
    userDeleteStatus: {
      userLoading: true,
      getUserStatus: {
        userStatus: null,
      },
    },
    checkLoginUserExist: {
      userExistloading: true,
      getCheckUserStatus: {
        userExistStatus: null,
      },
    }
  };

  handleOpenHeaderModalLanguage = () => {
    this.props.openHeaderModal('languageModal');
  }
  handleOpenHeaderModalCurrency = () => {
    this.props.openHeaderModal('currencyModal');
  }
  openClose() {
    document.getElementById('menuResponsive').classList.add('hidenMenu');
  }
  isMatch(path) {
    if (typeof window !== "undefined") {
      const result = match(path, location.pathname);
      return result.matches;
    }
  }

  checkActiveNFT() {
      return this.isMatch('/nft/:action') 
        || this.isMatch('/nfts/:action') 
  }

  checkActiveHost() {
    return this.isMatch('/rooms') 
        || this.isMatch('/become-a-host') 
        || this.isMatch('/become-a-host/:id') 
        || this.isMatch('/become-a-host/:id/:subpath') 
        || this.isMatch('/reservation/current') 
        || this.isMatch('/reservation/previous') 
        || this.isMatch('/users/trips/itinerary/:id') 
        || this.isMatch('/users/trips/receipt/:id')
  }
  checkActiveUser() {
    return this.isMatch('/user/transaction')
        || this.isMatch('/user/payout')
        || this.isMatch('/user/edit')
        || this.isMatch('/user/photo')
        || this.isMatch('/user/verification')
        || this.isMatch('/user/reviews')
        || this.isMatch('/user/security')
        || this.isMatch('/user/show/:id')
        || this.isMatch('/dashboard')
        || this.isMatch('/user/addpayout')
        || this.isMatch('/wishlists')
        || this.isMatch('/wishlists/:id')
    
  }

  goToMarketplace = () => {
    window.open(MARKETPLACE_URL)
  }

  render() {
    const { loginUserBanStatus: { loading, getUserBanStatus }, userDeleteStatus: { loading: isLoadingUserStatus, getUserStatus }, openClose } = this.props;
    const { checkLoginUserExist: { loading: isCheckingUserLogin,  getCheckUserStatus }, className, setUserLogout, wishListModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { userData, openHeaderModal } = this.props;
    const { toCurrency, baseCurrency, currentLocale } = this.props;
    let displayCurrency = toCurrency ? toCurrency : baseCurrency;
    let isVerified;

    if (userData) {
      isVerified = userData.profileId;
    }

    if ((!loading && getUserBanStatus?.userBanStatus)
      || (!isLoadingUserStatus && getUserStatus?.status === 'userDeleted')
    ) {
      setUserLogout();
    }

    return (
      <Nav pullRight className={cx('floatLeftAR', 'navLinkHeader')}>
       {/* <Nav pullRight className={s.newMenu}></Nav> */}
        <div className={cx('visible-xs', 'btnCloseMenuMobile', s.breakPointScreen)} onClick={() => this.openClose()}>
         <img src={IconBtnClose} />
        </div>
        <NavLink
          to="/"
          className={cx('visible-xs', s.breakPointScreen, s.newMenuDesign)}
        >
          <FormattedMessage {...messages.home} />
        </NavLink>
        <NavLink
          to="/nft/marketplace"
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.nftMarketplace} />
        </NavLink>

        <NavLink
          to="/dashboard"
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.dashboard} />
        </NavLink>
        <NavDropdown
          className={cx('hidden-xs', s.nonBreakPointScreen)}
          eventKey={3}
          title={<span>{formatMessage(messages.nft)}</span>}
          noCaret id="nft-menu"
          active={this.checkActiveNFT()}
        >
          <MenuItemLink onClick={this.goToMarketplace}>
            <FormattedMessage {...messages.marketplace} />
          </MenuItemLink>
          <MenuItemLink to="/nft/create">
            <FormattedMessage {...messages.createNFT} />
          </MenuItemLink>
          <MenuItemLink to="/nft/inventory">
            <FormattedMessage {...messages.yourInventory} />
          </MenuItemLink>
        </NavDropdown>
        <NavDropdown
          className={cx('hidden-xs', s.nonBreakPointScreen)}
          eventKey={3}
          title={<span>{formatMessage(messages.host)}</span>}
          noCaret id="basic-nav-dropdown"
          active={this.checkActiveHost()}
        >
          <MenuItemLink to="/rooms">
            <FormattedMessage {...messages.manageListing} />
          </MenuItemLink>
          <MenuItemLink to="/become-a-host?mode=new">
            <FormattedMessage {...messages.listYourSpace} />
          </MenuItemLink>
          <MenuItemLink to="/reservation/current">
            <FormattedMessage {...messages.yourReservations} />
          </MenuItemLink>
          <MenuItemLink to="/user/transaction">
            <FormattedMessage {...messages.transactionHistory} />
          </MenuItemLink>
        </NavDropdown>
        <NavLink
          // to={"/users/show/" + isVerified}
          to={'/user/edit'}
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.profile} />
        </NavLink>
        <NavLink
          to="/user/payout"
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.accountSettings} />
        </NavLink>
        <NavLink
          to="/checkIn-timeline/host"
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.checkInTimeline} />
        </NavLink>
        <NavLink to="/wishlists" className={cx('visible-xs', s.breakPointScreen)} >
          <FormattedMessage {...messages.saved} />
        </NavLink>
        <NavLink to="/trips/current" >
          <FormattedMessage {...messages.trips} />
        </NavLink>
        <NavLink
          to="/nft/inventory"
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.inventory} />
        </NavLink>
        <NavLink to="/rooms" className={cx('visible-xs', s.breakPointScreen)}>
          <FormattedMessage {...messages.host} />
        </NavLink>
        <Message />
        <Logout className={cx('visible-xs', s.breakPointScreen)} />
        <NavDropdown
          className={cx('hidden-xs', s.nonBreakPointScreen)} eventKey={3} title={
            <Avatar
              isUser
              type={'small'}
              height={30}
              width={30}
              className={s.userAvatar}
            />
          } noCaret id="basic-nav-dropdown" active={this.checkActiveUser()}
        >
          <MenuItemLink to="/dashboard">
            <FormattedMessage {...messages.dashboard} />
          </MenuItemLink>
          <MenuItemLink to="/user/edit">
            <FormattedMessage {...messages.editProfile} />
          </MenuItemLink>
          <MenuItemLink to="/wishlists" >
            <FormattedMessage {...messages.saved} />
          </MenuItemLink>
          <MenuItemLink to="/user/payout">
            <FormattedMessage {...messages.accountSettings} />
          </MenuItemLink>
          <MenuItemLink to="/checkIn-timeline/host">
            <FormattedMessage {...messages.checkInTimeline} />
          </MenuItemLink>
          <Logout />
        </NavDropdown>
        <NavLinksLanguageCurrency />
        <NavLink
          className={cx('visible-xs','languageHiddenAR', s.breakPointScreen, s.languageHidden)}
          to="#"
          onClick={this.handleOpenHeaderModalLanguage}
        > <ReactCountryFlag countryCode={getCountryCode(currentLocale)} svg />
          <span>{formatLocale(currentLocale)}</span>
        </NavLink>
        <NavLink
          className={cx('visible-xs', s.breakPointScreen)}
          to="#"
          onClick={this.handleOpenHeaderModalCurrency}>
           <span>{showCurrencySymbol(displayCurrency, currentLocale)}</span>
        </NavLink>
        {
          wishListModal && <WishListModal />
        }
        <HeaderModal modalType={'languageModal'} />
        <HeaderModal modalType={'currencyModal'} />
      </Nav>
    );
  }
}
const mapState = state => ({
  wishListModal: state.modalStatus.wishListModalOpen,
  userData: state.account.data,
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currentLocale: state.intl.locale,
  username: state.runtime.username,
  accessToken: state.runtime.access_token
});
const mapDispatch = {
  setUserLogout,
  openHeaderModal,
  formatLocale
};
export default
  compose(
    injectIntl,
    withStyles(s),
    graphql(UserBanStatusQuery, {
      name: 'loginUserBanStatus',
      options: {
        ssr: false,
        pollInterval: 5000,
      },
    }),
    graphql(UserStatusQuery, {
      name: 'userDeleteStatus',
      options: {
        ssr: false,
        // pollInterval: 5000,
      },
    }),
    graphql(CheckUserStatusQuery, {
      name: 'checkLoginUserExist',
      options: {
        ssr: false,
        // pollInterval: 5000,
      },
    }),
    (connect(mapState, mapDispatch)))(NavigationAfterLogin);
