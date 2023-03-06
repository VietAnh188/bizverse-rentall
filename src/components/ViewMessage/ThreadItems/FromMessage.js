import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';

// Component
import Avatar from '../../Avatar';

class FromMessage extends Component {
  static propTypes = {
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  };

  static defaultProps = {
    createdAt: null
  };

  render() {
    const { profileId, picture, displayName, content, createdAt } = this.props;
    let date = createdAt != null ? moment(createdAt).format('MMM DD, YYYY') : '';

    return (
      <div>
        <div className={cx(s.space6)}>
          <div className={s.displayTable}>
            <div className={s.displayTableRow}>
              <div className={cx(s.displayTableCellTop, s.displayTableWidthTwo)}>
                <div className={cx(s.profileAvatarSectionLeft, 'profileAvatarSectionLeftAr')}>
                  <Avatar
                    source={picture}
                    height={70}
                    width={70}
                    title={displayName}
                    className={s.profileAvatar}
                    withLink
                    linkClassName={s.profileAvatarLink}
                    profileId={profileId}
                  />
                </div>
              </div>
              <div className={cx(s.displayTableCell, s.displayTableWidth, s.radiusColorTwo, 'radiusColorTwo')}>
                <Panel className={cx(s.panelBubbleLeftText, s.panelDark, s.panelBubbleLeft, s.contentLeft, 'viewMessageBubble')}>
                  <span>
                    {
                      content && (content.trim()).split("\n").map(function (item, index) {
                        return (
                          <span key={index}>{item}<br /></span>
                          
                        )
                      })
                    }
                  </span>
                  <div className={cx(s.timeTextLeft, s.spaceTop2)}>
                    <span>{date}</span>
                  </div>
                </Panel>
              </div>

            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default withStyles(s)(FromMessage);