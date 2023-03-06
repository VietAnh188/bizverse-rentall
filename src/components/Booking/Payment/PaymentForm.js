import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment'

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';

import {
  Row,
  FormGroup,
  Col,
  FormControl
} from 'react-bootstrap';

// Stripe
import {
  injectStripe,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from 'react-stripe-elements';
import { toastr } from 'react-redux-toastr';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import bt from '../../../components/commonStyle.css';

// Helpers
import validate from './validate';
import fetch from '../../../core/fetch';
import { PAYPAL_NOT_SUPPORT_CURRENCIES } from '../../../constants/currency';

// Constants
import { paymentMethods } from '../../../config';

// Component
import HouseRules from './HouseRules';
import Loader from '../../Loader';
import Link from '../../Link';
import OneFinTransactionMethods from './OneFinTransactionMethods';

// Locale
import messages from '../../../locale/messages';
import { makePayment } from '../../../actions/booking/makePayment';
import { makePaymentLater } from '../../../actions/booking/makePaymentLater';
import { requestOneFinPayment } from '../../../actions/booking/requestOneFinPayment';
import { requestOneFinPaymentLater } from '../../../actions/booking/requestOneFinPaymentLater';
import { processCardAction } from '../../../actions/PaymentIntent/processCardAction';
import { createReservation } from '../../../actions/booking/createReservation';

//Images 
import imageOne from '../../../../public/SiteIcons/payment-icons.png';
import imageTwo from '../../../../public/SiteIcons/stripe-connect.png';

import { isRTL } from '../../../helpers/formatLocale'
import history from '../../../core/history';

// config
import * as config from '../../../config'

const createOptions = () => {
  return {
    style: {
      base: {
        color: 'black',
        fontWeight: 400,
        //fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
        fontFamily: 'inherit',
        fontSize: '14px',
        fontSmoothing: 'antialiased',
        ':focus': {
          color: 'black',
        },

        '::placeholder': {
          color: '#aaa',
          fontSize: '13px'
        },

        ':focus::placeholder': {
          color: '#aaa',
        },
      },
      invalid: {
        color: 'black',
        ':focus': {
          color: 'black',
        },
        '::placeholder': {
          color: '#aaa',
        },
      },
    }
  }
};
class PaymentForm extends Component {
  static propTypes = {
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired
      })
    })),
    hostDisplayName: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    initialValues: PropTypes.shape({
      listId: PropTypes.number.isRequired,
      listTitle: PropTypes.string.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      checkIn: PropTypes.object.isRequired,
      checkOut: PropTypes.object.isRequired,
      guests: PropTypes.number.isRequired,
      basePrice: PropTypes.number.isRequired,
      cleaningPrice: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      weeklyDiscount: PropTypes.number,
      monthlyDiscount: PropTypes.number,
      paymentType: PropTypes.number
    }).isRequired,
    paymentCurrencyList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired
    })),
    paymentLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    paymentCurrencyList: [],
    paymentLoading: false
  };

  constructor(props) {
    super(props);
    this.state = {
      load: true,
      personCapacityData: [],
      oneFinTransactionMethod: 1,
      isPayLater: false,
      reservationId: null
    }
    this.renderpaymentCurrencies = this.renderpaymentCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChangeOneFinTransactionMethod = this.handleOnChangeOneFinTransactionMethod.bind(this);
  }

  componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        personCapacityData: listingFields.personCapacity
      });
    }

    const searchParams = new URLSearchParams(history.location.search);

    if (searchParams.has('isPayLater') && searchParams.has('reservationId')) {
      this.setState({
        isPayLater: true,
        reservationId: searchParams.get('reservationId')
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        personCapacityData: listingFields.personCapacity
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;
    const { oneFinPaymentURL } = this.props;

    if (oneFinPaymentURL) {
      window.location.href = oneFinPaymentURL;
    }

    if (locale !== prevLocale) {
      this.setState({ load: false });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => this.setState({ load: true }), 1);
    }
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className, disabled }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <FormControl disabled={disabled} componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        <FormControl
          {...input}
          type="text"
          className={className}
          componentClass="textarea"
          placeholder={label}
          id="textArea"
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        {!!error && document.getElementById("textArea") && document.getElementById("textArea").focus()}
        {!!error && document.querySelector('body').scrollTo(0,0)}
      </FormGroup>
    );
  }

  renderGuests(personCapacity) {
    const { personCapacityData, isPayLater } = this.state;
    const { guests } = this.props;
    const rows = [];

    if (isPayLater) {
      for (let i = 1; i <= personCapacity; i++) {
        if (i === guests) {
          rows.push(<option key={i} value={i}>{i} {i > 1 ? personCapacityData[0].otherItemName : personCapacityData[0].itemName}</option>);
        }
      }
    } else {
      for (let i = 1; i <= personCapacity; i++) {
        rows.push(<option key={i} value={i}>{i} {i > 1 ? personCapacityData[0].otherItemName : personCapacityData[0].itemName}</option>);
      }
    }

    return rows;
  }

  renderpaymentCurrencies() {
    const { paymentCurrencyList } = this.props;
    let rows = [];

    if (paymentCurrencyList?.length) {
      paymentCurrencyList.map((item, index) => {
        if (item.isEnable 
          && item.isPayment 
          && !PAYPAL_NOT_SUPPORT_CURRENCIES.includes(String(item.symbol).toUpperCase())
        ) {
          rows.push(<option key={index} value={item.symbol}>{item.symbol}</option>);
        }
      })
    }
    return rows;
  }

  renderFormControl = ({ input, label, type, placeholder, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={placeholder} type={type} className={className} maxLength={11} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  handleClick() {
    const { dispatch } = this.props;

    dispatch(reset('BookingForm'));
  }

  // Handle request onefin payment
  handleRequestOneFinPayment(values) {
    const { requestOneFinPayment, requestOneFinPaymentLater } = this.props;
    const { isPayLater, reservationId } = this.state;
    const amount = values.total + values.guestServiceFee
    const transactionMethodSelect = document.querySelector('input[name="oneFinTransactionMethod"]:checked');
  
    if (!!transactionMethodSelect) {
      const transactionMethod = transactionMethodSelect.value;

      if (isPayLater && reservationId) {
        requestOneFinPaymentLater({
          reservationId: Number(reservationId),
          paymentMethod: paymentMethods.ONE_FIN_PAYMENT_ID,
          convertCurrency: 'VND',
          paymentType: transactionMethod
        })
      } else {
        requestOneFinPayment({
          createReservationPayload: {
            listId: values.listId,
            hostId: values.hostId,
            guestId: values.guestId,
            checkIn: values.checkIn,
            checkOut: values.checkOut,
            guests: values.guests,
            message: values.message,
            basePrice: values.basePrice,
            cleaningPrice: values.cleaningPrice,
            currency: values.currency,
            discount: values.discount,
            discountType: values.discountType,
            guestServiceFee: values.guestServiceFee,
            hostServiceFee: values.hostServiceFee,
            total: values.total,
            bookingType: values.bookingType,
            paymentType: values.paymentType,
            specialPricing: values.bookingSpecialPricing,
            isSpecialPriceAssigned: values.isSpecialPriceAssigned,
            isSpecialPriceAverage: values.isSpecialPriceAverage,
            dayDifference: values.dayDifference,
            taxRate: values.taxRate,
            checkInStart: values.checkInStart,
            checkInEnd: values.checkInEnd,
            hostServiceFeeType: values.hostServiceFeeType,
            hostServiceFeeValue: values.hostServiceFeeValue,
          },
          requestOneFinPaymentPayload: {
            transactionMethod,
            payerId: values.guestId,
            payerEmail: values.guestEmail,
            amount,
            currency: values.currency
          }
        })
      }
    }
  }

  handleRequestPaypalStripePayment = async (values, dispatch) => {
    const { stripe, processCardAction, makePayment, makePaymentLater } = this.props;
    const { isPayLater, reservationId } = this.state;
    const isPayingLater = isPayLater && reservationId;
    const amount = values.total + values.guestServiceFee;
    let paymentType = values.paymentType;
    let paymentCurrency = values.paymentType == paymentMethods.PAYPAL_PAYMENT_ID ? values.paymentCurrency : null;
    let query = `query checkReservation ($checkIn: String,$checkOut: String,$listId: Int ){
      checkReservation(checkIn: $checkIn, checkOut:$checkOut, listId:$listId ){
        id
        listId
        hostId
        guestId
        checkIn
        checkOut
        status
      }
    }`;

    values.checkIn = moment(values.checkIn).format('YYYY-MM-DD');
    values.checkOut = moment(values.checkOut).format('YYYY-MM-DD');

    const params = {
      listId: values.listId,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
    };

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: params,
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();
    if ((data && data.checkReservation && data.checkReservation.status == "200") || isPayingLater) {
      let msg = '', paymentMethodId, createPaymentMethod;

      if (paymentType == paymentMethods.STRIPE_PAYMENT_ID) {
        createPaymentMethod = await stripe.createPaymentMethod('card', {
          card: <CardElement />,
          billing_details: {
            address: {
              postal_code: values.zipcode
            }
          }
        })

        if (createPaymentMethod && createPaymentMethod.paymentMethod) {
          paymentMethodId = createPaymentMethod.paymentMethod.id
        }
      }

      if (createPaymentMethod && createPaymentMethod.error && createPaymentMethod.error.message && paymentType == 2) {
        msg = createPaymentMethod.error.message
        toastr.error("Oops!", msg);
      } else {

        if (Number(values.paymentType) == 2 && !values.zipcode) {
          toastr.error("Oops!", 'Your Zip code is incomplete.');
          return;
        }
        
        // Payment
        let paymentResponse = {};
        if (isPayingLater) {
          paymentResponse = await makePaymentLater({
            reservationId: Number(this.state.reservationId),
            paymentCurrency,
            paymentType,
            guestEmail: values.guestEmail,
            paymentMethodId,
            title: values.listTitle,
          })
        } else {
          paymentResponse = await makePayment(
            values.listId,
            values.listTitle,
            values.hostId,
            values.guestId,
            values.checkIn,
            values.checkOut,
            values.guests,
            values.message,
            values.basePrice,
            values.cleaningPrice,
            values.currency,
            values.discount,
            values.discountType,
            values.guestServiceFee,
            values.hostServiceFee,
            values.total,
            values.bookingType,
            paymentCurrency,
            paymentType,
            values.guestEmail,
            values.bookingSpecialPricing,
            values.isSpecialPriceAssigned,
            values.isSpecialPriceAverage,
            values.dayDifference,
            paymentMethodId,
            values.taxRate,
            values.checkInStart,
            values.checkInEnd,
            values.hostServiceFeeType,
            values.hostServiceFeeValue,
          );
        }

        const { status, paymentIntentSecret, reservationId } = paymentResponse;

        if (status == 400 && paymentType == 2) {
          const cardAction = await stripe.handleCardAction(
            paymentIntentSecret,
          );
          let confirmPaymentIntentId;

          if (cardAction && cardAction.paymentIntent && cardAction.paymentIntent.id) {
            confirmPaymentIntentId = cardAction.paymentIntent.id;

            const { handleCardActionStatus, errorMessage } = await processCardAction(
              reservationId,
              values.listId,
              values.hostId,
              values.guestId,
              values.listTitle,
              values.guestEmail,
              amount,
              values.currency,
              confirmPaymentIntentId
            );

          } else {
            if (cardAction && cardAction.error && cardAction.error.message) {
              msg = cardAction.error.message;
              toastr.error("Oops!", msg);
            }
          }
        }
      }

    } else {
      toastr.error("Oops!", "Those dates are not available.");
    }
  }

  handleBookWithPayLater = async (values) => {
    const { createReservation } = this.props;
    const { isSuccess, errorMessage } = await createReservation({
      payload: {
        listId: values.listId,
        hostId: values.hostId,
        guestId: values.guestId,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        guests: values.guests,
        message: values.message,
        basePrice: values.basePrice,
        cleaningPrice: values.cleaningPrice,
        currency: values.currency,
        discount: values.discount,
        discountType: values.discountType,
        guestServiceFee: values.guestServiceFee,
        hostServiceFee: values.hostServiceFee,
        total: values.total,
        bookingType: values.bookingType,
        paymentType: Number(values.paymentType),
        specialPricing: values.bookingSpecialPricing,
        isSpecialPriceAssigned: values.isSpecialPriceAssigned,
        isSpecialPriceAverage: values.isSpecialPriceAverage,
        dayDifference: values.dayDifference,
        taxRate: values.taxRate,
        checkInStart: values.checkInStart,
        checkInEnd: values.checkInEnd,
        hostServiceFeeType: values.hostServiceFeeType,
        hostServiceFeeValue: values.hostServiceFeeValue
      }
    })

    if (isSuccess) {
      toastr.success('Success!', 'You booked success, please check your email for more detail!');

      // Redirect to trips
      setTimeout(() => {
        history.push('/trips/current');
      }, 1500)
    } else {
      toastr.error("Oops!", errorMessage);
    }
  }

  handleSubmit = async (values, dispatch) => {
    const { paymentType } = this.props;

    switch(Number(paymentType)) {
      // onefin
      case paymentMethods.ONE_FIN_PAYMENT_ID:
        this.handleRequestOneFinPayment(values);
        break;
      
      // pay later
      case paymentMethods.PAY_LATER_ID:
        this.handleBookWithPayLater(values);
        break;

      // paypal or stripe
      default:
        await this.handleRequestPaypalStripePayment(values, dispatch);
    }
  }

  handleOnChangeOneFinTransactionMethod(event) {
    const oneFinTransactionMethod = Number(event.target.value);

    this.setState({ oneFinTransactionMethod });
  }

  render() {
    const { hostDisplayName, houseRules, allowedPersonCapacity, paymentLoading, intl: { locale } } = this.props;
    const { handleSubmit, submitting, error, pristine, paymentType, stripe, canPayLater } = this.props;
    const { listId, guestPicture } = this.props;
    const { load, oneFinTransactionMethod, isPayLater } = this.state;
    const { formatMessage } = this.props.intl;
    const paymentStatus = Number(paymentType);

    let elementClasses = {
      focus: 'focused',
      empty: 'empty',
      invalid: 'invalid',
    };

    return (
      <div className={cx(s.bookItPanel, s.spaceTop2, s.aboutNoMargin)}>
        {/* <form onSubmit={this.handlePayWithOneFin}> */}
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <Row>
            <Col md={12} className={cx(s.textLeft, 'textAlignRightRtl')}>
              <div className={s.h3}>
                <FormattedMessage {...messages.aboutYourTrip} />
              </div>
              <div className={s.aboutPaymentDesc}>
                <FormattedMessage {...messages.aboutDescPayment} />
              </div>
              <div className={cx(s.bookItDetails, s.spaceTop2, s.space4)}>
                <span><FormattedMessage {...messages.whoComing} /></span>
                <Row className={s.spaceTop2}>
                  <Col md={12} lg={5}>
                    <Field disabled={isPayLater} value={5} name="guests" component={this.renderFormControlSelect} className={cx(s.formControlSelect, bt.commonControlSelect, 'paymentSelectAR')} >
                      {
                        this.renderGuests(allowedPersonCapacity)
                      }
                    </Field>
                  </Col>
                </Row>
              </div>
              <div className={s.displayTable}>
                <div className={s.displayTableRow}>
                  <div className={cx(s.displayTableCell, s.avatarSection, s.vtrTop)}>
                    <img src={config.AWS_SERVICE_URL + 'images/avatar/medium_' + guestPicture} className={s.avatarImage} />
                  </div>
                  <div className={cx(s.displayTableCell, s.messageSection, s.vtrTop)}>
                    <div >
                      <span><FormattedMessage {...messages.sayHello} />:</span>
                    </div>
                    <div>
                      <Field
                        className={cx(s.textArea, s.bizverseBox, s.bizverseBoxSecondary)}
                        name="message"
                        component={this.renderFormControlTextArea}
                        label={formatMessage(messages.descriptionInfo)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* {
                houseRules.length > 0 && <div className={s.space4}>
                  <HouseRules
                    hostDisplayName={hostDisplayName}
                    houseRules={houseRules}
                  />
                </div>
              } */}

            </Col>
            <Col md={10} className={cx(s.textLeft, 'textAlignRightRtl')}>
              <div className={cx(s.paymentFormWrapper, s.bizverseBox, s.bizverseBoxSecondary)}>
                <section>
                  <header className={s.paymentHeader}>
                    <Row>
                      <Col md={10} className={cx(s.textLeft, s.paymentPadding, 'textAlignRightRtl')}>
                        <h3 className={cx(s.pullLeft, s.h3, s.space2, 'pullRightBooking')}><FormattedMessage {...messages.payment} /></h3>
                      </Col>
                    </Row>
                  </header>
                </section>
                <div className={cx(s.selectBoxWrapper, 'selectBoxWrapperAr')}>
                  <Field
                    name="paymentType"
                    type="text"
                    className={cx(s.formControlSelect, s.fullWithSelect, bt.commonControlSelect, 'selectPaymentDropdown')}
                    component={this.renderFormControlSelect}
                  >
                    <option value={paymentMethods.PAYPAL_PAYMENT_ID}>{formatMessage(messages.paypal)}</option>
                    <option value={paymentMethods.STRIPE_PAYMENT_ID}>{formatMessage(messages.creditCard)}</option>
                    <option value={paymentMethods.ONE_FIN_PAYMENT_ID}>{formatMessage(messages.oneFin)}</option>
                    {canPayLater && !isPayLater && <option value={paymentMethods.PAY_LATER_ID}>{formatMessage(messages.payLater)}</option>}
                  </Field>
                </div>

                {paymentStatus === paymentMethods.ONE_FIN_PAYMENT_ID && <OneFinTransactionMethods />}

                {
                  paymentStatus === paymentMethods.STRIPE_PAYMENT_ID ? (!load ? <Loader /> : 
                  <Row className={cx(s.space4, s.spaceTop2, s.responsivecardSection)}>
                    <Col lg={10} md={11} sm={8} xs={12} className={cx(s.noPadding, s.spaceTop2, s.cardSection, s.bizverseBox, s.bizverseBoxSecondary)}>
                      <div className={'placeHolderFont'}>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <label className={s.labelText}>
                            <FormattedMessage {...messages.paymentCardNumber} />
                          </label>
                          <CardNumberElement
                            {...createOptions()}
                            placeholder={"0000 0000 0000 0000"}
                            className={cx(s.cardNumber, s.cardNumberSection, s.cardNumberSectionOne, s.bizverseBox, s.bizverseBoxSecondary, 'cardNumberRtl', isRTL(locale) ? 'placeHolderNameRTL' : 'placeHolderNameLTR')}
                          />
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={6}>
                          <label className={s.labelText}>
                            <FormattedMessage {...messages.cardExpires} />
                          </label>
                          <CardExpiryElement
                            placeholder="MM / YY"
                            {...createOptions()}
                            className={cx(s.cardNumber, s.cardNumberSectionTwo, s.cardNumberSection, s.bizverseBox, s.bizverseBoxSecondary, 'cardNumberRtl')}
                          />
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={6}>
                          <label className={s.labelText}>
                            <FormattedMessage {...messages.cvv} />
                          </label>
                          <CardCvcElement
                            placeholder="_ _ _"
                            {...createOptions()}
                            className={cx(s.cardNumber, s.cardNumberSectionThree, s.cardNumberSection, s.bizverseBox, s.bizverseBoxSecondary, 'cardNumberRtlTwo')}
                          />
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={12}>
                          <label className={s.labelText}>
                            <FormattedMessage {...messages.zipcode} />
                          </label>
                          <Field
                            name="zipcode"
                            component={this.renderFormControl}
                            className={cx(s.cardInput, s.cardNumber, s.noBoxShadow, s.cardNumberSection, s.cardNumberSectionFour, s.bizverseBox, s.bizverseBoxSecondary, 'cardNumberRtlTwo')}
                            placeholder={formatMessage(messages.zipcode)}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={5} xs={7}>
                          <img src={imageOne} className={cx(s.fullWidth, s.stripeImg)} />
                        </Col>
                        <Col lg={5} md={5} sm={4} xs={5} className={cx(s.pullRight, s.textRight)}>
                          <img src={imageTwo} className={cx(s.fullWidth, s.stripeImg)} />
                        </Col>
                      </div>
                    </Col>
                  </Row>) : <span></span>
                }
                {
                  paymentStatus === paymentMethods.PAYPAL_PAYMENT_ID &&
                  <Row className={cx(s.space4, s.spaceTop3)}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <div className={s.countryName}>
                        <span>
                          <FormattedMessage {...messages.paymentCurrency} />
                        </span>
                      </div>
                      <div className={s.selectContainer}>
                        <Field name="paymentCurrency" disabled={paymentType == 2} component={this.renderFormControlSelect} className={cx(s.formControlSelect, bt.commonControlSelect, 'selectPaymentDropdown')} >
                          <option value="">{formatMessage(messages.chooseCurrency)}</option>
                          {
                            this.renderpaymentCurrencies()
                          }
                        </Field>
                      </div>
                      <span className={cx(s.textLight, s.spaceTop1)}>
                        <FormattedMessage {...messages.loginInfo} />
                      </span>
                    </Col>
                  </Row>
                }
                <Row className={cx(s.space4, {
                  [s.spaceTop4]: paymentStatus == paymentMethods.PAY_LATER_ID
                })}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={s.cancelBtn}>
                      <Loader
                        type="button"
                        buttonType="submit"
                        className={cx(s.submitPayButton, bt.btnPrimary, 'arButtonLoader')}
                        disabled={pristine || submitting || error}
                        show={paymentLoading}
                        label={paymentStatus == paymentMethods.PAY_LATER_ID ? formatMessage(messages.bookNow) : formatMessage(messages.payNow)}
                      />
                    </div>
                    {
                      !paymentLoading && <div className={s.spaceTop1}>
                        <Link
                          to={"/rooms/" + listId}
                          className={cx(s.cancelLinkText, s.bizverseButtonSecondary)}
                          onClick={this.handleClick}
                        >
                          <FormattedMessage {...messages.cancel} />
                        </Link>
                      </div>
                    }
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </form>
      </div >
    );
  }
}

PaymentForm = reduxForm({
  form: 'PaymentForm', // a unique name for this form
  validate
})(PaymentForm);

// Decorate with connect to read form values
const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = (state) => ({
  paymentCurrencyList: state.currency.availableCurrencies,
  paymentLoading: state.book.paymentLoading,
  paymentType: selector(state, 'paymentType'),
  listingFields: state.listingFields.data,
  oneFinPaymentURL: state.oneFin.paymentURL,
  canPayLater: state.book.data.isPayLater
});

const mapDispatch = {
  makePayment,
  makePaymentLater,
  processCardAction,
  requestOneFinPayment,
  createReservation,
  requestOneFinPaymentLater
};

export default injectStripe(injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(PaymentForm))));
