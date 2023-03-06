import React from 'react';
import { compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NFTs.css';

// Component
import NFTManagement from '../../../components/siteadmin/NFTManagement';

class NFTs extends React.Component {
  render() {
    return <NFTManagement />
  }

}

export default compose(
  withStyles(s)
)(NFTs);
