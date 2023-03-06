import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

// Styles
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Inventory.css';

// Locale
import messages from '../../locale/messages';

// Components
import {
    Col,
    Row
  } from 'react-bootstrap';

import { TYPES } from './Inventory';

class NFTType extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.type !== nextProps.type
  }

  render() {
    const { onChangeType, type } = this.props;

    return (
        <Row className={s.nftTypeWrapper}>
            <Col xs={6} onClick={onChangeType(TYPES.host)} className={cx(s.nftType, {
            [s.nftTypeActive]: type === TYPES.host
            })}>
                <p className={s.typeText}><FormattedMessage {...messages.mintedNFTs} /></p>
            </Col>
            <Col xs={6} onClick={onChangeType(TYPES.guest)} className={cx(s.nftType, {
            [s.nftTypeActive]: type === TYPES.guest
            })}>
                <p className={s.typeText}><FormattedMessage {...messages.purchasedNFTs} /></p>
            </Col>
      </Row>
    );
  }
}

export default injectIntl(withStyles(s)(NFTType));
