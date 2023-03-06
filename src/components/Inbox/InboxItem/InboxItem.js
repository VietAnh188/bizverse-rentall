import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import { graphql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';

import {
	Row,
	Col,
	Label
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Inbox.css';

// Component
import Avatar from '../../Avatar';
import Link from '../../Link';

// Redux Action
import { readMessage } from '../../../actions/message/readMessage';

// Locale
import messages from '../../../locale/messages';

// Graphql 
import GetAllThreadQuery from '../AllThreadsQuery.graphql';
class InboxItem extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		type: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		threadId: PropTypes.number.isRequired,
		profileId: PropTypes.number.isRequired,
		picture: PropTypes.string,
		displayName: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		sentBy: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		read: PropTypes.bool.isRequired,
		account: PropTypes.shape({
			userId: PropTypes.string.isRequired
		}),
		readMessage: PropTypes.any.isRequired
	};

	static defaultProps = {
		createdAt: null,
		startDate: null,
		endDate: null,
		picture: null,
		status: null,
		sentBy: null,
		read: false
	}

	label(status, noStyle) {
		let style, label;
		switch (status) {
			case 'inquiry':
				label = <FormattedMessage {...messages.messageStatus1} />
				style = 'info';
				break;
			case 'preApproved':
				label = <FormattedMessage {...messages.messageStatus2} />
				style = 'primary';
				break;
			case 'declined':
				label = <FormattedMessage {...messages.messageStatus3} />
				style = 'danger';
				break;
			case 'approved':
				label = <FormattedMessage {...messages.messageStatus4} />
				style = 'success';
				break;
			case 'pending':
				label = <FormattedMessage {...messages.messageStatus5} />
				style = 'warning';
				break;
			case 'cancelledByHost':
				label = <FormattedMessage {...messages.messageStatus6} />
				style = 'danger';
				break;
			case 'cancelledByGuest':
				label = <FormattedMessage {...messages.messageStatus7} />
				style = 'danger';
				break;
			case 'intantBooking':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'confirmed':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'expired':
				label = <FormattedMessage {...messages.messageStatus9} />
				style = 'danger';
				break;
			case 'requestToBook':
				label = <FormattedMessage {...messages.messageStatus10} />
				style = 'primary';
				break;
			case 'completed':
				label = <FormattedMessage {...messages.inboxCompleted} />
				style = 'success';
				break;
		}
		if (noStyle) {
			return label;
		}
		return <Label bsStyle={style}>{label}</Label>
	}

	handleReadMessage = () => {
		const { type, threadId, readMessage } = this.props;
		
		readMessage(threadId, type)
	}

	render() {
		const { type, threadId, profileId, picture, displayName, content, createdAt, startDate, endDate } = this.props;
		const { city, state, country, status, sentBy, read } = this.props;
		const { formatMessage, locale } = this.props.intl;
		const { account: { userId } } = this.props;
		const { readMessage } = this.props;
		let createdDate = createdAt != null ? moment(createdAt).format('MMM DD, YYYY') : '';
		let start = startDate != null ? '(' + moment(startDate).format('MMM DD, YYYY') : '';
		let end = endDate != null ? ' - ' + moment(endDate).format('MMM DD, YYYY') + ')' : '';
		let isRead;
		if (userId !== sentBy && read === false) {
			isRead = s.threadSubjectUnread;
		}

		const isNotRead = userId !== sentBy && !read

		return (
			<div className={s.PanelBody}>
				<Link 
					className={s.linkMessageDetail} 
					to={"/message/" + threadId + "/" + type}
					onClick={this.handleReadMessage} >
					<Row>
						<Col xs={12} sm={12} md={12} lg={12} className={(locale=='ar') ? s.threadAuthorAR : s.threadAuthor}>
							<div className={s.displayFlex}>
								<div className={s.displayTableCellIcon}>
									<div className={s.threadAvatar}>
										<Avatar
											source={picture}
											height={70}
											width={70}
											title={displayName}
											className={s.profileAvatar}
											withLink
											linkClassName={s.profileAvatarLink}
											profileId={profileId}
										/>
									</div>
								</div>
								<div className={cx(s.displayTableCell, s.contentSection)}>
									<div className={cx(s.displayFlexItem, s.nameWidth, s.displayBlock, s.paddingR20, 'paddingR20RTL')}>
										<Link to={"/users/show/" + profileId} className={s.textNameHost}> {displayName}  </Link>
											<div>
												<time className={s.focusTextColor}>{createdDate}</time>
											</div>
									</div>
									<div className={cx(s.displayTableCell, s.addressWidth, s.displayBlock)}>
										<div className={cx(s.textMuted)} >
											<div className={cx(s.threadBody,s.textHiddenBody)}>
												<span className={cx({[s.threadSubjectUnread]:userId !== sentBy && read === false, 'threadSubjectUnreadRTL':userId !== sentBy && read === false})}>{content != null ? content : this.label(status, true)}</span>
											</div>
										</div>
									</div>
									<div className={cx(s.displayTableCell, s.displayBlock, s.btnWidth, s.focusTextColor)}>
										{status.charAt(0).toUpperCase() + status.slice(1)}
									</div>
								</div>
							</div>
						</Col>
					</Row>

					{ isNotRead &&  <FontAwesome.FaCircle className={cx(s.notification, 'notificationRTL')} />}
				</Link>
			</div>
		);
	}
}

const mapState = (state) => ({
	account: state.account.data
});

const mapDispatch = {
	readMessage
};


export default compose(
	injectIntl,
	withStyles(s),
	connect(mapState, mapDispatch),
	graphql(GetAllThreadQuery, {
		name: 'GetAllThreads',
		options: {
			ssr: false,
			pollInterval: 5000,
			fetchPolicy: 'network-only',
		}
	})
)(InboxItem);