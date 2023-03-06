import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HostingBlock.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { refer, siteName, data } = this.props;

    return (

      <Grid className={s.hostingsection}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            {/* <div className={cx(s.seperator, s.boxseperator)}></div> */}
            <div className={cx(s.mainhedding, 'mainheddingRTLMobile')}>
              <h1><FormattedMessage {...messages.becomeAHostPart2Title}/></h1>
            </div>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className={s.steps}>
                <p className={cx(s.circle, 'circleAR')}><span> 1 </span></p>
                <h4 className={s.common}><FormattedMessage {...messages.becomeAHostPart2Label1}/></h4>
                <p className={s.common}><FormattedMessage {...messages.becomeAHostPart2ContentLabel1}/></p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className={s.steps}>
                <p className={cx(s.circle, 'circleAR')}><span> 2 </span></p>
                <h4 className={s.common}><FormattedMessage {...messages.becomeAHostPart2Label2}/></h4>
                <p className={s.common}><FormattedMessage {...messages.becomeAHostPart2ContentLabel2}/></p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className={s.steps}>
                <p className={cx(s.circle, 'circleAR')}><span> 3 </span></p>
                <h4 className={s.common}><FormattedMessage {...messages.becomeAHostPart2Label3}/></h4>
                <p className={s.common}><FormattedMessage {...messages.becomeAHostPart2ContentLabel3}/></p>
              </div>
            </Col>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default (injectIntl, withStyles(s))(connect(mapState, mapDispatch)(SocialLogin));
