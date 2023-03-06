// General
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Redux Action
import { choseToCurrency } from '../../actions/getCurrencyRates';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CurrencyModal.css';

import { showCurrencySymbol } from '../../helpers/currencyConvertion';
import { closeHeaderModal } from '../../actions/modalActions';

class CurrencyModal extends React.Component {

  static propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isBaseCurrency: PropTypes.bool
    })).isRequired,
    baseCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string,
    choseToCurrency: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    const { choseToCurrency, closeHeaderModal } = this.props;
    choseToCurrency(value);
    closeHeaderModal('currencyModal');
  }

  render() {
    const { currencies, baseCurrency, toCurrency, currentLocale, closeHeaderModal } = this.props;
    let targetCurrency;
    if (toCurrency) {
      targetCurrency = toCurrency;
    } else {
      targetCurrency = baseCurrency;
    }
    let currencyList = currencies && currencies.filter(o => o.symbol !== targetCurrency) || [];

    return (
      <div>
        <div className={cx(s.mainSection, s.responsiveCurrency)}>
          <div className={cx(currentLocale === "ar" ? s.activeItemCurrencyRight : s.activeItemCurrency, s.activeSection)}>
            <div>
              {targetCurrency}
            </div>
            <div>
              {showCurrencySymbol(targetCurrency, currentLocale)} 
            </div>
          </div>
        </div>
        {
          currencyList && currencyList.length > 0 && currencyList.map((item, index) => {
            return (
              <div key={index} onClick={() => this.handleChange(item.symbol)} className={cx(s.mainSection, s.responsiveCurrency)}>
                <div className={cx(currentLocale === "ar" ? s.activeItemCurrencyRight : s.activeItemCurrency)}>
                  <div>
                      {item.symbol}
                  </div>
                  <div>
                    {showCurrencySymbol(item.symbol, currentLocale)}
                  </div>
                 
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  currencies: state.currency.availableCurrencies,
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currentLocale: state.intl.locale
});

const mapDispatch = {
  choseToCurrency,
  closeHeaderModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(CurrencyModal));
