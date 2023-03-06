import React from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import { formValueSelector, initialize, submit } from 'redux-form';

import {
  Row,
  Col,
  Panel,
  FormGroup,
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';
import bt from '../../components/commonStyle.css';

// Components
import Link from '../Link';
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';

// Locale
import messages from '../../locale/messages';

// Images
import defaultPic from '../../../public/SiteImages/large_no_image.jpeg';

import { calculateHostCancellation, getPriceWithDiscount } from '../../helpers/cancellationData';

// config
import * as config from '../../config'

class DetailsForHost extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    reservationId: PropTypes.number.isRequired,
    confirmationCode: PropTypes.number.isRequired,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    hostName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number.isRequired,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    cancelData: PropTypes.shape({
      policyName: PropTypes.string,
      accomodation: PropTypes.number,
      guestFees: PropTypes.number,
      remainingNights: PropTypes.number,
      interval: PropTypes.number,
      nights: PropTypes.number,
    }).isRequired,
    message: PropTypes.string,
    initialize: PropTypes.any,
    submit: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  async handleCancel(cancellationData) {
    const { initialize, submit } = this.props;
    await initialize('CancellationForm', cancellationData, true);
    await submit('CancellationForm');
  }

  render() {
    const { reservationId, userType, firstName, guestEmail, checkIn, checkOut, guests, title, listId, picture, profileId, hostName } = this.props;
    const { discount, basePrice, cleaningPrice, guestServiceFee, hostServiceFee, total, currency, threadId, confirmationCode, isSpecialPriceAverage } = this.props;
    const { cancelData: { cancellationRuleObj: { policyName, interval, nights, nonRefundableNights } } } = this.props;
    const { message, holdeData, hostServiceFeeType, hostServiceFeeValue, refundData } = this.props;
    const { formatMessage } = this.props.intl;
    let checkInDate = checkIn != null ? moment(checkIn).format('Do MMM YYYY') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('Do MMM YYYY') : '';
    let totalNights = 0;
    let isDisabled = true;

    let coverImage = holdeData && holdeData.listData && holdeData.listData.listPhotos.find(o => o.id == holdeData.listData.coverPhoto);

    let path = config.AWS_SERVICE_URL +'images/upload/x_medium_';
    let showImage;
    if (coverImage) {
      showImage = path + coverImage.name;
    } else if (!coverImage && holdeData.listData && holdeData.listData.listPhotos.length > 0) {
      showImage = path + (holdeData.listData && holdeData.listData.listPhotos[0].name);
    } else {
      showImage = defaultPic;
    }

    let isCleaingPrice = 0
    if (cleaningPrice) {
      isCleaingPrice = cleaningPrice;
    } else {
      isCleaingPrice = 0;
    }

    let bookingSpecialPricing = [], isSpecialPriceAssigned = false;
    let priceForDays = 0, totalPrice = 0;

    holdeData.bookingSpecialPricing && holdeData.bookingSpecialPricing.map((item, key) => {
      let pricingRow, currentPrice;
      if (item.blockedDates) {
        isSpecialPriceAssigned = true;
        currentPrice = Number(item.isSpecialPrice);
      } else {
        currentPrice = Number(basePrice);
      }
      pricingRow = {
        blockedDates: item,
        isSpecialPrice: currentPrice,
      };
      bookingSpecialPricing.push(pricingRow);
    })

    if (isSpecialPriceAssigned) {
      bookingSpecialPricing.map((item, index) => {
        priceForDays = Number(priceForDays) + Number(item.isSpecialPrice);
      });
    } else {
      priceForDays = Number(basePrice) * Number(nights - nonRefundableNights)
    }

    totalPrice = getPriceWithDiscount({ basePrice: (isSpecialPriceAverage || basePrice), discount, nights });

    // Refund, payout data
    const { 
      missedEarning, 
      remainingNights, 
      payoutToHost, 
      refundToGuest, 
      guestServiceFee: guestServiceFeeValue, 
      hostServiceFee: valueOfHostServiceFee,
      total: totalValue
    } = refundData || {};

    const {
      refundDays,
    } = calculateHostCancellation({
      total,
      basePrice: totalPrice,
      isCleaingPrice,
      nights,
      // remainingNights,
      guestServiceFee,
      hostServiceFee,
      hostServiceFeeType,
      hostServiceFeeValue,
      interval
    })

    let cancellationData = {
      reservationId,
      cancellationPolicy: policyName,
      refundToGuest,
      payoutToHost,
      guestServiceFee: guestServiceFeeValue,
      hostServiceFee: valueOfHostServiceFee,
      total: totalValue,
      currency,
      threadId,
      cancelledBy: 'host',
      checkIn,
      checkOut,
      guests,
      hostName,
      guestName: firstName,
      listTitle: title,
      confirmationCode,
      guestEmail,
      userType
    };
    if (message) {
      isDisabled = false;
    }

    totalNights = nights - refundDays;

    return (
      <div>
        <Col xs={12} sm={5} md={5} lg={5}>
          <div className={s.bgCover}>
            <a href={"/rooms/" + listId} target="_blank" rel="noreferrer">
              <div className={s.cancelBg} style={{ backgroundImage: `url(${showImage})` }}>
              </div>
            </a>
          </div>
          <Panel className={cx(s.panelHeader, s.bizverseBox, s.bizverseBoxSecondary)}>
            <Row>
              <Col xs={8} sm={8} md={8} lg={8} >
                <div className={s.textTruncate}>
                  <span className={cx(s.textHigh, s.textBold)}>{firstName}</span><br />
                  {/* <Link to={"/rooms/" + listId}> */}
                  <a href={"/rooms/" + listId} target="_blank" rel="noreferrer">
                    {title}
                  </a>
                  {/* </Link> */}
                </div>
                <br />

              </Col>
              <Col xs={4} sm={4} md={4} lg={4} className={s.textRight}>
                <div className={s.profileAvatarSection}>
                  <Avatar
                    source={picture}
                    height={65}
                    width={65}
                    title={firstName}
                    className={s.profileAvatar}
                    withLink
                    linkClassName={s.profileAvatarLink}
                    profileId={profileId}
                  />
                </div>
              </Col>
              <Col xs={12} sm={8} md={8} lg={8} >
                <div>
                  <span>{checkInDate} - {checkOutDate}</span>
                </div>
              </Col>
            </Row>
            <div className={cx(s.sectionSplitter)} />
            {
              remainingNights > 0 && missedEarning > 0 && <Row>
                <Col xs={6} sm={6} md={6} lg={6} className={cx(s.textLeft, 'textAlignRightRtl')}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <FormattedMessage {...messages.missedEarnings} />
                  </span><br />
                  <div className='directionLtr'>
                    <span>
                      <CurrencyConverter
                        amount={totalPrice}
                        from={currency}
                      />
                    </span><span> {' x'} {remainingNights} {remainingNights > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</span>
                  </div><br />
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textRight}>
                  <span className={cx(s.textHigh, s.textBold, s.textLine)}>
                    <CurrencyConverter
                      amount={missedEarning}
                      from={currency}
                    />
                  </span>
                </Col>
              </Row>
            }
            {
              payoutToHost > 0 && <Row>
                <Col xs={6} sm={6} md={6} lg={6} className={cx(s.textLeft, 'textAlignRightRtl')}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <FormattedMessage {...messages.earnings} />
                  </span><br />
                  <span>
                    <CurrencyConverter
                      amount={totalPrice}
                      from={currency}
                    />
                  </span>
                  {totalNights > 0 && <span> x {totalNights} {formatMessage(messages[totalNights > 1 ? 'nights' : 'night'])},</span>}
                  <br />
                  {/* <span><FormattedMessage {...messages.cleaningPlusServiceFee} /></span> */}
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textRight}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <CurrencyConverter
                      amount={payoutToHost}
                      from={currency}
                    />
                  </span>
                </Col>
              </Row>
            }
            {payoutToHost > 0 && <div className={cx(s.space3, s.spaceTop3)}>
              <p className={cx(s.landingStep)}>
                <span>{firstName}{' '}
                  <FormattedMessage {...messages.willBeRefund} />{' '}{' '}
                  <FormattedMessage {...messages.reservationCost} />
                </span>
              </p>
            </div>}
            <div className={s.cancellation}>
              <a href={'/cancellation-policies/' + policyName} target="_blank" rel="noreferrer"><FormattedMessage {...messages.cancellationPolicy} />: <span className={s.bizverseLink}>{policyName}</span></a>
            </div>
          </Panel>
        </Col>
        <Col xs={12} sm={12} lg={12} md={12}>
          <hr className={cx(s.horizontalLineThrough, s.spaceTop4)} />
        </Col>
        <FormGroup className={s.formGroup}>
          <Col xs={12} sm={12} md={7} lg={7}>
            <Link
              className={cx(s.button, s.bizverseButtonSecondary, bt.btnLarge, s.pullLeft, s.btnWidth)}
              to={"/reservation/current"}
            >
              <FormattedMessage {...messages.keepReservation} />
            </Link>
            <Button
              className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.pullRight, s.btnWidth)}
              onClick={() => this.handleCancel(cancellationData)}
              disabled={isDisabled}
            >
              <FormattedMessage {...messages.cancelYourReservation} />
            </Button>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

const selector = formValueSelector('CancellationForm'); // <-- same as form name

const mapState = (state) => ({
  message: selector(state, 'message'),
  serviceFees: state.book.serviceFees,
  base: state && state.currency && state.currency.base,
  rates: state && state.currency && state.currency.rates
});

const mapDispatch = {
  initialize,
  submit
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(DetailsForHost)));
