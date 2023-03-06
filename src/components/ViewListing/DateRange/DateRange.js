import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';

// Redux
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

// Redux Action
import { change } from 'redux-form';
import { checkAvailability } from '../../../actions/checkAvailability';

import { getSpecialPricingData } from '../../../actions/Listing/getSpecialPricingData';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

//Helper
import { isRTL } from '../../../helpers/formatLocale';
import { getDateUsingTimeZone } from '../../../helpers/dateRange';
class DateRange extends React.Component {
  static propTypes = {
    minimumNights: PropTypes.number.isRequired,
    maximumNights: PropTypes.number.isRequired,
    checkAvailability: PropTypes.any.isRequired,
    blockedDates: PropTypes.array.isRequired,
    listId: PropTypes.number.isRequired,
    formName: PropTypes.string.isRequired,
    maxDaysNotice: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
    country: PropTypes.string.isRequired
  };

  static defaultProps = {
    blockedDates: [],
    maxDaysNotice: 'unavailable',
    country: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      blockedDates: [],
      blockedDatesValues: [],
      enableCheckoutDay: false
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
  }
  componentDidMount() {
    const { bookingStartDate, bookingEndDate, blockedDates, contactStartDate, contactEndDate } = this.props;
    const { formName } = this.props;
    const blockedDatesSet = new Set();

    if (formName == 'BookingForm') {
      if (bookingStartDate && bookingEndDate) {
        this.setState({
          startDate: moment(bookingStartDate),
          endDate: moment(bookingEndDate)
        });
      }
    }

    if (formName == 'ContactHostForm') {
      if (contactStartDate && contactEndDate) {
        this.setState({
          startDate: moment(contactStartDate),
          endDate: moment(contactEndDate)
        });
      }
    }

    blockedDates.forEach(day => {
      if (day.calendarStatus) {
        if (day.calendarStatus != 'available') {
          blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
        }
      } else {
        blockedDatesSet.add(moment(day).format('YYYY-MM-DD'));
      }
    });

    this.setState({ blockedDatesSet });
    this.setState({ blockedDatesValues: blockedDates });
  }

  componentWillReceiveProps(nextProps) {
    const { bookingStartDate, bookingEndDate, contactStartDate, contactEndDate } = nextProps;
    const { formName } = nextProps;

    if (formName == 'BookingForm') {
      if (bookingStartDate && bookingEndDate) {
        this.setState({
          startDate: moment(bookingStartDate),
          endDate: moment(bookingEndDate)
        });
      }
    }

    if (formName == 'ContactHostForm') {
      if (contactStartDate && contactEndDate) {
        this.setState({
          startDate: moment(contactStartDate),
          endDate: moment(contactEndDate)
        });
      }
    }

    // blockedDates.forEach(day => {
    //   if (day.calendarStatus != 'available') {
    //     blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
    //   }
    // });

    // this.setState({ blockedDatesSet });
  }

  async onDatesChange({ startDate, endDate }) {
    //const { focusedInput } = this.state;
    const { focusedInput, blockedDatesSet, blockedDatesValues } = this.state;
    const { listId, formName, checkAvailability, change, maximumNights, minimumNights } = this.props;
    const { getSpecialPricingData, onBookingDatesChange } = this.props;
    const startDateString = moment(startDate).format('YYYY-MM-DD')
    const endDateString = moment(endDate).format('YYYY-MM-DD')

    this.setState({ startDate, endDate });
    await change(formName, 'startDate', startDate);
    await change(formName, 'endDate', endDate);
    if ((focusedInput === END_DATE || focusedInput === START_DATE) && endDate) {
      await getSpecialPricingData(listId, startDateString, endDateString);
      await checkAvailability(listId, startDateString, endDateString, maximumNights, minimumNights);


      if (onBookingDatesChange) {
        onBookingDatesChange({ listId, checkIn: startDateString, checkOut: endDateString })
      }
    }
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
    
    if (focusedInput === END_DATE) {
      this.setState({
        enableCheckoutDay: true
      })
    } else {
      this.setState({
        enableCheckoutDay: false
      })
    }
  }

  isDayBlocked(day) {
    const { blockedDatesSet, startDate, enableCheckoutDay } = this.state;
    const currentDay = moment(day).format('YYYY-MM-DD');

    if (startDate && enableCheckoutDay) {

      const isBefore = moment(currentDay).isBefore(startDate)

      if (isBefore) {
        return true;
      }

      const listDates = Array.from(blockedDatesSet)

      return listDates.some(blockedDay => {
        const isBetween = moment(blockedDay).isBetween(moment(startDate).format('YYYY-MM-DD'), currentDay)
        
        return isBetween
      })
    }

    return blockedDatesSet && blockedDatesSet.has(currentDay);
  }

  render() {
    const { focusedInput, startDate, endDate, blockedDatesSet } = this.state;
    const { minimumNights, maximumNights, blockedDates, maxDaysNotice, locale, country } = this.props;
    const { formatMessage } = this.props.intl;
    let condition, maximumEndDate;
    let today = getDateUsingTimeZone(country, false);
    let breakPoint = getDateUsingTimeZone(country, false);

    if (maxDaysNotice === 'unavailable') {
      condition = day =>
        !isInclusivelyAfterDay(day, today) ||
        isInclusivelyAfterDay(day, today)
    } else {
      if (maxDaysNotice === '3months') {
        breakPoint.add(3, 'months');
      } else if (maxDaysNotice === '6months') {
        breakPoint.add(6, 'months');
      } else if (maxDaysNotice === '9months') {
        breakPoint.add(9, 'months');
      } else if (maxDaysNotice === '12months') {
        breakPoint.add(12, 'months');
      }
      if (maxDaysNotice !== 'available') {
        condition = day =>
          !isInclusivelyAfterDay(day, today) ||
          isInclusivelyAfterDay(day, breakPoint)
      } else if (maxDaysNotice == 'available') {
        condition = day => !isInclusivelyAfterDay(day, today)
      }
    }

    return (
      <div>
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          numberOfMonths={1}
          startDatePlaceholderText={formatMessage(messages.checkIn)}
          endDatePlaceholderText={formatMessage(messages.checkOut)}
          startDateId={'It is Start date id'}
          endDateId={'It is Start date id'}
          minimumNights={minimumNights > 0 ? minimumNights : 1}
          isDayBlocked={day => this.isDayBlocked(day)}
          isOutsideRange={day => condition(day) || this.isDayBlocked(day)}
          hideKeyboardShortcutsPanel
          readOnly
          transitionDuration={0}
          anchorDirection={isRTL(locale) ? 'right' : 'left'}
          isRTL={isRTL(locale)}
          displayFormat="DD/MM/YYYY"
        />
      </div>
    );
  }
}

const bookingFormSelector = formValueSelector('BookingForm');
const contactFormSelector = formValueSelector('ContactHostForm');

const mapState = state => ({
  isLoading: state.viewListing.isLoading,
  availability: state.viewListing.availability,
  bookingStartDate: bookingFormSelector(state, 'startDate'),
  bookingEndDate: bookingFormSelector(state, 'endDate'),
  contactStartDate: contactFormSelector(state, 'startDate'),
  contactEndDate: contactFormSelector(state, 'endDate'),
  locale: state.intl.locale
});

const mapDispatch = {
  checkAvailability,
  change,
  getSpecialPricingData
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DateRange)));
