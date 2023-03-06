import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CoverSection.css';
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
      <Grid>
        <Row className={s.coveredsection}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.mainhedding, 'mainheddingRTLMobile')}>
              <h1><FormattedMessage {...messages.becomeAHostPart3Title}/></h1>
            </div>
            <Col xs={12} sm={12} md={6} lg={6} className={s.coveredtextarea}>
              <p className={s.common}><FormattedMessage {...messages.becomeAHostPart3Header1}/></p>
              <p className={s.common}><FormattedMessage {...messages.becomeAHostPart3Header2}/></p>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <ul className={cx(s.coverul, 'coverulAr')}>
                <li>
                  <b><FormattedMessage {...messages.becomeAHostPart3Label1}/></b>
                  <FormattedMessage {...messages.becomeAHostPart3Content1}/>
                </li>
                <li>
                  <b><FormattedMessage {...messages.becomeAHostPart3Label2}/></b>
                  <FormattedMessage {...messages.becomeAHostPart3Content2}/>
                </li>
                <li>
                  <b><FormattedMessage {...messages.becomeAHostPart3Label3}/></b>
                  <FormattedMessage {...messages.becomeAHostPart3Content3}/>
                </li>
                <li>
                  <b><FormattedMessage {...messages.becomeAHostPart3Label4}/></b>
                  <FormattedMessage {...messages.becomeAHostPart3Content4}/>
                </li>
                <li>
                  <b><FormattedMessage {...messages.becomeAHostPart3Label5}/></b>
                  <FormattedMessage {...messages.becomeAHostPart3Content5}/>
                </li>
                <li>
                  <b><FormattedMessage {...messages.becomeAHostPart3Label6}/></b>
                  <FormattedMessage {...messages.becomeAHostPart3Content6}/>
                </li>
              </ul>
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
