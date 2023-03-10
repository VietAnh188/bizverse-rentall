import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Style
import {
  Grid,
  Row,
  Col,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import bt from '../../components/commonStyle.css';

// Component
import VerifiedInfo from '../VerifiedInfo';
import Avatar from '../Avatar';
import Link from '../Link';
import UnreadMessages from './UnreadMessages';
import SubnavBar from '../SubnavBar/SubnavBar';

// Graphql 
import UnreadThreadsQuery from './getUnreadThreads.graphql';

// Locale
import messages from '../../locale/messages';

class Dashboard extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    account: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      picture: PropTypes.string,
    }).isRequired,
    allUnreadThreads: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUnreadThreads: PropTypes.array
    }),
    siteName: PropTypes.string.isRequired
  };

  static defaultProps = {
    allUnreadThreads: {
      loading: true,
      getUnreadThreads: []
    },
    account: {
      userId: null,
      picture: null
    }
  }

  render() {
    const { account: { userId, picture }, siteName } = this.props;
    const { allUnreadThreads: { loading, getUnreadThreads } } = this.props;
    const { formatMessage } = this.props.intl;
    let newMessages = 0;
    if (!loading) {
      newMessages = getUnreadThreads != null ? getUnreadThreads.length : 0;
    }
    let messageCount = formatMessage(messages.messages) + ` (${newMessages} ` + formatMessage(messages.messagesNew) + ')';

    return (
      <div className={cx(s.pageContainer, s.space4, 'ViewProfile')}>
        <Grid fluid className={s.noPadding}>
          <Row className={s.containerResponsive}>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className={cx(s.slideShow, s.space3, s.hideSm)}>
                <Avatar
                  isUser
                  height={190}
                  width={190}
                  className={cx(s.imgResponsive, s.bizverseBox, s.bizverseBoxPrimary)}
                />
              </div>
              <div className={cx(s.slideShowImages, s.space3, s.showSm, s.mediaRound)}>
                <Avatar
                  isUser
                  height={130}
                  width={130}
                  className={cx(s.imgResponsive, s.bizverseBox, s.bizverseBoxPrimary)}
                />
              </div>
              {/* <VerifiedInfo userId={userId} /> */}
              <SubnavBar />
            </Col>

            <Col xs={12} sm={12} md={8} lg={8}>
              <div className={cx('commonListingBg', 'dashboard')}>
              <div className={'dashBoardWhiteBg'}>
                <Panel className={s.panelHeader}>
                  <div>
                    <h3 className={bt.listingTitleText}>{formatMessage(messages.dashBoardHeader) + ' ' + siteName}</h3>
                  </div>
                  <div className={s.panelBody}>
                    <p>
                      <FormattedMessage {...messages.dashBoardInfo} />
                    </p>
                    <ul className={cx(s.listStyle, 'listLayoutArbic')}>
                      <li>
                        <p className={s.space2}><FormattedMessage {...messages.dashBoardInfo1} /></p>
                        <Link className={s.bizverseLink} to={"/user/edit"}><FormattedMessage {...messages.completeYourProfile} />{' '}>>></Link>
                      </li>
                    </ul>
                  </div>
                </Panel>
                </div>
                <Panel className={cx(s.panelBorder, s.bizverseBox, s.bizverseBoxPrimary, s.panelHeader, s.meassageBg)}>
                  <div>
                    <h3 className={cx(bt.listingTitleText, s.listingTitleText)}>{messageCount}</h3>
                  </div>
                  <UnreadMessages
                    userId={userId}
                    loading={loading}
                    getUnreadThreads={getUnreadThreads}
                  />
                  <Link to={"/inbox"} className={cx(s.linkText, s.bizverseLink)}><FormattedMessage {...messages.allMessages} />{' '}>>></Link>
                </Panel>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => ({
  account: state.account.data,
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(UnreadThreadsQuery, {
    name: 'allUnreadThreads',
    options: {
      ssr: false,
      pollInterval: 5000,
      fetchPolicy: 'network-only'
    }
  })
)(Dashboard);