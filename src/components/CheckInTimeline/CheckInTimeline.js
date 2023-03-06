import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import {
  Row,
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CheckInTimeline.css';

// Components
import CheckInTimelineItem from './CheckInTimelineItem';

class CheckInTimeline extends React.Component {
  render() {
    const { nfts = [] } = this.props;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <div>
            {nfts.map(item => (
              <CheckInTimelineItem nft={item} key={item.id} />
            ))}

          </div>
        </Col>
      </Row>
    );
  }
}

export default injectIntl(withStyles(s)(CheckInTimeline));
