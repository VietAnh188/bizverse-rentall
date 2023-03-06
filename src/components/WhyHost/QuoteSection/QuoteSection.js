import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './QuoteSection.css';
import { url } from '../../../config'
import * as config from '../../../config'

// History
import history from '../../../core/history';
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

    const img1 = data && data.quoteSectionImage1;
    const img2 = data && data.quoteSectionImage2;

    let linkNew1 = 'https://blog.bizverse.world/nft-promising-pioneering-technology-trend/';
    let linkNew2 = 'https://www.gobankingrates.com/investing/crypto/nft-rentals-the-next-step-in-play-to-earn-games/';

    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={s.quotesection}>
              <div className={s.imagearea}>
                <Image src={config.AWS_SERVICE_URL + 'images/home/' + img1} alt="image" responsive />
              </div>

              <div className={cx(s.contentarea, s.rightsidecontent, 'rightsidecontentRtl')}>
                <h2 className={s.quotesectionH2}><FormattedMessage {...messages.becomeAHostPart4Title1}/></h2>
                <h6><FormattedMessage {...messages.becomeAHostPart4Content1}/></h6>
                <button className={s.btnlearn}>
                  <a target='_blank' href={linkNew1}><FormattedMessage {...messages.readMore}/></a>
                </button>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={s.quotesection}>
              <div className={cx(s.contentarea, s.leftsidecontent, 'leftsidecontentRtl')}>
                {/* <h3 className={s.qutoIcon}><span className={s.qutoSize}>“</span></h3> */}
                <h2 className={s.quotesectionH2}><FormattedMessage {...messages.becomeAHostPart4Title2}/></h2>
                <h6><FormattedMessage {...messages.becomeAHostPart4Content2}/></h6>
                <button className={s.btnlearn}>
                  <a target='_blank' href={linkNew2}><FormattedMessage {...messages.readMore}/></a>
                </button>
              </div>
              <div className={s.imagearea}>
                <Image src={config.AWS_SERVICE_URL + 'images/home/' + img2} alt="image" responsive />
              </div>
            </div>
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
