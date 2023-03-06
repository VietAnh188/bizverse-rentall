import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import { isEqual } from 'lodash';

// Styles
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Inventory.css';

// Locale
import messages from '../../locale/messages';

// Core
import history from '../../core/history';

// Helpers
import { debounce } from '../../helpers/debounce';

// Actions
import { getNFTs } from '../../actions/nft/getNFTs';

// Components
import { Grid } from 'react-bootstrap';
import NFTs from './NFTs';
import NFTDateRange from './NFTDateRange'
import NFTTypes from './NFTTypes';
import NFTSearch from './NFTSearch';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';

export const TYPES = {
  host: 'host',
  guest: 'guest'
}

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: TYPES.host,
      currentPage: 1,
      search: '',
      startDate: undefined,
      endDate: undefined,
      isSelling: false,
      isSold: false,
      selectedNFTs: []
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { activeKey, currentPage, search, startDate, endDate, isSelling, isSold, selectedNFTs } = this.state;
     const searchParams = new URLSearchParams(history?.location?.search);
     const page = searchParams.get("page") || 1
     const type = searchParams.get("type") || 'host'
     const nextSearch = searchParams.get("search") || ''
     const nextStartDate = searchParams.get("startDate") || undefined
     const nextEndDate = searchParams.get("endDate") || undefined
     const initialIsSelling = searchParams.has("isSelling") ? !!Number(searchParams.get("isSelling")) : 0
     const initialIsSold = searchParams.has("isSold") ? !!Number(searchParams.get("isSold")) : 0

     const shouldFetch = activeKey !== type 
      || Number(page) !== currentPage 
      || search !== nextSearch 
      || startDate !== nextStartDate 
      || endDate !== nextEndDate 
      || initialIsSelling !== isSelling 
      || initialIsSold !== isSold 
    
    if (shouldFetch) {
      this.fetchNFTs({ activeKey: type, 
        currentPage: Number(page), 
        search: nextSearch, 
        startDate: nextStartDate, 
        endDate: nextEndDate, 
        isSelling: initialIsSelling, 
        isSold: initialIsSold 
      })
    }

    return shouldFetch || !isEqual(selectedNFTs, nextState.selectedNFTs)
  }

  fetchNFTs = debounce((data) => {
    const { 
      activeKey, 
      currentPage, 
      search, 
      startDate, 
      endDate, 
      isSelling, 
      isSold 
    } =  data || this.state;
    const { getNFTs } = this.props;

    getNFTs({ 
      page: currentPage, 
      type: activeKey, 
      search, 
      checkIn: startDate, 
      checkOut: endDate,
      isSelling: isSelling,
      isSold: isSold
    })
  }, 150)


  componentDidMount() {
		const searchParams = new URLSearchParams(history?.location?.search || '');
    const activeKey = searchParams.get("type") || TYPES.host
    const currentPage = searchParams.get("page") || 1
    const search = searchParams.get("search") || ''
    const startDate = searchParams.get("startDate") || ''
    const endDate = searchParams.get("endDate") || ''
    const isSelling = searchParams.get("isSelling") || 0
    const isSold = searchParams.get("isSold") || 0

    searchParams.set("type", activeKey)
    searchParams.set("page", currentPage)
    searchParams.set("search", search)
    searchParams.set("startDate", startDate)
    searchParams.set("endDate", endDate)

    if (activeKey === TYPES.host) {
      searchParams.set("isSelling", isSelling)
      searchParams.set("isSold", isSold)
    }

    if (history?.replace) {
      history.replace({
        search: searchParams.toString()
      })
    }

    this.setState({
      activeKey,
      currentPage: Number(currentPage),
      search,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined,
      isSelling: !!Number(isSelling),
      isSold: !!Number(isSold),
      shouldFetch: true
    }, () => {
      this.fetchNFTs();
    })
	}

  handleUpdateSelectedNFTs = (selectedNFTs = []) => {
    this.setState({
      selectedNFTs
    })
  }

  handleUpdateStateAndResetData = (state = {}, searchParams) => {
    this.setState({
      ...state,
      currentPage: 1,
      selectedNFTs: []
    })


    const nextSearchParams = searchParams || new URLSearchParams(history?.location?.search);
    nextSearchParams.set('page', 1);

    history.replace({
      search: nextSearchParams.toString()
    })
  }

  handleRefetchData = () => {
    this.handleUpdateStateAndResetData();
    this.fetchNFTs();
  }

  handleChangeType = type => () => {
    const searchParams = new URLSearchParams(history?.location?.search);
    searchParams.set('type', type)

    this.handleUpdateStateAndResetData({ activeKey: type }, searchParams)
  }

  handleChangeSearchText = (search) => {
    const searchParams = new URLSearchParams(history?.location?.search);
    searchParams.set('search', search)

    this.handleUpdateStateAndResetData({ search }, searchParams)
  }

  handleChangeDates = ({ startDate, endDate }) => {
    const newStartDate = startDate ? moment(startDate).format('YYYY-MM-DD') : undefined
    const newEndDate = endDate ? moment(endDate).format('YYYY-MM-DD') : undefined
    const searchParams = new URLSearchParams(history?.location?.search);
    searchParams.set('startDate', newStartDate || '')
    searchParams.set('endDate', newEndDate || '')

    this.handleUpdateStateAndResetData({ 
      startDate: newStartDate,
      endDate: newEndDate 
    }, searchParams)
  }

  handleClearStartDate = () => {
    const searchParams = new URLSearchParams(history?.location?.search);
    searchParams.set('startDate', '')
    
    this.handleUpdateStateAndResetData({ 
      startDate: undefined
    }, searchParams)
  }

  handleClearEndDate = () => {
    const searchParams = new URLSearchParams(history?.location?.search);
    
    searchParams.set('endDate', '')
    
    this.handleUpdateStateAndResetData({ 
      endDate: undefined
    }, searchParams)
  }

  handleOnClickBack = () => {
    const { currentPage } = this.state;
    const searchParams = new URLSearchParams(history?.location?.search);
    searchParams.set('page', currentPage - 1)

    this.setState({
      currentPage: currentPage - 1,
      selectedNFTs: []
    })

    history.replace({
      search: searchParams.toString()
    })
  }

  handleOnClickNext = () => {
    const { currentPage } = this.state;
    const searchParams = new URLSearchParams(history?.location?.search);
    searchParams.set('page', currentPage + 1)

    this.setState({
      currentPage: currentPage + 1,
      selectedNFTs: []
    })

    history.replace({
      search: searchParams.toString()
    })
  }

  handleOnChangeIsSelling = value => {
    const searchParams = new URLSearchParams(history?.location?.search);
    searchParams.set('isSelling', value ? 1 : 0 )
    searchParams.set('isSold', 0 )

    this.handleUpdateStateAndResetData({ 
      isSelling: value,
      isSold: false,
    }, searchParams)
  }

  handleOnChangeIsSoldOut = value => {
    const searchParams = new URLSearchParams(history?.location?.search);
    searchParams.set('isSold', value ? 1 : 0 )
    searchParams.set('isSelling', 0)

    this.handleUpdateStateAndResetData({ 
      isSold: value,
      isSelling: false,
    }, searchParams)
  }

  render() {
    const { activeKey, startDate, endDate, search, currentPage, isSelling, isSold, selectedNFTs } = this.state;
    const { intl: { formatMessage } = {} } = this.props;

    return (
      <Grid fluid className={s.container}>
        <div className={cx(s.landingContainer, 'nfts-tabs-container')}>
          <NFTTypes onChangeType={this.handleChangeType} type={activeKey} />
          
          <div className={cx(s.searchForm, 'search-nft')}>
            <div className={s.dateRangeContainer}>
              <div className={s.dateRangeLabelContainer}>
                <span className={s.dateRangeLabel}>{formatMessage(messages.checkIn)}
                  {!!startDate && <span onClick={this.handleClearStartDate} className={cx(s.clearDate, s.bizverseLink)}>{formatMessage(messages.clear)}</span>}
                </span>
                <span className={s.dateRangeLabel}>{formatMessage(messages.checkOut)}
                  {!!endDate && <span onClick={this.handleClearEndDate} className={cx(s.clearDate, s.bizverseLink)}>{formatMessage(messages.clear)}</span>}
                </span>
              </div>
              <NFTDateRange onDatesChange={this.handleChangeDates} startDate={startDate} endDate={endDate} />
            </div>
            
            <div className={s.statesWrapper}>

              {/* Checkbox isSelling */}
              <div className={s.stateWrapper}>
                <CustomCheckbox
                  id="sellingNFTs"
                  checked={isSelling}
                  className={cx('icheckbox_square-green')}
                  onChange={this.handleOnChangeIsSelling}
                />
                <label className={s.stateLabel} htmlFor="sellingNFTs">{formatMessage(messages.onMarketplace)}</label>
              </div>

              {/* Checkbox isSold */}
              <div className={s.stateWrapper}>
                <CustomCheckbox
                  id="soldNFTs"
                  checked={isSold}
                  className={cx('icheckbox_square-green')}
                  onChange={this.handleOnChangeIsSoldOut}
                />
                <label className={s.stateLabel} htmlFor="soldNFTs">{formatMessage(messages.soldNFTs)}</label>
              </div>
            </div>

            <NFTSearch onChange={this.handleChangeSearchText} search={search} />
          </div>
          
          <NFTs
            type={activeKey} 
            page={currentPage} 
            onClickNext={this.handleOnClickNext}
            onClickBack={this.handleOnClickBack}
            isSold={isSold}
            isSelling={isSelling}
            onRefetchData={this.handleRefetchData}
            selectedNFTs={selectedNFTs}
            onUpdateSelectedNFTs={this.handleUpdateSelectedNFTs}
            setIsSelling={this.handleOnChangeIsSelling}
          />
        </div>
      </Grid>
    );
  }
}

const mapDispatch = {
  getNFTs
};

export default injectIntl(withStyles(s)(connect(null, mapDispatch)(Inventory)));
