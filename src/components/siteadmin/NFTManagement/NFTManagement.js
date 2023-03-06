import React from 'react';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import moment from 'moment';

// Redux Action
import { removeListing } from '../../../actions/siteadmin/ListingManagement/removeListing';
import { togglePublishListing } from '../../../actions/siteadmin/ListingManagement/publicListing'
import {
  addListToRecommended,
  removeListFromRecommended
} from '../../../actions/siteadmin/ListingManagement/manageRecommend';

// Config
import { MARKETPLACE_URL } from '../../../config'

// import messages from './messages';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Import action
import { toggleNFTTrending } from '../../../actions/toggleNFTTrending';

// Components
import Loader from '../../../components/Loader'

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NFTManagement.css';
import CustomPagination from '../../CustomPagination';
import adminGetAllNFTs from './adminGetAllNFTs.graphql';
import { FormControl } from 'react-bootstrap';

class ListingManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  paginationData(currentPage) {
    const { adminGetAllNFTsQuery: { refetch } } = this.props;
    let variables = { page: currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  handleClick(searchList) {
    const { adminGetAllNFTsQuery: { refetch } } = this.props;
    let variables = {
      page: 1,
      searchText: searchList
    };
    this.setState({ currentPage: 1 });
    refetch(variables);
  }
  handleSearchChange = (e) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      searchList: e.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450)
    });
  }

  handleToggleNFTisTrending = async (id, isTrending) => {
    const { adminGetAllNFTsQuery: { refetch }, toggleNFTTrending } = this.props;
    await toggleNFTTrending(id, isTrending);
    refetch();
  }

  render() {
    const { adminGetAllNFTsQuery: { loading, adminGetAllNFTs = {} } = {}, isTrending, id } = this.props;
    const { currentPage } = this.state;
    const { formatMessage } = this.props.intl;

    const { results: { count = 0, rows = [] } = {} } = adminGetAllNFTs || {}

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.nftsManagement} /></h1>
          <div className={cx(s.exportSection, s.exportSectionGridSub)}>
            <div>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.search)}
                onChange={(e) => this.handleSearchChange(e)}
                className={cx('searchInputControl', 'searchInputControlWidth', 'searchInputControlAR')}
              />
            </div>
            <div>
            </div>
          </div>
          <div className={cx('table-responsive', 'listing-table', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table className="table"
              noDataText={loading ? '' : formatMessage(messages.noRecordFound)}
              sortable={true}
              defaultSort={{ column: 'Id', direction: 'desc' }}
            >
             <Thead>
              <Th scope="col">{formatMessage(messages.idLabel)}</Th>
              <Th scope="col">{formatMessage(messages.name)}</Th>
              <Th scope="col">{formatMessage(messages.checkIn)}</Th>
              <Th scope="col">{formatMessage(messages.checkOut)}</Th>
              <Th scope="col">{formatMessage(messages.country)}</Th>
              <Th scope="col">{formatMessage(messages.city)}</Th>
              {/* <Th scope="col">{formatMessage(messages.address)}</Th> */}
              <Th scope="col">Created type</Th>
              <Th scope="col">Trending</Th>
              <Th scope="col">On Marketplace</Th>
              <Th scope="col">{formatMessage(messages.selling)}</Th>
              <Th scope="col">View on marketplace</Th>
              <Th scope="col">View Listing</Th>
              <Th scope="col">Original owner</Th>
              <Th scope="col">Owner</Th>
            </Thead>

              {
                count > 0 && rows.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)} data={value.id} />
                      <Td data-label={formatMessage(messages.name)} column={formatMessage(messages.name)} data={value.name} />
                      <Td data-label={formatMessage(messages.checkIn)} column={formatMessage(messages.checkIn)} data={moment(value.checkIn).format('MM/DD/YYYY')} />
                      <Td data-label={formatMessage(messages.checkOut)} column={formatMessage(messages.checkOut)} data={moment(value.checkOut).format('MM/DD/YYYY')} />
                      <Td data-label={formatMessage(messages.country)} column={formatMessage(messages.country)} data={value.country} />
                      <Td data-label={formatMessage(messages.city)} column={formatMessage(messages.city)} data={value.city} />
                      {/* <Td data-label={formatMessage(messages.address)} column={formatMessage(messages.address)} data={value.address} /> */}
                      <Td data-label="Created type" column="Created type" data={value.isHostMinted ? 'Minted by host' : 'Claim by guest'} />
                      {
                        <Td data-label="Trending" column="Trending">
                          <>
                            {value.isTrending ? 'Yes' : 'No'}
                            <div>
                              <a href="javascript:void(0)" onClick={() => {this.handleToggleNFTisTrending(value.id, value.isTrending)}} >
                                {value.isTrending ? 'Turn off' : 'Turn on'}
                              </a>
                            </div>
                          </>
                        </Td>
                      }
                      <Td data-label="On Marketplace" column="On Marketplace" data={value.isOnMarketplace ? 'Yes' : 'No'} />
                      <Td data-label={formatMessage(messages.selling)} column={formatMessage(messages.selling)} data={value.isSelling ? `${value.currentPrice} ${value.currency}` : ''} />
                      
                      <Td data-label="View on marketplace" column="View on marketplace">
                        {value.isOnMarketplace ? (
                          <a
                            href={`${MARKETPLACE_URL}/marketplace/detail/${value.id}`}
                            target="_blank" 
                            rel="noreferrer"
                          >
                            <FormattedMessage {...messages.viewLabel} />
                          </a>
                        ) : null}
                      </Td>

                      <Td data-label="View Listing" column="View Listing">
                        <a
                          href={`/rooms/${value.listId}`}
                          target="_blank" 
                          rel="noreferrer"
                        >
                          <FormattedMessage {...messages.viewLabel} />
                        </a>
                      </Td>

                      <Td data-label="Original owner" column="Original owner" data={value.claimWallet || value.originalOwner} />
                      <Td data-label="Owner" column="Owner" data={value.owner} />
                    </Tr>
                  )
                })
              }
            </Table>

            {/* Indicator */}
            {loading && <Loader type="text" />}
          </div>
          <div>
            {
              count > 0
              && <div>
                <CustomPagination
                  total={count}
                  currentPage={currentPage}
                  defaultCurrent={1}
                  defaultPageSize={10}
                  change={this.paginationData}
                  paginationLabel="NFTs"
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({});

const mapDispatch = {
  removeListing,
  addListToRecommended,
  removeListFromRecommended,
  togglePublishListing,
  toggleNFTTrending
};
export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(adminGetAllNFTs, {
    name: 'adminGetAllNFTsQuery',
    options: {
      variables: {
        page: 1,
        searchText: ''
      },
      fetchPolicy: 'network-only',
    }
  })
)(ListingManagement);