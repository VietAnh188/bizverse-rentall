import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

class Status extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    };

    static defaultProps = {
        type: null,
        createdAt: null
    };

    label(status) {
        switch (status) {
            case 'inquiry':
                return <FormattedMessage {...messages.messageStatus1}/>;
            case 'preApproved':
                return <FormattedMessage {...messages.messageStatus2}/>;
            case 'declined':
                return <FormattedMessage {...messages.messageStatus3}/>;
            case 'approved':
                return <FormattedMessage {...messages.messageStatus4}/>;
            case 'pending':
                return <FormattedMessage {...messages.messageStatus5}/>;
            case 'cancelledByHost':
                return <FormattedMessage {...messages.messageStatus6}/>;
            case 'cancelledByGuest':
                return <FormattedMessage {...messages.messageStatus7}/>;
            case 'intantBooking':
                return <FormattedMessage {...messages.messageStatus8}/>;
            case 'confirmed':
                return <FormattedMessage {...messages.bookingConfirmed}/>;
            case 'expired':
                return <FormattedMessage {...messages.messageStatus9}/>;
            case 'requestToBook':
                return <FormattedMessage {...messages.messageStatus10}/>;
            case 'completed':
                return <FormattedMessage {...messages.panelHeader2}/>;
        }
    }

    render() {
        const { type, createdAt } = this.props;
        let date = createdAt != null ? moment(createdAt).format('MMM DD, YYYY') : '';
        return (
            <div className={cx(s.inlineStatus, s.space6)}>
                <div className={cx(s.horizontalText)}>
                    <span className={s.textWrapper}>
                        <span>{this.label(type)}</span>
                        <span> {date}</span>
                    </span>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Status);

