import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Page.css';
import cx from "classnames";
import Safety from '../Safety/Safety';
import Travel from '../Travel/Travel';
import Help from '../Help/Help';
import TermsPrivacy from '../TermsPrivacy/TermsPrivacy';
import About from '../About/About';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../locale/messages';


class Page extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  };

  render() {
    const { title, html } = this.props;
    let addClass = 'ql-editor frontend';
    let isPageSafety = title && title === 'Trust & Safety';
    let isPageTravel = title && title === 'Travel Credit';
    let isPageHelp = title && title === 'Help';
    let isPageTerms = title && title === 'Terms & Privacy';
    let isPageAbout = title && title === 'About Us';

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.titlePage}>
            {isPageTravel && <FormattedMessage {...messages.travelCredit}/>}
            {isPageSafety && <FormattedMessage {...messages.trustSafety}/>}
            {isPageHelp && <FormattedMessage {...messages.help}/>}
            {isPageTerms && <FormattedMessage {...messages.termsPrivacy}/>}
            {isPageAbout && <FormattedMessage {...messages.about}/>}
          </h1>
          {
            isPageSafety && <Safety/>
          }
          {
            isPageTravel && <Travel/>
          }
          {
            isPageHelp && <Help/>
          }
          {
            isPageTerms && <TermsPrivacy/> 
          }
          {
            isPageAbout && <About/>
            // <div className={cx(addClass,s.colorTextHelpPage)}
            // dangerouslySetInnerHTML={{ __html: html }}
            // />
          }
          
        </div>
      </div>
    );
  }
}

export default (injectIntl, withStyles(s))(Page);
