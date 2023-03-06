import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SeeAll.css';
import {
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import history from '../../../core/history';

class SeeAll extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(param) {
    const url = `/s?viewtype=${param}`;
    history.push(url);
  }

  render() {
    const { viewType } = this.props;
    return (
      <div className={cx(s.seeAllContainer, 'seeALlAr')}>
        <Button
          bsStyle="link"
          className={cx(s.seeAllBtn, 'seeAllBtnAR')}
          onClick={() => this.handleClick(viewType)}
        >
          <FormattedMessage {...messages.seeAll} />
          <FontAwesome.FaAngleRight className={cx(s.seeAllBtnIcon, 'seeAllBtnIcon')} />
        </Button>
      </div>
    );
  }
}

export default withStyles(s)(SeeAll);