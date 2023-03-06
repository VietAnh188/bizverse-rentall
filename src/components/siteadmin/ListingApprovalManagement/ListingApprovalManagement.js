import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

// import messages from './messages';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingApprovalManagement.css';
import CustomPagination from '../../CustomPagination/CustomPagination';
import listingsQuery from './listingsQuery.graphql';
import { FormControl } from 'react-bootstrap';

import { approveListing } from '../../../actions/Listing/ManagePublishStatus';
import { openCommentModal, closeCommentModal, openHistoryModal } from '../../../actions/modalActions';
import CommentModal from './CommentModal/CommentModal';
import HistoryModal from './HistoryModal/HistoryModal';

class ListingApprovalManagement extends React.Component {

  static propTypes = {
    getAllPermissionListings: PropTypes.array,
  };
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
    this.handleApprove = this.handleApprove.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  async handleApprove(event, listId) {
    const { getAllPermissionListings: { refetch }, openCommentModal } = this.props;
    const { approveListing } = this.props;
    const { currentPage } = this.state;
    let variables = { currentPage };

    if (event.target.value === 'approved') {
      await approveListing(listId, event.target.value);
      refetch(variables);
    } else if (event.target.value === 'declined') {
      openCommentModal(listId);
    }
  }

  async handleDecline(listId, comment) {
    const { getAllPermissionListings: { refetch }, closeCommentModal } = this.props;
    const { approveListing } = this.props;
    const { currentPage } = this.state;
    let variables = { currentPage };
    if (comment) {
      await approveListing(listId, 'declined', comment);
      refetch(variables);
      closeCommentModal();
    } else {
      toastr.error("Failed!", 'Please comment a valid reason.');
    }
  }

  paginationData(currentPage) {
    const { getAllPermissionListings: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  handleClick(searchList) {
    const { getAllPermissionListings: { refetch } } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList
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

  render() {
    const { getAllPermissionListings: { loading, getAllPermissionListings }, openHistoryModal } = this.props;
    const { formatMessage } = this.props.intl; return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <CommentModal handleDecline={this.handleDecline} />
        <HistoryModal />
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.listingApproval} /></h1>
          <div className={cx(s.exportSection, s.exportSectionGridSub)}>
            <div>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.search)}
                onChange={(e) => this.handleSearchChange(e)}
                className={cx('searchInputControl', 'searchInputControlWidth', 'searchInputControlAR')}
              />
            </div>
          </div>
          <div className={cx('table-responsive', 'listing-table', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table className="table"
              noDataText={formatMessage(messages.noRecordFound)}
              sortable={true}
              defaultSort={{ column: 'Id', direction: 'desc' }}
            >
              <Thead>
                <Th scope="col">{formatMessage(messages.idLabel)}</Th>
                <Th scope="col">{formatMessage(messages.adminTitleLabel)}</Th>
                <Th scope="col">{formatMessage(messages.hostNameLabel)}</Th>
                <Th scope="col">{formatMessage(messages.hostEMailLabel)}</Th>
                <Th scope="col">{formatMessage(messages.status)}</Th>
                <Th scope="col">{formatMessage(messages.submittedOn)}</Th>
                <Th scope="col">{formatMessage(messages.editLabel)}</Th>
                <Th scope="col">{formatMessage(messages.viewLabel)}</Th>
                <Th scope="col">{formatMessage(messages.history)}</Th>
              </Thead>

              {
                getAllPermissionListings && getAllPermissionListings.results.length > 0 && getAllPermissionListings.results.map((value, key) => {
                  let viewListing = "/rooms/" + value.id;
                  let editListing = '/become-a-host/' + value.id + '/home';
                  let status = value.listApprovalStatus;
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)} data={value.id} />
                      <Td data-label={formatMessage(messages.adminTitleLabel)} column={formatMessage(messages.adminTitleLabel)} data={value.title} />
                      <Td data-label={formatMessage(messages.hostNameLabel)} column={formatMessage(messages.hostNameLabel)} data={value.user.profile.firstName} />
                      <Td data-label={formatMessage(messages.hostEMailLabel)} column={formatMessage(messages.hostEMailLabel)} data={value.user.email} />
                      {
                        <Td data-label={formatMessage(messages.status)} column={formatMessage(messages.status)}>
                          <select className={cx(s.formSelect, s.formSelectNew)} onChange={(e) => this.handleApprove(e, value.id)} value={status}>
                            <option value="pending">{formatMessage(messages.messageStatus5)}</option>
                            <option value="approved">{formatMessage(messages.approved)}</option>
                            <option value="declined">{formatMessage(messages.declined)}</option>
                          </select>
                        </Td>
                      }
                      <Td data-label={formatMessage(messages.submittedOn)} column={formatMessage(messages.submittedOn)} data={value.submittedOn && moment(value.submittedOn.createdAt).format('MM/DD/YYYY')} />
                      <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                        <a href={editListing} target="_blank" >
                          <FormattedMessage {...messages.editLabel} />
                        </a>
                      </Td>
                      <Td data-label={formatMessage(messages.viewLabel)} column={formatMessage(messages.viewLabel)}>
                        <a href={viewListing} target="_blank" >
                          <FormattedMessage {...messages.viewLabel} />
                        </a>
                      </Td>
                      {status === 'declined' && <Td data-label={formatMessage(messages.history)} column={formatMessage(messages.history)}>
                        <a  onClick={() => openHistoryModal(value.listingHistory)}>
                          <FormattedMessage {...messages.viewLabel} />
                        </a>
                      </Td>}
                    </Tr>
                  )
                })
              }

            </Table>
          </div>
          <div>
            {
              getAllPermissionListings && getAllPermissionListings.results && getAllPermissionListings.results.length > 0
              && <div>
                <CustomPagination
                  total={getAllPermissionListings.count}
                  currentPage={getAllPermissionListings.currentPage}
                  defaultCurrent={1}
                  defaultPageSize={10}
                  change={this.paginationData}
                  paginationLabel={formatMessage(messages.requests)}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
  approveListing,
  openCommentModal,
  closeCommentModal,
  openHistoryModal
};
export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(listingsQuery, {
    name: 'getAllPermissionListings',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only',
    }
  })
)(ListingApprovalManagement);