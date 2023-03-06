import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingPermission.css';

// Component
import ListingApprovalManagement from '../../../components/siteadmin/ListingApprovalManagement/ListingApprovalManagement';


class ListingPermission extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return <ListingApprovalManagement />;
  }
}

export default withStyles(s)(ListingPermission);