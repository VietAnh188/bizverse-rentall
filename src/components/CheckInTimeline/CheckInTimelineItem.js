import React, { Component } from 'react';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CheckInTimeline.css';

// Locale
import messages from '../../locale/messages';

class CheckInTimelineItem extends Component {
  render() {
    const { nft: {
      id,
      checkIn,
      checkOut,
      name,
      country,
      city,
      address,
      province,
      guestNumber
    } = {}} = this.props;

    let checkInDate = checkIn ? moment(checkIn).format('MMM DD') : '';
    let checkOutDate = checkOut ? moment(checkOut).format('MMM DD') : '';
    let createdDate = checkIn ? moment(checkIn).format('MMM DD, YYYY') : '';

    return (
      <div className={s.positionRelative}>
        <div className={s.displayTable}>
          <div className={s.displayTableRow}>
            <div className={cx(s.displayTableCell, s.borderLine, s.dateSectionWidth, s.dateSection, 'reservationLine')}>
              <div className={cx('hidden-xs hidden-sm')}>
                <p className={cx(s.noMargin, s.dateFontNew, s.dateFontMargin, s.fontWeight)}>{createdDate}</p>
              </div>
            </div>
            <div className={cx(s.circle, 'reservartioARCircle')}>
            </div>
            <div className={cx(s.positionRelative, s.spaceTop3)}>
              <div className={cx(s.displayTableCell, s.mainSection, s.space2, s.afterSection, s.bizverseBox, s.bizverseBoxSecondary, 'reservationAfterSection')}>
                <div className={s.displayTable}>
                  <a target="_blank" className={s.nftDetailLink} href={`/nft/${id}`}>
                    <FormattedMessage {...messages.detail} />
                  </a>
                  <h4 className={s.nftName}>{name}</h4>

                    <div className={s.nftInformationGroup}>
                      <div className={s.nftInformation}>
                        <span><FormattedMessage {...messages.checkIn} />:</span>
                        <span className={s.nftInformationDetail}>{checkInDate}</span>
                      </div>

                      <div className={s.nftInformation}>
                        <span><FormattedMessage {...messages.checkOut} />:</span>
                        <span className={s.nftInformationDetail}>{checkOutDate}</span>
                      </div>
                    </div>

                    <div className={s.nftInformation}>
                      <span><FormattedMessage {...messages.address} />:</span>
                      <span className={s.nftInformationDetail}>{`${address}, ${province}, ${country}`}</span>
                    </div>

                    <div className={s.nftInformation}>
                      <span><FormattedMessage {...messages.guestNumber} />:</span>
                      <span className={s.nftInformationDetail}>{guestNumber}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(CheckInTimelineItem));