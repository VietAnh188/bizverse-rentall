import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

// Styles
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NFTMarketplace.css';
import bt from '../../components/commonStyle.css';

// Components
import { 
  Grid
} from 'react-bootstrap';

class NFTMarketplace extends Component {
  render() {

    return (
      <Grid fluid className={s.container}>
        <div className={cx(s.landingContainer)}>
          <h2 className={s.headline}>Coming soon</h2>
        </div>
      </Grid>
    )
  }
}

export default injectIntl(withStyles(s, bt)(NFTMarketplace));