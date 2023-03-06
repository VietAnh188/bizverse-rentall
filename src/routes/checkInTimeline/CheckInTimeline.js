import React from 'react';
import { connect } from 'react-redux';
import { getList } from '../../selector/general';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import {
  Grid,
  Row,
  Col,
  Panel
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CheckInTimeline.css';
import cx from 'classnames';
import bt from '../../components/commonStyle.css';

// Actions
import { getCheckInTimeline } from '../../actions/nft/getCheckInTimeline';

// Component
import SideMenu from './SideMenu';
import CheckInTimeline from '../../components/CheckInTimeline';
import NoItem from '../../components/CheckInTimeline/NoItem';
import Loader from '../../components/Loader';
import CustomPagination from '../../components/CustomPagination';

// constants
const LIMIT = 5;

// Locale
import messages from '../../locale/messages';

class CheckInTimelineContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  paginationData = (currentPage) => {
    const { getCheckInTimeline, type } = this.props;

    this.setState({ currentPage });
    getCheckInTimeline({
      page: currentPage,
      type,
      limit: LIMIT
    })  
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      const { getCheckInTimeline, type } = this.props;

      this.setState({ currentPage: 1 });
      getCheckInTimeline({
        page: 1,
        type,
        limit: LIMIT
      })  
    }
  }

  componentDidMount() {
    const { getCheckInTimeline, type } = this.props;

    getCheckInTimeline({
      page: 1,
      type,
      limit: LIMIT
    })    
  }

  render() {
    const { isProcessing, nfts = [], userType, type, count } = this.props;
    const { currentPage } = this.state;
    const { formatMessage } = this.props.intl;
    let title = "CheckIn calendar"

    return (
      <div>
        <Grid fluid className={s.container}>
          <Row className={s.landingContainer}>
            <SideMenu />
            <Col xs={12} sm={9} md={9} lg={9}>
              <div className={cx(s.bizverseBox, s.bizverseBoxPrimary, 'commonListingBg', 'tripContainer')}>
                <Panel className={s.panelHeader}>
                <div>
                    <h3 className={cx(bt.listingTitleText, s.emptyTitle)}>
                      {type === 'host' ? (
                         <FormattedMessage {...messages.guestCheckIn} />
                      ) : (
                        <FormattedMessage {...messages.hostCheckIn} />
                      )}
                    </h3>
                  </div>
                  {
                    isProcessing && <Loader type={"text"} />
                  }

                  {!isProcessing && !nfts.length && (
                    <p className={s.noPlan}>
                      {type === 'host' ? (
                         <FormattedMessage {...messages.noGuestCheckIn} />
                      ) : (
                        <FormattedMessage {...messages.noHostCheckIn} />
                      )}
                    </p>
                  )}
                  {
                    !isProcessing && nfts.length > 0 && 
                    <CheckInTimeline
                      nfts={nfts}
                      key={type}
                    />
                  }
                  {
                    nfts.length > 0 && <CustomPagination
                      total={count}
                      currentPage={currentPage}
                      defaultCurrent={1}
                      defaultPageSize={LIMIT}
                      change={this.paginationData}
                      paginationLabel={formatMessage(messages.panelReservation)}
                    />
                  }
                  {
                    !isProcessing && !nfts.length && <NoItem
                      userType={userType}
                      type="CheckIn"
                    />
                  }
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
  nfts: getList(state.nft),
  isProcessing: state.nft.isProcessing,
  count: state.nft.count
});

const mapDispatch = {
  getCheckInTimeline
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CheckInTimelineContainer)));