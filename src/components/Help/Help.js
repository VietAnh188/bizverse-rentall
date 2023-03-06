import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { Component } from 'react';
import { compose } from 'redux';

import s from './Help.css';
import cx from 'classnames';

import messages from '../../locale/messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import Collapsible from 'react-collapsible';
import HelpGuest from './HelpGuest';
import HelpHost from './HelpHost';

class Help extends Component {
    state = {
        type: 'guest',
        isHost: false
    }

    changeType(threadType) {
        this.setState({type: threadType, isHost: threadType!=="guest"})
    }

    render() {
        const { type, isHost } = this.state;
        return (
            <div>
                <ul className={s.tabs}>
                    <li className={cx(s.tab, {[s.bizverseTabActiveBorderContainer] : !isHost})} onClick={() => this.changeType('guest') }>
                        <a className={cx(s.bizverseTab,  {[s.bizverseTabActive]: !isHost})} >
                            <FormattedMessage {...messages.guest}/>
                        </a>
                    </li>
                    <li className={cx(s.tab, {[s.bizverseTabActiveBorderContainer] : isHost})} onClick={() => this.changeType('host') }>
                        <a className={cx(s.bizverseTab,  {[s.bizverseTabActive]: isHost})} >
                            <FormattedMessage {...messages.host}/>
                        </a>
                    </li>
                </ul>
                <div className={s.content}>
                    {
                        !isHost && <HelpGuest/>
                    }
                    {
                        isHost && <HelpHost/>
                    }

                </div>
            </div>
        );
    }
}

export default compose(injectIntl, withStyles(s))(Help);