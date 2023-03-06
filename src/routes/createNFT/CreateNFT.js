import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

// Styles
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CreateNFT.css';
import bt from '../../components/commonStyle.css';

// Locale
import messages from '../../locale/messages';

// Core
import history from '../../core/history';

// Helpers
import { debounce } from '../../helpers/debounce';
import { getList } from '../../selector/general';
import { formatURL } from "../../helpers/formatURL";

// Actions
import { getListings } from '../../actions/Listing/getListings';

// Components
import { 
  Grid,
  Button
} from 'react-bootstrap';
import Autocomplete from 'react-autocomplete'

class CreateNFT extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedListing: null,
      search: ''
    }
  }

  fetchListings = debounce(() => {
    const { getListings } = this.props;
    const { search} = this.state;

    getListings({
      search,
      page: 1,
      limit: 20
    })
  }, 150)

  componentWillMount() {
    this.fetchListings();
  }

  handleOnChangeSelectedListing = (selectedListing) => {
    this.setState({
      selectedListing,
      search: selectedListing
    })
  }

  handleOnChangeSearch = (event) => {
    this.setState({
      search: event.target.value,
      selectedListing: null
    }, () => {
      this.fetchListings();
    })
  }

  handleCreateNFT = () => {
    const { listings = [] } = this.props;
    const { selectedListing } = this.state;
    const listing = listings.find(item => item.title === selectedListing)

    history.push(`/rooms/${formatURL(listing.title)}-${listing.id}`);
  }

  renderItem = (item, isHighlighted) => (
    <div className={cx(s.menuItem, {
      [isHighlighted]: s.activeMenuItem
    })}>
      {item.title}
    </div>
  )

  renderMenu = (items, value, style) => {
    if (!items.length) {
      return (
        <div className={cx(s.menu, s.bizverseBox, s.bizverseBoxSecondary)} style={{ ...style }}>
          <div className={s.menuItem}>No listing</div>
        </div>
      )
    }

    return <div className={cx(s.menu, s.bizverseBox, s.bizverseBoxSecondary)} style={{ ...style }} children={items}/>
  }

  render() {
    const { listings = [] } = this.props;
    const { selectedListing, search } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <Grid fluid className={s.container}>
        <div className={cx(s.landingContainer)}>

          <div className={s.selectingNFTForm}>
            <div className={cx(s.selectingNFTGroup)}>
              {/* <label className={s.selectingNFTLabel}>Select listing</label> */}
              <Autocomplete
                getItemValue={(item) => item.title}
                items={listings}
                renderMenu={this.renderMenu}
                renderItem={this.renderItem}
                value={search}
                onChange={this.handleOnChangeSearch}
                onSelect={this.handleOnChangeSelectedListing}
                wrapperProps={{
                  className: cx(s.selectInputWrapper)
                }}
                inputProps={{
                  className: cx(s.selectInput),
                  placeholder: formatMessage(messages.searchYourListings)
                }}
              />
            </div>

            <Button onClick={this.handleCreateNFT} bsSize="small" className={cx(bt.btnPrimary, bt.btnLarge, s.btnCreate)} type="submit" disabled={!selectedListing}>
              {formatMessage(messages.createNFT)}
            </Button>
          </div>
        </div>
      </Grid>
    )
  }
}

const mapState = (state) => ({
  listings: getList(state.listing),
  isProcessing: state.listing.isProcessing
});

const mapDispatch = {
  getListings
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CreateNFT)));