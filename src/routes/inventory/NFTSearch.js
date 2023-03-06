import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

// Styles
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Inventory.css';

// Locale
import messages from '../../locale/messages';

class NFTSearch extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.search !== nextProps.search
  }

  render() {
    const { intl: { formatMessage }, onChange, search } = this.props;

    return (
        <div className={cx(s.searchContainer)}>
            <div className={s.searchWrapper}>
            <div className={cx(s.displayTableCell, s.searchIconContainer, 'searchIconContainerrtl')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M16 14.7726C16 15.0956 15.8708 15.3971 15.6339 15.6339C15.397 15.8708 15.0956 16 14.7725 16C14.428 16 14.148 15.8708 13.9112 15.6339L10.5949 12.3392C9.45357 13.1359 8.18304 13.5451 6.76178 13.5451C5.8358 13.5451 4.97443 13.3728 4.13459 13.0067C3.29475 12.6407 2.58412 12.1669 1.98116 11.5639C1.3782 10.961 0.904441 10.2288 0.538358 9.41051C0.172275 8.5922 0 7.68776 0 6.76178C0 5.83581 0.172275 4.97443 0.538358 4.13459C0.904441 3.29475 1.3782 2.58412 1.98116 1.98116C2.58412 1.3782 3.31629 0.904442 4.13459 0.538359C4.95289 0.172275 5.85733 0 6.76178 0C7.68775 0 8.54912 0.172275 9.38896 0.538359C10.2288 0.904442 10.9394 1.3782 11.5424 1.98116C12.1454 2.58412 12.6191 3.31629 12.9852 4.13459C13.3513 4.97443 13.5236 5.85734 13.5236 6.76178C13.5236 8.16152 13.1359 9.45358 12.3392 10.5949L15.6339 13.8896C15.8708 14.1481 16 14.428 16 14.7726ZM9.79811 9.81966C10.638 8.97982 11.0686 7.96771 11.0686 6.76178C11.0686 5.55586 10.638 4.56528 9.79811 3.72544C8.95828 2.8856 7.94616 2.45491 6.76178 2.45491C5.57739 2.45491 4.56528 2.8856 3.72544 3.72544C2.8856 4.56528 2.45491 5.57739 2.45491 6.76178C2.45491 7.94617 2.8856 8.95829 3.72544 9.79812C4.56528 10.638 5.57739 11.0687 6.76178 11.0687C7.94616 11.0687 8.95828 10.6595 9.79811 9.81966Z" fill="url(#paint0_linear_1760_679)"/>
                  <defs>
                    <linearGradient id="paint0_linear_1760_679" x1="0.754717" y1="-6.4725e-06" x2="17.1798" y2="1.32008" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#3C67FE"/>
                      <stop offset="1" stop-color="#9153F5"/>
                    </linearGradient>
                  </defs>
                </svg>
            </div>
            <div className={s.displayTableCell}>
                <input defaultValue={search} onChange={event => onChange(event.target.value)} className={s.searchInput} placeholder={formatMessage(messages.search)} />
            </div>
            </div>        
        </div>
    );
  }
}

export default injectIntl(withStyles(s)(NFTSearch));
