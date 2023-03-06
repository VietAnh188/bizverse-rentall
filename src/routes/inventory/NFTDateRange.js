import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { DateRangePicker } from 'react-dates';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

// Redux  Action
import { setPersonalizedValues } from '../../actions/personalized';

// Locale
import messages from '../../locale/messages';
import { isRTL } from '../../helpers/formatLocale';

class NFTDateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null
    };
  }

  handleOnFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput } = this.state;
    const { formatMessage } = this.props.intl;
    const { locale, onDatesChange, startDate, endDate } = this.props;

    return (
      <DateRangePicker
        onDatesChange={onDatesChange}
        onFocusChange={this.handleOnFocusChange}
        focusedInput={focusedInput}
        startDate={startDate ? moment(startDate) : null}
        endDate={endDate ? moment(endDate) : null}
        numberOfMonths={1}
        startDatePlaceholderText={formatMessage(messages.checkIn)}
        endDatePlaceholderText={formatMessage(messages.checkOut)}
        hideKeyboardShortcutsPanel
        readOnly
        startDateId={'startDateId'}
        endDateId={'endDateId'}
        transitionDuration={0}
        anchorDirection={isRTL(locale) ? 'right' : 'left'}
        isRTL={isRTL(locale)}
        displayFormat="DD/MM/YYYY"
      />
    );
  }
}

const mapState = state => ({
  personalized: state.personalized,
  locale: state.intl.locale
});

const mapDispatch = {
  setPersonalizedValues,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(NFTDateRange)));
