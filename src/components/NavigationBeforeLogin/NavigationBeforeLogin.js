import React from 'react';
import PropTypes from 'prop-types';
import { match } from 'node-match-path';

import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationBeforeLogin.css';

import { Nav, NavDropdown } from 'react-bootstrap';
import NavLinksLanguageCurrency from './NavLinksLanguageCurrency';

// Configs
import { MARKETPLACE_URL } from '../../config'

// Constants
import { bizverseAppId, bizverseAppSecret, bizverseLinkSocialApp } from "../../config";

// Modals
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import ForgotPassword from '../ForgotPassword';
import HeaderModal from '../HeaderModal';

import NavLink from '../NavLink';
import MenuItemLink from '../MenuItemLink';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../locale/messages';

//Icon
import IconBtnClose from '../../../public/SiteImages/btnClose.png';

// Actions
import { checkIsUserLoggedIn } from '../../actions/getInfoLoginSocial'
import { openHeaderModal } from '../../actions/modalActions';
import { formatLocale, getCountryCode } from '../../helpers/formatLocale';
import ReactCountryFlag from 'react-country-flag';
import { showCurrencySymbol } from '../../helpers/currencyConvertion';
import { login } from "../../actions/user/login";

class NavigationBeforeLogin extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.any,
    openLoginModal: PropTypes.any,
    openSignupModal: PropTypes.any,
  };

  componentDidMount() {
    const { checkIsUserLoggedIn, login } = this.props;

    checkIsUserLoggedIn();

    // Login by code from social
    const url = new URL(location.href);
    const code = url.searchParams.get("code");
    
    if (code) {
      login(code);
    }
  }

  handleLogin() {
    const BizverseURL = `${bizverseLinkSocialApp}oauth?app_id=${bizverseAppId}&app_secret=${bizverseAppSecret}`;
    
    window.location.href = BizverseURL
  }

  openClose() {
    document.getElementById('menuResponsive').classList.add('hidenMenu');
  }

  handleOpenHeaderModalLanguage = () => {
    this.props.openHeaderModal('languageModal');
  }

  handleOpenHeaderModalCurrency = () => {
    this.props.openHeaderModal('currencyModal');
  }

  isMatch(path) {
    if (typeof window !== "undefined") {
      const result = match(path, location.pathname);
      return result.matches;
    }
  }

  checkActiveNFT() {
    return this.isMatch('/nft/:action') 
  }

  goToMarketplace = () => {
    window.open(MARKETPLACE_URL)
  }

  render() {
    const { toCurrency, baseCurrency, currentLocale } = this.props;
    const { formatMessage } = this.props.intl;
    let displayCurrency = toCurrency ? toCurrency : baseCurrency;

    return (
      <div>
        <LoginModal />
        <SignupModal />
        <ForgotPassword />
        <HeaderModal modalType={'languageModal'} />
        <HeaderModal modalType={'currencyModal'} />
        <Nav pullRight className={cx('floatLeftAR', 'navLinkHeader')}>
        {/* <Nav pullRight className={s.newMenu}></Nav> */}
          <div className={cx('visible-xs', 'btnCloseMenuMobile', s.breakPointScreen)} onClick={() => this.openClose()}>
            <img src={IconBtnClose} />
          </div>
          <NavLink to="/" className={cx("hidden-lg", s.newMenuDesign)}>
            <FormattedMessage {...messages.home} />
          </NavLink>

          {/* NFT menu */}
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
          </NavDropdown>

          <NavLink to="/whyhost" >
            <FormattedMessage {...messages.becomeAHost} />
          </NavLink>
          <NavLink to="/help">
            <FormattedMessage {...messages.help} />
          </NavLink>

          {/* Login by Bizverse network  */}
          <NavLink
            to='#'
            onClick={this.handleLogin}
            // className={cx(s.breakPointScreen)}
          >
            <FormattedMessage {...messages.login} />
          </NavLink>
          <NavLinksLanguageCurrency />
          <NavLink
            className={cx('visible-xs','languageHiddenAR', s.breakPointScreen, s.languageHidden)}
            to='#'
            onClick={this.handleOpenHeaderModalLanguage} > 
            <ReactCountryFlag countryCode={getCountryCode(currentLocale)} svg />
            <span>{formatLocale(currentLocale)}</span>
          </NavLink>
          <NavLink
            className={cx('visible-xs', s.breakPointScreen)}
            to='#'
            onClick={this.handleOpenHeaderModalCurrency}>
            <span>{showCurrencySymbol(displayCurrency, currentLocale)}</span>
          </NavLink>
        </Nav>
      </div>
    );
  }
}

const mapState = state => ({
  username: state.runtime.username,
  accessToken: state.runtime.access_token,
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currentLocale: state.intl.locale,
});
const mapDispatch = {
  checkIsUserLoggedIn,
  openHeaderModal,
  formatLocale,
  login
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(NavigationBeforeLogin)));
