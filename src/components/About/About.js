import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from '../../locale/messages';

import s from './About.css';

class About extends Component {
    render() {
        return (
            <div>
                <p className={s.textJustify}><FormattedMessage {...messages.aboutPageContent1}/></p>
            </div>
        );
    }
}

export default compose(injectIntl, withStyles(s))(About);