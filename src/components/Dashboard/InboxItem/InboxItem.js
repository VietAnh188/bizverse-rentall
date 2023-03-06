import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Inbox.css';

// Component
import Avatar from '../../Avatar';
import Link from '../../Link';

// Redux Action
import { readMessage } from '../../../actions/message/readMessage';

class InboxItem extends Component {
	static propTypes = {
		type: PropTypes.string.isRequired,
		status: PropTypes.string,
		threadId: PropTypes.number.isRequired,
		profileId: PropTypes.number.isRequired,
		picture: PropTypes.string,
		displayName: PropTypes.string.isRequired,
		content: PropTypes.string,
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

	render() {
		const { type, threadId, profileId, picture, displayName, content, createdAt, startDate, endDate } = this.props;
		const { city, state, country, status, sentBy, read } = this.props;	
		let createdDate = createdAt != null ? moment(createdAt).format('MM/DD/YYYY') : '';
		let start = startDate != null ? '(' + moment(startDate).format('MM/DD/YYYY') : '';
		let end = endDate != null ? ' - ' + moment(endDate).format('MM/DD/YYYY') + ')' : '';
		const { readMessage } = this.props;
		return (
			<li className={s.PanelBody}>
				<Link to={"/message/" + threadId + "/" + type} onClick={() => readMessage(threadId, type)} className={s.linkMessageDetail}>
					{/* <div className={cx(s.displayTable, s.mainContentUnRead)}> */}
						<div className={s.mainContentUnRead}>
						{/* <div className={s.displayTableRow}> */}
							<div className={cx(s.displayTableCell, s.IconWidth, s.floatLeft, 'dashFloatLeft')}>
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
							<div className={cx(s.displayTableCell, s.rightBg, 'dashRightBg')}>
								{/* <div className={s.displayTable}> */}
									{/* <div className={s.displayTableRow}> */}
										{/* <div className={cx(s.displayTableCell, s.timeWidth, s.displayBlock, s.vtrTop)}> */}
										<div className={cx(s.displayFlex, s.displayBlock, s.vtrTop)}>
											<div className={s.textTruncate}>{displayName}</div>
											<time>{createdDate}</time>
										</div>
										<div className={cx(s.displayBlockMess, s.addressWidth, s.displayBlock, s.vtrTop)}>
											<div className={cx(s.textMuted)}>
												<div className={cx(s.threadBody, s.textHiddenBody)}>
													<span>{content}</span>
													{/* <div className={cx(s.textMuted, s.showLg)}>
														<span>{city}, {state}, {country} {start} {end}</span>
													</div> */}
												</div>
											</div>
										</div>
										<div className={cx(s.displayBlockMess, s.btnWidth, s.displayBlock, s.styleStatus)}>
											{status.props.children?.props.defaultMessage}
										</div>
									{/* </div> */}
								{/* </div> */}

							</div>
						{/* </div> */}
						</div>
				</Link>
			</li>
		);
	}
}

const mapState = (state) => ({});

const mapDispatch = {
	readMessage
};

export default withStyles(s)(connect(mapState, mapDispatch)(InboxItem));
