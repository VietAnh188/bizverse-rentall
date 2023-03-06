// General
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { setLocale } from '../../actions/intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './LanguageModal.css';

import { closeHeaderModal } from '../../actions/modalActions';
import { formatLocale, getCountryCode, isRTL } from '../../helpers/formatLocale';
import ReactCountryFlag from 'react-country-flag';

class LanguageModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(value) {
    const { setLocale, closeHeaderModal, currentLocale } = this.props;
    const isRtlLocale = value && isRTL(value) || false;
    await closeHeaderModal('languageModal');

    if (isRtlLocale) {
      // Adding Bootstrap RTL style link
      var headID = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.id = 'rtl-style'
      link.href = '/css/app-rtl.min.css';
      headID.appendChild(link);
      // Add "rtl" class name to the body element
      document.body.classList.add(`rtl`);
    } else if (isRTL(currentLocale) && !isRtlLocale) {
      // Remove RTL stylesheet Link element
      let rtlStyleElement = document.getElementById('rtl-style');
      rtlStyleElement.parentNode.removeChild(rtlStyleElement);
      // Remove the RTL classname from the body element
      let bodyElement = document.body;
      bodyElement.className = bodyElement.className.replace(/\brtl\b/g, "");
    }

    // Update the locale
    setLocale({ locale: value });
    // Update Moment locale
    moment.defineLocale(value + '-dup', {
      parentLocale: isRTL(value) ? value : 'en',
      preparse: function (string) {
        return string;
      },
      postformat: function (string) {
        return string;
      }
    });
  }

  render() {
    const { currentLocale, availableLocales, closeHeaderModal } = this.props;
    let localeList = availableLocales && availableLocales.filter(o => o !== currentLocale);
    
    return (
      <div>
        <div className={cx(s.mainSection, s.responsiveLanguage)}>
          <div className={cx(currentLocale==="ar" ?s.activeItemRight : s.activeItem, s.activeSection)}>
            <div className={s.currentCountryFlagMenu}>
              <ReactCountryFlag countryCode={getCountryCode(currentLocale)} svg />
            </div>
            {formatLocale(currentLocale)}
          </div>
        </div>
        {
          localeList && localeList.length > 0 && localeList.map((item, key) => {
            return (
              <div key={key} onClick={() => this.handleChange(item)} className={cx(s.mainSection, s.responsiveLanguage)}>
                <div className={cx(currentLocale==="ar" ?s.activeItemRight : s.activeItem)}>
                  <div className={s.itemCountryFlagMenu}>
                    <ReactCountryFlag countryCode={getCountryCode(item)} svg />
                  </div>
                  {formatLocale(item)}
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

const mapState = state => ({
  availableLocales: state.runtime.availableLocales,
  currentLocale: state.intl.locale
});

const mapDispatch = {
  setLocale,
  closeHeaderModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(LanguageModal));