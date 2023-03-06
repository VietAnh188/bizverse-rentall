import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux Form
import { Field, reduxForm } from 'redux-form';

import {
  Grid,
  Row,
  FormGroup,
  Col,
  FormControl
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';

// Components
import Summary from './Summary';
import DetailsForHost from './DetailsForHost';
import DetailsForGuest from './DetailsForGuest';
import NotFound from '../../routes/notFound/NotFound';

// Helpers
import validate from './validate';
import submit from './submit';

// Locale
import messages from '../../locale/messages';

//Helpers
import { getDateRanges } from '../../helpers/dateRange';

class CancellationPolicy extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    userType: PropTypes.string.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      listId: PropTypes.number.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      basePrice: PropTypes.number.isRequired,
      cleaningPrice: PropTypes.number.isRequired,
      guestServiceFee: PropTypes.number.isRequired,
      hostServiceFee: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      reservationState: PropTypes.string.isRequired,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        country: PropTypes.string,
        listingData: PropTypes.shape({
          cancellation: PropTypes.shape({
            id: PropTypes.number.isRequired,
            policyName: PropTypes.string.isRequired,
            priorDays: PropTypes.number.isRequired,
            accommodationPriorCheckIn: PropTypes.number.isRequired,
            accommodationBeforeCheckIn: PropTypes.number.isRequired,
            accommodationDuringCheckIn: PropTypes.number.isRequired,
            guestFeePriorCheckIn: PropTypes.number.isRequired,
            guestFeeBeforeCheckIn: PropTypes.number.isRequired,
            guestFeeDuringCheckIn: PropTypes.number.isRequired,
          })
        })
      }),
      messageData: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
      hostData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        picture: PropTypes.string
      }),
      guestData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        picture: PropTypes.string,
      }),
    })
  };

  static defaultProps = {
    data: {
      checkIn: null,
      checkOut: null
    }
  };

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  calculateCancellation(interval, nights) {
    const { data, data: { listData: { listingData } } } = this.props;

    let accomodation, guestFees, remainingNights, policyName, priorDays, policyId, cancellation, nonRefundableNights, type = 'priorCheckIn';
    cancellation = data && data.cancellation ? data && data.cancellation : listingData && listingData.cancellation;

    let cancellationRuleObj = {
      accomodation,
      guestFees,
      nonRefundableNights,
      priorDays,
      policyName,
      remainingNights,
      interval,
      nights,
    }

    if (interval > cancellation.priorDays) {
      type = 'priorCheckIn'
    } else if (interval <= cancellation.priorDays && interval > 0) {
      type = 'beforeCheckIn'
    } else {
      type = 'duringCheckIn'
    }

    if (type == 'priorCheckIn') {
      cancellationRuleObj = {
        accomodation: cancellation.accommodationPriorCheckIn,
        guestFees: cancellation.guestFeePriorCheckIn,
        nonRefundableNights: cancellation.nonRefundableNightsPriorCheckIn,
        priorDays: cancellation.priorDays,
        policyName: cancellation.policyName,
        interval,
        nights,
        cleaningFeePercent: 100
      }
    } else if (type == 'beforeCheckIn') {
      cancellationRuleObj = {
        accomodation: cancellation.accommodationBeforeCheckIn,
        guestFees: cancellation.guestFeeBeforeCheckIn,
        nonRefundableNights: cancellation.nonRefundableNightsBeforeCheckIn,
        priorDays: cancellation.priorDays,
        policyName: cancellation.policyName,
        interval,
        nights,
        cleaningFeePercent: 100
      }
      // if (cancellation.id === 3) cancellationRuleObj['cleaningFeePercent'] = 0;
    } else {
      cancellationRuleObj = {
        accomodation: cancellation.accommodationDuringCheckIn,
        guestFees: cancellation.guestFeeDuringCheckIn,
        nonRefundableNights: cancellation.nonRefundableNightsDuringCheckIn,
        priorDays: cancellation.priorDays,
        policyName: cancellation.policyName,
        //If interval is zero, then check-in date is today
        //If interval is not zero, it should be negative value. To include check in date, subtract 1 from the nights.
        remainingNights: (nights - 1) + interval,
        interval,
        nights,
        cleaningFeePercent: 0
      }
    }

    return { cancellationRuleObj };
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { userType, data, data: { guestData, hostData, messageData, listData, refundData } } = this.props;
    let cancelData = {}, placeholder;

    const { nights, interval } = getDateRanges({ checkIn: data.checkIn, checkOut: data.checkOut, country: listData.country });

    //(-interval) < (nights - 1) Block if the (current date) is equal or greater than the (one day before checkout date)

    if (guestData && hostData && messageData && listData && data.checkIn && data.checkOut && (-interval) < (nights - 1)) {
      cancelData = this.calculateCancellation(interval, nights);
      const { handleSubmit, submitting, error, pristine } = this.props;
      if (userType === 'host') {
        placeholder = formatMessage(messages.cancellationNote) + ' ' + guestData.firstName + ' ' + formatMessage(messages.cancellationNoteForHost);
      } else {
        placeholder = formatMessage(messages.cancellationNote) + ' ' + hostData.firstName + ' ' + formatMessage(messages.cancellationNoteForGuest);
      }
      return (
        <div>
          <Grid>
            <Row className={s.landingContaiconfirmationCodener}>
              <form onSubmit={handleSubmit(submit)}>
                <Col xs={12} sm={7} md={7} lg={7} >
                  <div className={cx(s.cancelLeftBg, s.bizverseBox, s.bizverseBoxSecondary)}>
                    <Summary
                      userType={userType}
                      firstName={userType === 'host' ? guestData.firstName : hostData.firstName}
                      guests={data.guests}
                      nights={nights}
                      interval={interval}
                      cancelData={cancelData && cancelData.cancellationRuleObj || {}}
                    />
                    <Field
                      className={cx(s.textareaInput, s.bizverseBox, s.bizverseBoxSecondary)}
                      name="message"
                      component={this.renderFormControlTextArea}
                      label={placeholder}
                    />
                    <p className={cx(s.landingStep, s.space3)}>
                      <span><FormattedMessage {...messages.reservationCancel} /></span>
                    </p>
                  </div>
                </Col>
                {
                  userType === 'host' && <DetailsForHost
                    userType={userType}
                    firstName={guestData.firstName}
                    guestEmail={guestData.userData.id}
                    hostName={hostData.firstName}
                    profileId={guestData.profileId}
                    picture={guestData.picture}
                    checkIn={data.checkIn}
                    checkOut={data.checkOut}
                    guests={data.guests}
                    title={listData.title}
                    listId={data.listId}
                    basePrice={data.basePrice}
                    cleaningPrice={data.cleaningPrice}
                    guestServiceFee={data.guestServiceFee}
                    hostServiceFee={data.hostServiceFee}
                    total={data.total}
                    currency={data.currency}
                    cancelData={cancelData}
                    reservationId={data.id}
                    threadId={data.messageData.id}
                    confirmationCode={data.confirmationCode}
                    holdeData={data}
                    taxRate={data.taxRate}
                    interval={interval}
                    hostServiceFeeType={data.hostServiceFeeType}
                    hostServiceFeeValue={data.hostServiceFeeValue}
                    isSpecialPriceAverage={data.isSpecialPriceAverage}
                    discount={data.discount ? data.discount : 0}
                    refundData={refundData}
                  />
                }
                {
                  userType === 'guest' && <DetailsForGuest
                    userType={userType}
                    firstName={hostData.firstName}
                    hostEmail={hostData.userData.id}
                    guestName={guestData.firstName}
                    profileId={hostData.profileId}
                    picture={hostData.picture}
                    checkIn={data.checkIn}
                    checkOut={data.checkOut}
                    guests={data.guests}
                    title={listData.title}
                    listId={data.listId}
                    basePrice={data.basePrice}
                    cleaningPrice={data.cleaningPrice}
                    guestServiceFee={data.guestServiceFee}
                    hostServiceFee={data.hostServiceFee}
                    total={data.total}
                    currency={data.currency}
                    cancelData={cancelData}
                    reservationId={data.id}
                    threadId={data.messageData.id}
                    confirmationCode={data.confirmationCode}
                    discount={data.discount ? data.discount : 0}
                    holdeData={data}
                    taxRate={data.taxRate}
                    interval={interval}
                    hostServiceFeeType={data.hostServiceFeeType}
                    hostServiceFeeValue={data.hostServiceFeeValue}
                    isSpecialPriceAverage={data.isSpecialPriceAverage}
                    paymentState={data.paymentState}
                    refundData={refundData}
                  />
                }
              </form>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return <NotFound />
    }

  }
}

CancellationPolicy = reduxForm({
  form: 'CancellationForm', // a unique name for this form
  validate,
  onSubmit: submit
})(CancellationPolicy);

export default injectIntl(withStyles(s)(CancellationPolicy));
