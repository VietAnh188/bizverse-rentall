import React from 'react';
import { match } from 'node-match-path'

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Breadcrumb.css';
import history from '../../core/history';
import { FormattedMessage } from 'react-intl';
import ArrowRight from 'react-icons/lib/fa/chevron-right'

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

// HOST PAGES
const HOST_PAGES = [
  '/rooms',
  '/reservation/current',
  '/reservation/previous'
];

class Breadcrumb extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }
    
  componentDidMount() {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }

  isMatch(path) {
    const { location } = this.state;
    const result = match(path, location);

    return result.matches;
  }
 
  getPage() {
    switch(true) {

      case this.isMatch('/dashboard'):
        return <FormattedMessage {...messages.dashboard} />

      case this.isMatch('/inbox'):
        return <FormattedMessage {...messages.inbox} />  

      case this.isMatch('/nft/inventory'):
        return <FormattedMessage {...messages.inventory} />

      case this.isMatch('/nft/marketplace'):
        return <FormattedMessage {...messages.marketplace} />

      case this.isMatch('/message/:id'):
      case this.isMatch('/message/:id/:subpath'):
        return <FormattedMessage {...messages.message} />
      
      case this.isMatch('/rooms'):
        return <FormattedMessage {...messages.manageListing} />

      case this.isMatch('/reservation/current'):
        return <FormattedMessage {...messages.yourReservations} />
      case this.isMatch('/reservation/previous'):
        return <FormattedMessage {...messages.transactionHistory} />
      
      case this.isMatch('/trips/current'):
      case this.isMatch('/trips/previous'):
        return <FormattedMessage {...messages.yourTrips} />
      
      case this.isMatch('/user/edit'):
        return <FormattedMessage {...messages.editProfile} />
      case this.isMatch('/user/photo'):
        return <FormattedMessage {...messages.profilePhoto} />

      case this.isMatch('/user/verification'):
      case this.isMatch('/document-verification'):
        return <FormattedMessage {...messages.userVerification} />
        
      case this.isMatch('/user/reviews'):
        return <FormattedMessage {...messages.profile} />
      
      case this.isMatch('/user/payout'):
      case this.isMatch('/user/addpayout'):
      case this.isMatch('/user/transaction'):
      case this.isMatch('/user/security'):
        return <FormattedMessage {...messages.account} />

      case this.isMatch('/wishlists'):
      case this.isMatch('/wishlists/:id'):
        return <FormattedMessage {...messages.wishList} />

      case this.isMatch('/s'):
        return <FormattedMessage {...messages.search} />

      case this.isMatch('/become-a-host'):
      case this.isMatch('/become-a-host/:id'):
      case this.isMatch('/become-a-host/:id/:subpath'):
        return <FormattedMessage {...messages.listYourSpace} />

      case this.isMatch('/help'):
        return <FormattedMessage {...messages.help} />

      case this.isMatch('/users/trips/itinerary/:id'):
        return <FormattedMessage {...messages.itinerary} />

      case this.isMatch('/users/trips/receipt/:id'):
        return <FormattedMessage {...messages.yourTripReceipt} />

      case this.isMatch('/cancel/:id/guest'):
        return <FormattedMessage {...messages.cancelYourTrip} />
      
      case this.isMatch('/cancel/:id/host'):
        return <FormattedMessage {...messages.cancelYourReservation} />

      case this.isMatch('/nft/create'):
        return <FormattedMessage {...messages.createNFT} />

      case this.isMatch('/book/:id'):
        return <FormattedMessage {...messages.booking} />

      case this.isMatch('/checkIn-timeline/host'):
      case this.isMatch('/checkIn-timeline/guest'):
        return <FormattedMessage {...messages.checkInTimeline} />

      case this.isMatch('/nft/:id'):
        return <FormattedMessage {...messages.detailNFT} />

      default:
        return ''
    }
  }

  getReservationId = () => {
    const { location } = this.state;

    switch(true) {
      case this.isMatch('/users/trips/itinerary/:id'):
      case this.isMatch('/users/trips/receipt/:id'):
        const parts = location.split("/")

        return parts[parts.length - 1]

      default:
        return null;
    }
  }

  isMessagePage = () => this.isMatch('/message/:id') || this.isMatch('/message/:id/:subpath')

  handleGoBack = () => {
    history.goBack();
  }

  handleGoToInbox = () => {
    history.push("/inbox")
  }

  handleGoToHome = () => {
    history.push("/")
  }

  changeViewType = () => {
  const { viewType } = this.props;
  let formatText = '';

  if (viewType === 'recommended') {
    formatText = <FormattedMessage {...messages.searchRecommended} />
  } else if (viewType === 'mostviewed') {
    formatText = <FormattedMessage {...messages.searchMostViewed} />
  } else return '';
  return (
    <div className={s.breadcrumbItem}>
      <ArrowRight className={cx(s.iconArrow, s.iconArrowRemoveMarginLeft, 'iconArrowAr')} />
        <span className={cx(s.breadcrumbItem, s.breadcrumbItemActive, s.textCustomMarginLeft)}>
          {formatText}
        </span>
    </div>
  )
  }

  render() {
    const { location } = this.state;
    const isHostPage = HOST_PAGES.includes(location)
    const reservationId = this.getReservationId()
    const isMessagePage = this.isMessagePage();

    return (
      <div className={cx(s.breadcrumbContainer, s.bizverseBorder, s.bizverseBorderTop, "hidden-xs", "hidden-print")}>
        <div className={cx(s.breadcrumb)}>
          <div className={s.breadcrumbItem}>
            <a onClick={this.handleGoToHome} className={s.home}><FormattedMessage {...messages.home} /></a>
            <ArrowRight className={cx(s.iconArrow, 'iconArrowAr')} /> 
          </div>

          {!!reservationId && <div className={s.breadcrumbItem}>
            <a onClick={this.handleGoBack} className={s.home}><FormattedMessage {...messages.host} /></a>
            <ArrowRight className={cx(s.iconArrow, 'iconArrowAr')} /> 
          </div>}

          {!!isMessagePage && <div className={s.breadcrumbItem}>
            <a onClick={this.handleGoToInbox} className={s.home}><FormattedMessage {...messages.inbox} /></a>
            <ArrowRight className={cx(s.iconArrow, 'iconArrowAr')} /> 
          </div>}

          {isHostPage &&  <div className={cx(s.breadcrumbItem)}>
            <FormattedMessage {...messages.host} />
            <ArrowRight className={cx(s.iconArrow, 'iconArrowAr')} />
          </div>}

          <div className={cx(s.breadcrumbItem, s.breadcrumbItemActive)}>
            {this.getPage()}
          </div>
          {
            this.changeViewType()
          }
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  viewType: state.search.viewType,
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Breadcrumb));






