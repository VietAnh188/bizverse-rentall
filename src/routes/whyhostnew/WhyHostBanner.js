import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostBanner.css';
import {
    Button,
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// History
import history from '../../core/history';

// ES6 Imports
import Scroll from 'react-scroll'; // Imports all Mixins

// config
import * as config from '../../config'

// Or Access Link,Element,etc as follows
let Link = Scroll.Link;

class WhyHostBanner extends Component {

    static defaultProps = {
        isAuthenticated: false
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            history.push('/become-a-host?mode=new');
        } else {
            history.push('/login?refer=/become-a-host?mode=new');
        }
    }

    render() {
        const { data } = this.props
        return (
            <div>
                <div className={s.TopBannerHeader} style={{ backgroundImage: `url(${config.AWS_SERVICE_URL}images/home/${data && data.hostBannerImage1})` }} >

                    <div className={s.bannerText}>
                        <Col
                            xs={12} sm={12} md={12} lg={12}
                            className={cx(s.responsiveMargin, 'responsiveMarginRTL')}
                        >
                            <h1 className={s.bannerTitle}>
                                <FormattedMessage {...messages.becomeAHostTitle}/>
                            </h1>
                            <div className={s.displayFlex}>
                                <Button
                                    className={cx(s.button)}
                                    onClick={this.handleClick}
                                >
                                    <FormattedMessage {...messages.becomeAHost} />
                                </Button>
                                <Link
                                    className={cx(s.button, s.btnPrimaryBorder, s.linkButton, s.btnRight, 'whyBtnRtl')}
                                    activeClass={s.active}
                                    to="test1"
                                    spy={true}
                                    smooth={true}
                                >
                                    <FormattedMessage {...messages.learnMore} />
                                </Link>
                            </div>
                        </Col>
                    </div>
                </div>

            </div>
        );
    }
}

const mapState = (state) => ({
    isAuthenticated: state.runtime.isAuthenticated,
});
const mapDispatch = {};
export default compose(
    withStyles(s),
    connect(mapState, mapDispatch),
)(WhyHostBanner);