import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservation.css';
import {
  Label
} from 'react-bootstrap';

// Component
import Link from '../Link';
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';
import ModalConfirm from '../ModalConfirm';
import ApproveReservation from './ApproveReservation';

// Redux action
import { sendMessageAction } from '../../actions/message/sendMessageAction';
import { bookingProcess } from '../../actions/booking/bookingProcess';
import { cancelBooking } from '../../actions/booking/cancelBooking'
import { confirmGuestPaid } from '../../actions/Reservation/confirmGuestPaid'
import { burnNFTs } from '../../actions/nft/burnNFTs';
import { createNFT } from '../../actions/nft/createNFT';
import { checkUserWallet } from '../../actions/user/checkUserWallet';

// Locale
import messages from '../../locale/messages';

// Helper
import { getDateRanges } from '../../helpers/dateRange';

// GraphQL
import ListingDataQuery from './getListingData.graphql';

// Ignore pay state
const IGNORE_PAY_STATE = ['completed', 'cancelled', 'declined', 'expired']

// Config
import { AWS_SERVICE_URL } from '../../config';

class ReservationItem extends Component {
  static defaultProps = {
    noList: false,
    checkIn: null,
    checkOut: null
  };

  constructor(props) {
    super(props);

    this.state = {
      showConfirm: false,
      showConfirmApprove: false
    }
  }

  handleToggleConfirmModal = () => {
    this.setState(({ showConfirm }) => ({
      showConfirm: !showConfirm
    }))
  }

  handleToggleConfirmApproveModal = () => {
    this.setState(({ showConfirmApprove }) => ({
      showConfirmApprove: !showConfirmApprove
    }))
  }

  sendMessage = async (type, otherData = {}) => {
    const { sendMessageAction, threadId, userType, checkIn, checkOut, guests, reservationId } = this.props;
    const { onSuccess: otherAction } = otherData;

    const onSuccess = () => {
      if (otherAction) {
        otherAction()
      }

      window.location.reload(true);
    }
    
    await sendMessageAction({ 
      threadId, 
      threadType: userType, 
      type,
      startDate: checkIn, 
      endDate: checkOut, 
      personCapacity: guests, 
      reservationId,
      ...otherData,
      onSuccess
    });
  }

  reservationStyle() {
    const { reservationState } = this.props;
    let style, label;
    switch (reservationState) {
      case 'pending':
        label = <FormattedMessage {...messages.messageStatus5} />
        style = 'primary';
        break;
      case 'expired':
        label = <FormattedMessage {...messages.messageStatus9} />
        style = 'warning';
        break;
      case 'approved':
      case 'blocked':
        label = <FormattedMessage {...messages.messageStatus4} />
        style = 'success';
        break;
      case 'declined':
        label = <FormattedMessage {...messages.messageStatus3} />
        style = 'danger';
        break;
      case 'completed':
        label = <FormattedMessage {...messages.panelHeader2} />
        style = 'success';
        break;
      case 'cancelled':
        label = <FormattedMessage {...messages.messageStatus11} />
        style = 'danger';
        break;
    }
    return <Label className={s.labelText} bsStyle={style}>{label}</Label>;
  }

  handleApprove = async () => {
    await this.sendMessage('approved');
  }

  handleDecline = async () => {
    await this.sendMessage('declined')
  }

  handleConfirmGuestPaid = () => {
    const { confirmGuestPaid, reservationId } = this.props;

    confirmGuestPaid(reservationId)
  }

  handlePayLater = () => {
    const { bookingProcess, listId, checkIn, checkOut, guests, reservationId } = this.props;

    bookingProcess(listId, guests, checkIn, checkOut, null, null, true, reservationId)
  }

  handleCancelBooking = () => {
    const { cancelBooking, reservationId } = this.props;

    cancelBooking({ reservationId })
  }

  render() {
    const { threadId, userType, reservationId, reservationState, checkIn, checkOut, createdAt, paymentState, isPayLater } = this.props;
    const { listId, title, street, city, state, country, zipcode } = this.props;
    const { profileId, displayName, picture, phoneNumber, email } = this.props;
    const { guestServiceFee, hostServiceFee, total, currency, nftIds = [] } = this.props;
    const { noList } = this.props;

    let isValue;

    if (reservationState == 'completed' || reservationState == 'approved') {
      isValue = '#5cb85c'
    } else if (reservationState == 'expired') {
      isValue = '#f0ad4e'
    } else if (reservationState == 'pending') {
      isValue = '#007bff'
    } else if (reservationState == 'declined' || reservationState == ' cancelled') {
      isValue = '#d9534f'
    }

    let checkInDate = checkIn ? moment(checkIn).format('MMM DD - ') : '';
    let checkOutDate = checkOut ? moment(checkOut).format('MMM DD, YYYY') : '';
    let createdDate = createdAt ? moment(createdAt).format('MMM DD, YYYY') : '';
    let subTotal = 0;
    let formattedCheckout = moment(checkOut);

    const { nights, interval, today } = getDateRanges({ checkIn, checkOut, country })

    let enableCancel = false, enableIternary = false;
    if (reservationState === 'approved') {
      enableIternary = true;
    }

    //(-interval) < (nights - 1) Hide if the (current date) is equal or greater than the (one day before checkout date)

    if ((reservationState === 'approved' || (reservationState === 'blocked' && userType === 'guest')) 
      && formattedCheckout > today && (-interval) < (nights - 1)) {
      enableCancel = true;
    }

    if (userType === 'host') {
      subTotal = total - hostServiceFee;
    } else {
      subTotal = total + guestServiceFee
    }

    const canHostApproveOrDecline = !noList && userType === 'host' 
      && (reservationState === 'pending' && paymentState === 'completed'
        || reservationState === 'pending' && paymentState === 'pending' && !!isPayLater)

    const rightWordNFT = nftIds.length === 1 ? 'NFT' : 'NFTs';

    return (
      <div className={s.positionRelative}>
        <div className={s.displayTable}>
          <div className={s.displayTableRow}>
            <div className={cx(s.displayTableCell, s.borderLine, s.dateSectionWidth, s.dateSection, 'reservationLine')}>
              <div className={cx('hidden-xs hidden-sm')}>
                <p className={cx(s.noMargin, s.dateFontNew, s.dateFontMargin, s.fontWeight)}>{createdDate}</p>
              </div>
            </div>
            <div className={cx(s.circle, 'reservartioARCircle')}>
            </div>
            <div className={cx(s.positionRelative, s.spaceTop3)}>
              <div className={cx(s.displayTableCell, s.mainSection, s.space2, s.afterSection, s.bizverseBox, s.bizverseBoxSecondary, 'reservationAfterSection')}>
                <div className={s.displayTable}>
                  <div className={s.displayTableRow}>
                    <div className={cx(s.sectionTitleLight, s.displayTableCell, s.addressWidth, s.responsiveDisplay, s.tabScreenresolution)}>
                      {
                        !noList && <div>
                          <a href={"/rooms/" + listId} target={'_blank'} className={cx(s.linkTitle)}> {title} </a><br />
                        </div>
                      }
                      <span>{checkInDate}{checkOutDate}</span><br />
                      {
                        noList && userType === 'guest' && <span className={s.errorMessage}> <FormattedMessage {...messages.noList} /> </span>
                      }
                      {
                        noList && userType === 'host' && <span className={s.errorMessage}> <FormattedMessage {...messages.notexist} /> </span>
                      }
                      {
                        !noList && <div>
                          <span>{street}</span> <br />
                          <span>{city + (city ? ', ' : '')}{state + (state ? ', ' : '')}{country + (country ? ', ' : '')}{zipcode} </span>
                        </div>
                      }
                      <p className={cx(s.sectionTitleLight, s.spaceTop1)}>
                        {this.reservationStyle()}

                        {(isPayLater && paymentState !== 'completed') &&  <Label className={cx(s.labelText, s.spaceLeft1)} bsStyle="info"><FormattedMessage {...messages.payLater} /></Label>}
                      </p>
                    </div>
                    <div className={cx(s.displayTableCell, s.logoWidth, s.alignCenter, s.responsiveDisplay, s.responsiveAvatarSection, s.tabAvatarSection, 'responsiveAvatarSectionAR')}>
                      <div className={cx(s.mediaContainer, s.mediaWidth, s.responsiveAvatarImg, 'responsiveAvatarImgAR')}>
                        <Avatar
                          source={picture}
                          height={50}
                          width={50}
                          title={displayName}
                          className={cx(s.profileAvatar, s.profileAvatarLink)}
                          withLink={noList ? false : true}
                          profileId={profileId}
                        />
                      </div>
                      <Link to={"/users/show/" + profileId} className={cx(s.hostName, s.sectionTitleLight)}>{displayName}</Link> <br />
                      {
                        reservationState && (reservationState === 'approved' || reservationState === 'completed') && <ul className={cx(s.listLayout, 'listLayoutArbic')}>
                          <li>{phoneNumber}</li>
                          <li className={s.textWordBreak}>{email}</li>
                        </ul>
                      }
                    </div>
                    <div className={cx(s.displayTableCell, s.responsiveDisplay, s.tabPriceSection)}>
                      <p className={cx(s.space1, s.fontWeight, s.dateFont)}>
                        <CurrencyConverter
                          amount={subTotal}
                          className={s.bookItPrice}
                          from={currency}
                        />

                      </p>
                      <ul className={cx(s.listLayout, 'listLayoutArbic')}>

                        {
                          !noList && !(paymentState === 'pending' && !isPayLater) && <li><Link className={s.informationLink} to={"/message/" + threadId + "/" + userType}> <FormattedMessage {...messages.messageHistroy} /></Link></li>
                        }

                        {
                          !noList && userType === 'guest' && !IGNORE_PAY_STATE.includes(reservationState) && paymentState === 'pending' && <li><a className={s.informationLink} onClick={this.handlePayLater}><FormattedMessage {...messages.payNow} /></a></li>
                        }

                        {
                          noList && <li><Link className={s.informationLink} to={"/contact"}><FormattedMessage {...messages.contactSupport} /></Link></li>
                        }

                        {
                          !noList && userType === 'guest' && enableIternary && <li><Link className={s.informationLink} to={"/users/trips/itinerary/" + reservationId}> <FormattedMessage {...messages.viewItinerary} /></Link></li>
                        }
                        {
                          !noList && userType === 'guest' && paymentState === 'completed' && <li><Link className={s.informationLink} to={"/users/trips/receipt/" + reservationId}><FormattedMessage {...messages.viewReceipt} /></Link></li>
                        }
                        {
                          !noList && userType === 'host' && ['approved', 'completed'].includes(reservationState) && <li><Link className={s.informationLink} to={"/users/trips/receipt/" + reservationId}><FormattedMessage {...messages.viewReceipt} /></Link></li>
                        }

                        {
                          !noList && userType === 'host' && (['approved', 'completed'].includes(reservationState) && paymentState === 'pending') && <li><a className={s.informationLink} onClick={this.handleToggleConfirmModal}><FormattedMessage {...messages.guestPaid} /></a></li>
                        }

                        {
                          canHostApproveOrDecline && <li>
                            {/* <a className={s.informationLink} onClick={this.handleToggleConfirmApproveModal}>
                              {!!nftIds.length ? (
                                <FormattedMessage {...messages.approveAndBurnNFT} />
                              ) : (
                                <FormattedMessage {...messages.approveAndMintNFT} />
                              )}
                            </a> */}
                            <ApproveReservation 
                              sendMessage={this.sendMessage}
                              reservationId={reservationId}
                              listId={listId}
                              type="link"
                            />
                          </li>
                        }
                        {
                          canHostApproveOrDecline && <li>
                            <a className={s.informationLink} onClick={this.handleDecline}>
                              <FormattedMessage {...messages.decline} />
                            </a>
                          </li>
                        }
                        {
                          !noList && enableCancel && <li> <Link to={"/cancel/" + reservationId + "/" + userType}><FormattedMessage {...messages.cancel} /></Link></li>
                        }

                        {
                          !noList && !IGNORE_PAY_STATE.includes(reservationState) && paymentState === 'pending' && !isPayLater 
                            && <li><a className={s.informationLink} onClick={this.handleCancelBooking}><FormattedMessage {...messages.cancel} /></a></li>
                        }

                        <ModalConfirm 
                          title={<FormattedMessage {...messages.confirmGuestHasPaid} />} 
                          onClose={this.handleToggleConfirmModal} 
                          onOk={this.handleConfirmGuestPaid} 
                          show={this.state.showConfirm} 
                        />
                      </ul>
                    </div>
                  </div>
                </div>

                {reservationState === 'pending' && !!nftIds.length && (
                  <span className={s.conflictingNFTsWarning}>
                    <FormattedMessage {...messages.conflictNFTsWarning} values={{ number: nftIds.length, rightWordNFT }} />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  wallet: state?.account?.data?.wallet,
});

const mapDispatch = {
  sendMessageAction,
  bookingProcess,
  confirmGuestPaid,
  burnNFTs,
  mintNFT: createNFT,
  checkUserWallet,
  cancelBooking
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(ListingDataQuery,
  {
    name: 'getListingData',
    options: (props) => ({
      variables: {
        listId: props.listId,
        preview: false,
      },
      fetchPolicy: 'network-only',
      ssr: true
    })
  }
))(ReservationItem);