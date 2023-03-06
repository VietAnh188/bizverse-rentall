import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';

// Component
import GuestActions from './GuestActions';
import HostActions from './HostActions';
import { getDateRanges } from '../../../helpers/dateRange';

class ActionBlock extends Component {
  static propTypes = {
    threadType: PropTypes.string.isRequired,
    actionType: PropTypes.string.isRequired,
    threadId: PropTypes.number.isRequired,
    listId: PropTypes.number.isRequired,
    reservationId: PropTypes.number,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    personCapacity: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    hostDisplayName: PropTypes.string.isRequired,
    guestDisplayName: PropTypes.string.isRequired
  };

  static defaultProps = {
    actionType: null
  }

  render() {
    const { threadType, actionType, threadId, listId, startDate, endDate, personCapacity, createdAt, country } = this.props;
    const { hostDisplayName, guestDisplayName, reservationId, guestEmail, title, listPublishStatus, reservationData } = this.props;

    let isCancelButtonShown = false;
    if (reservationData && reservationData.checkIn && reservationData.checkOut) {
      const { nights, interval } = getDateRanges({ checkIn: reservationData.checkIn, checkOut: reservationData.checkOut, country: country });

      //Hide if the (current date) is equal or greater than the (one day before checkout date) 
      isCancelButtonShown = (-interval) < (nights - 1);
    }

    if (actionType != null) {
      if (threadType === 'host') {
        return <HostActions
          actionType={actionType}
          threadId={threadId}
          reservationId={reservationId}
          listId={listId}
          threadType={threadType}
          startDate={startDate}
          endDate={endDate}
          personCapacity={personCapacity}
          createdAt={createdAt}
          guestDisplayName={guestDisplayName}
          hostDisplayName={hostDisplayName}
          guestEmail={guestEmail}
          title={title}
          listPublishStatus={listPublishStatus}
          isCancelButtonShown={isCancelButtonShown}
          reservationState={reservationData.reservationState}
          paymentState={reservationData.paymentState}
          isPayLater={reservationData.isPayLater}
        />
      } else {
        return <GuestActions
          actionType={actionType}
          threadId={threadId}
          listId={listId}
          startDate={startDate}
          endDate={endDate}
          personCapacity={personCapacity}
          reservationId={reservationId}
          hostDisplayName={hostDisplayName}
          createdAt={createdAt}
          listPublishStatus={listPublishStatus}
          isCancelButtonShown={isCancelButtonShown}
          reservationState={reservationData.reservationState}
          paymentState={reservationData.paymentState}
          isPayLater={reservationData.isPayLater}
        />
      }
    } else {
      return <div />
    }
  }
}

export default withStyles(s)(ActionBlock);

