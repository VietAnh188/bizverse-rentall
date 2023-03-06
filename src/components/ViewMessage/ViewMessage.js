import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewMessage.css';
// Component
import UserDetail from './UserDetail';
import TripDetails from './TripDetails';
import ActionBlock from './ActionBlock';
import SendMessage from './SendMessage';
import ThreadItems from './ThreadItems';
import SubnavBar from '../SubnavBar/SubnavBar';
import Loader from '../Loader';
// Graphql
import GetThreadQuery from './GetThreadQuery.graphql';
import GetMoreThreadItemsQuery from './GetMoreThreadItemsQuery.graphql';
// Locale
import messages from '../../locale/messages';

class ViewMessage extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    threadItemsData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getThread: PropTypes.shape({
        guestProfile: PropTypes.shape({
          profileId: PropTypes.number.isRequired,
          picture: PropTypes.string,
          displayName: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          location: PropTypes.string,
          reviewsCount: PropTypes.number,
          userVerification: PropTypes.object,
        }),
        guestUserData: PropTypes.shape({
          email: PropTypes.string.isRequired,
          userBanStatus: PropTypes.number,
        }),
        hostProfile: PropTypes.shape({
          profileId: PropTypes.number.isRequired,
          picture: PropTypes.string,
          displayName: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          location: PropTypes.string,
          reviewsCount: PropTypes.number,
          userVerification: PropTypes.object,
        }),
        hostUserData: PropTypes.shape({
          email: PropTypes.string.isRequired,
          userBanStatus: PropTypes.number,
        }),
        threadItemForType: PropTypes.shape({
          reservationId: PropTypes.number,
          startDate: PropTypes.string.isRequired,
          endDate: PropTypes.string.isRequired,
          personCapacity: PropTypes.number.isRequired,
          createdAt: PropTypes.string.isRequired,
          cancelData: PropTypes.shape({
            guestServiceFee: PropTypes.number,
            hostServiceFee: PropTypes.number,
            refundToGuest: PropTypes.number,
            payoutToHost: PropTypes.number,
            total: PropTypes.number,
            currency: PropTypes.string,
          })
        }),
        listData: PropTypes.shape({
          title: PropTypes.string.isRequired,
          listingData: PropTypes.shape({
            basePrice: PropTypes.number.isRequired,
            cleaningPrice: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
          }),
        }),
      }),
    }),
  };
  static defaultProps = {
    threadId: null,
  };
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    const { threadItemsData: { getThread: { threadItems }, fetchMore }, threadId } = this.props;

    fetchMore({
      query: GetMoreThreadItemsQuery,
      variables: {
        threadId,
        offset: threadItems.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }
        return {
          getThread: {
            ...previousResult.getThread,
            threadItems: [...previousResult.getThread.threadItems, ...fetchMoreResult.getAllThreadItems],
          },
        };
      },
    });
  }
  render() {
    const { threadItemsData: { loading, getThread }, userType, threadId, isAdminAuthenticated } = this.props;

    if (loading) {
      return <Loader type={'text'} />;
    }
    if (getThread && getThread.threadItemForType && getThread.hostProfile && getThread.guestProfile) {
      let receiverName = getThread.guestProfile.firstName;
      let hostUserBanStatus = getThread.hostUserData.userBanStatus;
      let guestUserBanStatus = getThread.guestUserData.userBanStatus;
      let senderName = getThread.hostProfile.firstName;
      let receiverType = 'guest', isListAvailable = false;
      let receiverEmail = getThread.guestUserData.email;
      if (userType === "guest") {
        receiverName = getThread.hostProfile.firstName;
        senderName = getThread.guestProfile.firstName;
        receiverType = 'host';
        receiverEmail = getThread.hostUserData.email;
      }
      let listPublishStatus;
      const initialValues = {
        threadId,
        threadType: userType,
        type: 'message',
        receiverName,
        senderName,
        receiverType,
        receiverEmail
      };

      if (getThread && getThread.listData) {
        isListAvailable = true
      }


      if (getThread && getThread.listData) {
        listPublishStatus = getThread.listData.isPublished
      }

      return (
        <div>
          <Row>
            {/* <Col lg={4} md={4} sm={7} xs={12} className={cx(s.space4, s.paddingRight, 'paddingRightAR')}> */}
            <Col lg={4} md={4} sm={7} xs={12} className={cx(s.space4)}>
              {
                !isAdminAuthenticated && !guestUserBanStatus && !hostUserBanStatus && <ActionBlock
                  threadType={userType}
                  actionType={getThread.threadItemForType.type}
                  threadId={threadId}
                  listId={getThread.listId}
                  reservationId={getThread.threadItemForType.reservationId}
                  startDate={getThread.threadItemForType.startDate}
                  endDate={getThread.threadItemForType.endDate}
                  personCapacity={getThread.threadItemForType.personCapacity}
                  createdAt={getThread.threadItemForType.createdAt}
                  hostDisplayName={getThread.hostProfile.displayName}
                  guestDisplayName={getThread.guestProfile.displayName}
                  guestEmail={getThread.guestUserData.email}
                  title={getThread.listData.title}
                  listPublishStatus={listPublishStatus}
                  reservationData={getThread.threadItemForType.reservation || {}}
                  country={getThread.listData.country}
                />
              }
             
            </Col>
            <Col lg={8} md={8} sm={5} xs={12} className={cx(s.sidebarDesign, s.space4, 'hidden-xs')}>
              <Row className={s.bgInfo}>
                <Col lg={4} md={4} sm={4} xs={12} className={cx(s.linkAvatarUser, 'linkAvatarUserAr')} >
                   <UserDetail
                    profileId={userType === 'host' ? getThread.guestProfile.profileId : getThread.hostProfile.profileId}
                    picture={userType === 'host' ? getThread.guestProfile.picture : getThread.hostProfile.picture}
                    displayName={userType === 'host' ? getThread.guestProfile.displayName : getThread.hostProfile.displayName}
                    location={userType === 'host' ? getThread.guestProfile.location : getThread.hostProfile.location}
                    reviewsCount={userType === 'host' ? getThread.guestProfile.reviewsCount : getThread.hostProfile.reviewsCount}
                    verifications={userType === 'host' ? getThread.guestProfile.userVerification : getThread.hostProfile.userVerification}
                  />
                </Col>
                <Col lg={8} md={8} sm={8} xs={12}>
                  {
                  isListAvailable && <TripDetails
                  listId={getThread.listId}
                  userType={userType}
                  title={getThread.listData.title}
                  basePrice={getThread.listData.listingData.basePrice}
                  cleaningPrice={getThread.listData.listingData.cleaningPrice}
                  monthlyDiscount={getThread.listData.listingData.monthlyDiscount}
                  weeklyDiscount={getThread.listData.listingData.weeklyDiscount}
                  currency={getThread.listData.listingData.currency}
                  startDate={getThread.threadItemForType.startDate}
                  endDate={getThread.threadItemForType.endDate}
                  personCapacity={getThread.threadItemForType.personCapacity}
                  cancelData={getThread.threadItemForType.cancelData}
                  reservationData={getThread.threadItemForType.reservation || undefined}
                  />
                  }
                </Col>
              </Row>
              {
                !isListAvailable && <FormattedMessage {...messages.noList} />
              }
               {/* <div className="hidden-xs">
                <GuestHostDetails
                  userType={userType}
                  threadId={threadId}
                  getThread={getThread}
                  account={account}
                />
              </div> */}
              <div className={s.areaChatBox}>
                <ThreadItems
                  userType={userType}
                  threadId={threadId}
                  data={getThread}
                  loadMore={this.loadMore}
                />
                {
                  !isAdminAuthenticated && <SendMessage
                    initialValues={initialValues}
                    threadId={threadId}
                    profileId={userType === 'host' ? getThread.hostProfile.profileId : getThread.guestProfile.profileId}
                    picture={userType === 'host' ? getThread.hostProfile.picture : getThread.guestProfile.picture}
                    displayName={userType === 'host' ? getThread.hostProfile.displayName : getThread.guestProfile.displayName}
                  />
                }
              </div>
            </Col>
            <Col lg={8} md={8} sm={4} xs={12} className={cx(s.sidebarDesign, s.space4, 'visible-xs')}>
              <UserDetail
                profileId={userType === 'host' ? getThread.guestProfile.profileId : getThread.hostProfile.profileId}
                picture={userType === 'host' ? getThread.guestProfile.picture : getThread.hostProfile.picture}
                displayName={userType === 'host' ? getThread.guestProfile.displayName : getThread.hostProfile.displayName}
                location={userType === 'host' ? getThread.guestProfile.location : getThread.hostProfile.location}
                reviewsCount={userType === 'host' ? getThread.guestProfile.reviewsCount : getThread.hostProfile.reviewsCount}
                verifications={userType === 'host' ? getThread.guestProfile.userVerification : getThread.hostProfile.userVerification}
              />
              {
                isListAvailable && <TripDetails
                  listId={getThread.listId}
                  userType={userType}
                  title={getThread.listData.title}
                  basePrice={getThread.listData.listingData.basePrice}
                  cleaningPrice={getThread.listData.listingData.cleaningPrice}
                  monthlyDiscount={getThread.listData.listingData.monthlyDiscount}
                  weeklyDiscount={getThread.listData.listingData.weeklyDiscount}
                  currency={getThread.listData.listingData.currency}
                  startDate={getThread.threadItemForType.startDate}
                  endDate={getThread.threadItemForType.endDate}
                  personCapacity={getThread.threadItemForType.personCapacity}
                  cancelData={getThread.threadItemForType.cancelData}
                  reservationData={getThread.threadItemForType.reservation || undefined}
                />
              }
              {
                !isListAvailable && <FormattedMessage {...messages.noList} />
              }
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <Grid>
        <Row>
          <Col lg={4} md={4} sm={7} xs={12} className={cx(s.space4)}>
            <SubnavBar />
          </Col>
          
          <Col lg={8} md={8} sm={5} xs={12} className={s.textWhite}>
            <FormattedMessage {...messages.noThreadFound} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
const mapState = (state) => ({
  isAdminAuthenticated: state.runtime.isAdminAuthenticated,
  account: state.account.data,
});
const mapDispatch = {};
export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(GetThreadQuery, {
    name: 'threadItemsData',
    options: props => ({
      variables: {
        threadId: props.threadId,
        threadType: props.userType,
      },
      ssr: false,
      //pollInterval: 5000,
      fetchPolicy: 'network-only',
    }),
  }),
)(ViewMessage);
