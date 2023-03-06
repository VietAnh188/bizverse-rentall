import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationBeforeLogin.css';

// Components
import * as Icons from 'react-icons/lib/ti';
import ReactCountryFlag from "react-country-flag"
import NavLink from '../NavLink/NavLink';

// Redux
import { connect } from 'react-redux';

// Translation
import { FormattedMessage } from 'react-intl';

// Actions
import { openHeaderModal } from '../../actions/modalActions';

// Helpers
import { showCurrencySymbol } from '../../helpers/currencyConvertion';
import { formatLocale, getCountryCode } from '../../helpers/formatLocale';
import LanguageModal from '../LanguageModal/LanguageModal';

//icon
import imgClose from "../../../public/SiteImages/btnClose.png";
import CurrencyModal from '../CurrencyModal/CurrencyModal';
import messages from '../../locale/messages';


class NavLinksLanguageCurrency extends React.Component {
  state = {
    isOpen: false,
    numberSelect: 0,
  }
  handleOpenMenu = (id) => { 
    document.getElementById(id).classList.toggle("showMenu");
    let contents = document.getElementsByClassName('content');
    let isExistClassBefore = document.getElementsByClassName("showMenu").length === 1 ? false: true ;
    if (isExistClassBefore) {
        contents[this.state.numberSelect].classList.remove("showMenu");
    }
   this.setState({isOpen:isExistClassBefore})
  }

  componentDidUpdate() {
    let contents = document.getElementsByClassName('content');
    let buttons = document.getElementsByClassName('dropbtn');
    if (!this.state.isOpen) {
     window.addEventListener("click", () => {
      let isClose = buttons[this.state.numberSelect].contains(event.target);
         if (!isClose && !event.target.matches(".dropbtn") ) {
            for (var i = 0; i < contents.length; i++) {
              if(contents[i].classList.contains('showMenu')){
                contents[i].classList.remove("showMenu");
              }
                
            }
         }
    });
    }
  }
  render() {
    const { openHeaderModal, isLanguageModalOpening, isCurrencyModalOpening } = this.props;
    const { toCurrency, baseCurrency, currentLocale } = this.props;
    const displayCurrency = toCurrency ? toCurrency : baseCurrency;
    return (
      <>
        <li className={cx(s.languageMenu, 'hidden-xs', s.nonBreakPointScreen)}>
        <button
            noLink
            onClick={() => { this.handleOpenMenu('menuLanguageDropDown'), this.setState({numberSelect:0})}}
            className={"dropbtn"}
            >
            <div className={s.currentCountryFlag}>
                <ReactCountryFlag
                countryCode={getCountryCode(currentLocale)} svg
                />
            </div>
            {formatLocale(currentLocale)}
            {isLanguageModalOpening ? <Icons.TiArrowSortedUp /> : <Icons.TiArrowSortedDown />}
             <div id='menuLanguageDropDown' className={cx(currentLocale === "ar" ? s.dropdownMenuLeft : s.dropdownMenu,'content',s.heightLanguage)}>
               <div className={s.contentMenu}>
                 <div className={s.titleMenu}>
                   <span> <FormattedMessage {...messages.chooseLanguage}/> </span>
                   <img src= {imgClose}/>
                 </div>
                  <LanguageModal/>
                </div>
              </div>
             </button>
        </li>
        <li className={cx(s.currencyMenu, 'hidden-xs', s.nonBreakPointScreen)}>
              <button
              noLink
              onClick={() =>{this.handleOpenMenu('menuCurrencyDropDown'),this.setState({numberSelect:1})}}
              className={"dropbtn"}
              >
              {showCurrencySymbol(displayCurrency, currentLocale) || displayCurrency}
              {isCurrencyModalOpening ? <Icons.TiArrowSortedUp /> : <Icons.TiArrowSortedDown />}
              <div id='menuCurrencyDropDown' className={cx(currentLocale === "ar" ? s.dropdownMenuLeft : s.dropdownMenu,'content')}>
                <div className={s.contentMenu}>
                  <div className={s.titleMenu}>
                    <span><FormattedMessage {...messages.chooseACurrency} /> </span>
                    <img src={imgClose}/>
                  </div>
                  <div className={s.heightCurrency}>
                    <CurrencyModal/>
                  </div>
                </div>
              </div>
          </button>
        </li>
      </>
    );
  }
}

const mapState = state => ({
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currentLocale: state.intl.locale,
  isLanguageModalOpening: state.modalStatus.languageModal,
  isCurrencyModalOpening: state.modalStatus.currencyModal,
});
const mapDispatch = {
  openHeaderModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(NavLinksLanguageCurrency));
