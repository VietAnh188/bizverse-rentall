import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';

import {
	Button,
	Col,
	Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import bt from '../../../components/commonStyle.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux action
import { sendMessageAction } from '../../../actions/message/sendMessageAction';

// Component
import CountDown from '../../CountDown';
import Link from '../../Link';
import SubnavBar from '../../SubnavBar/SubnavBar'
import ApproveReservation from '../../Reservation/ApproveReservation';

// Locale
import messages from '../../../locale/messages';

class HostActions extends Component {
	static propTypes = {
		actionType: PropTypes.string.isRequired,
		sendMessageAction: PropTypes.any.isRequired,
		threadId: PropTypes.number.isRequired,
		reservationId: PropTypes.number,
		threadType: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		personCapacity: PropTypes.number.isRequired,
		guestDisplayName: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
		hostDisplayName: PropTypes.string.isRequired,
	};

	sendMessage = (type, otherData = {}) => {
		const { sendMessageAction, threadId, threadType, startDate, endDate, personCapacity, reservationId } = this.props;

		sendMessageAction({
			threadId, 
			threadType, 
			type, 
			startDate, 
			endDate, 
			personCapacity, 
			reservationId,
			...otherData
		});
	}

	// Inquiry
	inquiry(guestDisplayName) {
		const { createdAt } = this.props;
		let startDate = moment();
		let next24Hours = moment(createdAt).add(23, 'hours').add(59, 'minutes');
		let distance = next24Hours - startDate;
		let options = { endDate: next24Hours };
		return (
			<Panel className={cx(s.space6, s.contextPadding, s.bgReqBook)}>
				<h4>
					<strong><FormattedMessage {...messages.hostAction1} /> {guestDisplayName} <FormattedMessage {...messages.hostAction2} /></strong>
				</h4>
				<p className={s.spaceTop2}><FormattedMessage {...messages.hostAction3} /> {guestDisplayName} <FormattedMessage {...messages.hostAction4} /></p>
				{
					distance > 0 && <p className={s.spaceTop2}>
						<FontAwesome.FaClockO className={cx(s.textWhite, s.timerIcon)} />
						<FormattedMessage {...messages.hostResponseTime1} /> <CountDown options={options} /> <FormattedMessage {...messages.hostResponseTime2} />
					</p>
				}
				<Col md={12} className={cx(s.spaceTop2, s.noPadding)}>
					<Button className={bt.btnPrimary} onClick={() => this.sendMessage('preApproved')}>
						<FormattedMessage {...messages.preApprove} />
					</Button>
					{/* <Button className={cx(bt.btnPrimaryBorder, s.btnRight)} onClick={() => this.sendMessage('declined')}>
						<FormattedMessage {...messages.decline} />
					</Button> */}
				</Col>
			</Panel>
		);
	}

	// Request to book
	requestToBook(guestDisplayName) {
		const { createdAt, listPublishStatus, reservationId, listId } = this.props;
		let startDate = moment();
		//let next24Hours = moment(createdAt).add(24, 'hours');
		let next24Hours = moment(createdAt).add(23, 'hours').add(59, 'minutes');
		let distance = next24Hours - startDate;
		let options = { endDate: next24Hours };

		return (
			<Panel className={cx(s.space6, s.contextPadding, s.bgReqBook)}>
				<h4><strong>{guestDisplayName} <FormattedMessage {...messages.guestRequest} /></strong></h4>
				{
					distance > 0 && <p className={s.spaceTop2}>
						<FormattedMessage {...messages.hostResponseTime1} /> <CountDown options={options} /> <FormattedMessage {...messages.hostResponseTime2} />
					</p>
				}
				{
					listPublishStatus && <Col md={12} className={cx(s.spaceTop2, s.noPadding)}>
						<ApproveReservation 
							type="button" 
							sendMessage={this.sendMessage}
							reservationId={reservationId}
							listId={listId}
						/>
						<Button className={cx(bt.btnPrimaryBorder, s.btnRight, 'requestBookBtn')} onClick={() => this.sendMessage('declined')}>
							<FormattedMessage {...messages.decline} />
						</Button>
					</Col>
				}
			</Panel>
		);
	}

	// Inquiry pre-approved
	approved() {
		return (
			<Panel className={cx(s.space6, s.contextPadding, s.bgReqBook)}>
				<h4><strong><FormattedMessage {...messages.requestApproved} /></strong></h4>
				<p className={s.spaceTop2}>
					<FormattedMessage {...messages.timeToExpire} />
				</p>
			</Panel>
		);
	}

	// Request to book/ Inquiry declined
	declined() {
		return (
			<Panel className={cx(s.space6, s.contextPadding, s.bgReqBook)}>
				<h4><strong><FormattedMessage {...messages.requestDeclined} /></strong></h4>
				<p className={s.spaceTop2}>
					<FormattedMessage {...messages.declinedInfo} />
				</p>
			</Panel>
		);
	}

	// Booking confirmed by host/ instant booking
	bookingConfirmed() {
		const { reservationId, isCancelButtonShown, reservationState } = this.props;
		if (!isCancelButtonShown) return <span></span>;
		return (
			<Panel className={cx(s.space6, s.contextPadding, s.bgReqBook)}>
				<h4><strong><FormattedMessage {...messages.bookingIsConfirmed} /></strong></h4>
				<p className={s.spaceTop2}>
					<FormattedMessage {...messages.contactGuest} />
				</p>
				<Col md={12} className={cx(s.spaceTop2, s.noPadding)}>
					{reservationState === 'approved' && <Link to={"/cancel/" + reservationId + "/host"} className={cx(s.linkBtn, bt.btnPrimary)}>
						<FormattedMessage {...messages.cancelReservation} />
					</Link>}
				</Col>
			</Panel>
		);
	}

	// Pre-approved or approved by host is expired
	expired(guestDisplayName) {
		return (
			<Panel className={cx(s.space6, s.contextPadding, s.bgReqBook)}>
				<h4><strong><FormattedMessage {...messages.bookingIsExpired} /></strong></h4>
				<p className={s.spaceTop2}>
					{guestDisplayName}'s <FormattedMessage {...messages.bookingIsExpired1} />
				</p>
			</Panel>
		);
	}

	// Booking is cancelled by host
	cancelled(guestDisplayName) {
		return (
			<Panel className={cx(s.space6, s.contextPadding, s.bgReqBook)}>
				<h4><strong><FormattedMessage {...messages.bookingRequestCancel1} /></strong></h4>
				<p className={s.spaceTop2}>
					{guestDisplayName}'s <FormattedMessage {...messages.bookingRequestCancel3} />
				</p>
			</Panel>
		);
	}

	completed() {
		return (
			<Panel className={cx(s.space6, s.contextPadding, s.bgReqBook)}>
				<h4><strong><FormattedMessage {...messages.reservationIsCompleted} /></strong></h4>
				<p className={s.spaceTop2}>
					<FormattedMessage {...messages.reservationIsCompletedDescription} />
				</p>
			</Panel>
		);
	}

	render() {
		const { actionType, guestDisplayName, reservationState, paymentState, isPayLater } = this.props;

		if (actionType === 'inquiry') {
			return this.inquiry(guestDisplayName);
		} else if (actionType === 'preApproved') {
			return this.approved();
		} else if (actionType === 'expired') {
			return this.expired(guestDisplayName);
		} else if (reservationState === 'declined') {
			return this.declined();
		} else if (reservationState === 'approved') {
			return this.bookingConfirmed();
		} else if (reservationState === 'pending' && (paymentState === 'completed' || paymentState === 'pending' && isPayLater)) {
			return this.requestToBook(guestDisplayName);
		} else if (reservationState === 'cancelled') {
			return this.cancelled(guestDisplayName);
		} else if (reservationState === 'completed') {
			return this.completed();
		} else {
			return <SubnavBar />
		}
	}
}

const mapState = () => ({
});

const mapDispatch = {
	sendMessageAction,
};

export default withStyles(s, bt)(connect(mapState, mapDispatch)(HostActions));