import React from 'react';

// Redux
import { connect } from 'react-redux';

// Redux Action
import { change, formValueSelector } from 'redux-form';

// Import injectIntl
import { injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import { DateRangePicker } from 'react-dates';
import { isRTL } from '../../helpers/formatLocale';
class DateRange extends React.Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
            startDate: null,
            endDate: null,
            isCurrentStatus: 2,
            from: undefined,
            to: undefined,
            dateRange: [],
        };

        this.onDatesChange = this.onDatesChange.bind(this);
    }

    componentDidMount() {
        const { defaultStartDate, defaultEndDate, isCurrentStatus } = this.props;

        this.setState({
            isCurrentStatus: isCurrentStatus
        })

        if (defaultStartDate) {
            this.setState({
                startDate: moment(moment(defaultStartDate)),
            });
        }

        if (defaultEndDate) {
            this.setState({
                endDate: moment(moment(defaultEndDate)),
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { defaultStartDate, defaultEndDate, isCurrentStatus } = nextProps;
        this.setState({
            isCurrentStatus: isCurrentStatus
        })
        if (defaultStartDate) {
            this.setState({
                startDate: moment(moment(defaultStartDate)),
            });
        }

        if (defaultEndDate) {
            this.setState({
                endDate: moment(moment(defaultEndDate)),
            });
        }
    }


    async onDatesChange({ startDate, endDate }) {
        const { formName, change, startDateName, endDateName, resetCalendar } = this.props;
        const { isCurrentStatus } = this.state;
        const { onChange } = this.props;
        this.setState({ startDate, endDate });
        change(formName, 'startDate', startDate);
        change(formName, 'endDate', endDate);
        await resetCalendar();
    }

    onFocusChange = (focusedInput) => {
        this.setState({ focusedInput });
    }


    render() {
        const { formatMessage } = this.props.intl;
        const { locale } = this.props;
        const { focusedInput, startDate, endDate, isCurrentStatus } = this.state;
        
        let beginDay = formatMessage(messages.beginDayReservation);
        let finishDay = formatMessage(messages.finishDayReservation);

        return (
            <div>
                <DateRangePicker
                    {...this.props}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={() => this.onFocusChange(focusedInput)}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                    numberOfMonths={1}
                    startDatePlaceholderText={beginDay}
                    endDatePlaceholderText={finishDay}
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

const selector = formValueSelector('ListPlaceStep3');

const mapState = (state) => ({
    defaultStartDate: selector(state, 'startDate'),
    defaultEndDate: selector(state, 'endDate'),
    locale: state.intl.locale
});

const mapDispatch = {
    change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DateRange)));


