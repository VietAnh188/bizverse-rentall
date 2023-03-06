import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment'
import { connect } from 'react-redux';
import history from '../../core/history';
import { toastr } from 'react-redux-toastr';

// Styles
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Inventory.css';

// Config
import { MARKETPLACE_URL } from '../../config';

// Helpers
import { getWallet } from '../../helpers/getWallet';
import { isEqual } from 'lodash';

// Actions
import { checkUserWallet } from '../../actions/user/checkUserWallet';
import { claimNFT } from '../../actions/nft/claimNFT';

// Locale
import messages from '../../locale/messages';

import { TYPES } from './Inventory';

// Components
import {
    Row,
    Col,
    Dropdown,
    MenuItem
  } from 'react-bootstrap';
  import { FaEllipsisV } from 'react-icons/lib/fa';
  import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';

// Icons
import iconExpired from '../../../public/SiteIcons/icon-expired.svg'
import iconNotClaimed from '../../../public/SiteIcons/icon-not-claimed.svg'
import iconClaimed from '../../../public/SiteIcons/icon-claimed.svg'

class NFT extends Component {
  shouldComponentUpdate(nextProps) {
    const { nft, type, isSelected } = this.props; 

    return !isEqual(nft, nextProps.nft) || type !== nextProps.type || isSelected !== nextProps.isSelected
  }

  handleOnToggleSelectNFT = (value) => {
    const { onToggleSelectedNFT, nft: { id } } = this.props;

    onToggleSelectedNFT({ id, value })
  }

  handleClaimNFT = async () => {
    const { claimNFT, nft: { id }, onRefetchData, checkUserWallet } = this.props;
  
    const { error, wallet } = await getWallet();

    if (error) {
        toastr.error("Connect wallet failed!", error);
    } else {
        const { isOk, userWallet } = await checkUserWallet();

        if (isOk) {
            if (userWallet.toLowerCase() === wallet.toLowerCase()) {
                
              const isSuccess = await claimNFT({ nftId: id });

              if (isSuccess && onRefetchData) {
                onRefetchData();
              }

            } else {
                toastr.error("Connect wallet failed!", "Current connect wallet is different with your wallet from social account");
            }
        }
    }
  }

  handleCancelReservation = () => {
    const { nft: { reservationId } } = this.props;
    
    history.push(`/cancel/${reservationId}/guest`)
  }

  handleStopPropagation = e => {
    e.stopPropagation()
  }

  handleGoToDetail = () => {
    const { nft: { id } } = this.props;
    
    history.push(`/nft/${id}`)
  }

  handleGoToMarketplace = () => {
    const { nft: { id } } = this.props;
    
    window.open(`${MARKETPLACE_URL}/marketplace/detail/${id}`)
  }

  render() {
    const { 
        nft: {
          id, 
          thumbnail, 
          name, 
          country, 
          city, 
          checkIn, 
          checkOut, 
          beds, 
          guestNumber, 
          isSelling, 
          isSold, 
          isOnMarketplace,
          isExpired,
          isClaimed,
          isBought,
          owner,
          isMinting
        },
        type,
        isSelected
     } = this.props;
     const { formatMessage } = this.props.intl;
     const isHost = type === TYPES.host;
     const isHostSold = isHost && isSold && !isMinting;

     const canSelectNFT = !isSold && isClaimed && !isSelling && !isBought && !isMinting;
     const canCancelReservation = type === TYPES.guest && !isOnMarketplace && !isSelling && !isSold && !isMinting;
     const isTransferredToAdmin = isClaimed && owner === 'admin' && !isMinting;
     const isNFTSold = isSold && !isSelling && !isMinting;
     const isNotMinted = type === TYPES.guest && !isClaimed && !isOnMarketplace && !isMinting
     const isMinted = type === TYPES.guest && isClaimed && !isOnMarketplace && !isTransferredToAdmin && !isMinting;

    return (
        <Col xs={6} sm={4} md={4} lg={3} className={s.nftWrapper}>
            <div onClick={this.handleGoToDetail} className={cx(s.nft, s.bizverseBox, s.bizverseBoxSecondary, {
              // [s.expiredNFT]: isExpired && !isNFTSold
            })}>
                {canSelectNFT && <CustomCheckbox
                  id={id}
                  checked={isSelected}
                  className={cx(s.selectNFTCheckbox, 'icheckbox_square-green', 'select-nft-checkbox')}
                  onChange={this.handleOnToggleSelectNFT}
                />}

                {!isMinting && (!isClaimed || canCancelReservation || isOnMarketplace) && (
                  <Dropdown id="menuNFTActions" className={s.nftMenuWrapper} onClick={this.handleStopPropagation}>
                    <Dropdown.Toggle noCaret={true} className={s.nftBtnMenu}>
                      <FaEllipsisV className={s.menuIcon} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="super-colors">
                      {!isClaimed && <MenuItem onClick={this.handleClaimNFT} eventKey="1">{formatMessage(messages.claimNFT)}</MenuItem>}
                      {canCancelReservation && 
                      <MenuItem onClick={this.handleCancelReservation} eventKey="2">
                        {formatMessage(messages.cancelReservation)}
                      </MenuItem>}
                      
                      {isOnMarketplace && (
                        <MenuItem
                          eventKey="3"
                          onClick={this.handleGoToMarketplace}
                        >
                          {formatMessage(messages.goToMarketplace)}
                        </MenuItem>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                )}

                <div className={s.nftThumbnailWrapper}>
                  <img className={s.nftThumbnail} src={thumbnail} alt={name} />

                  <div className={s.nftStatesContainer}>
                    {isMinting && <span className={s.nftState}><FormattedMessage {...messages.processing} /></span>}
                    {isSelling && <span className={s.nftState}><FormattedMessage {...messages.selling} /></span>}
                    {isNFTSold && <span className={s.nftState}><FormattedMessage {...messages.sold} /></span>}
                  </div>

                  {/* Label NFT status  */}
                  {isNotMinted && (
                    <img className={s.nftStatus} src={iconNotClaimed} alt="Not claimed" />
                  )}

                  {isMinted && (
                    <img className={s.nftStatus} src={iconClaimed} alt="Claimed" />
                  )}

                  {isExpired && !isNFTSold && (
                    <img className={s.iconExpiredNFT} src={iconExpired} alt="Expired NFT" />
                  )}
                </div>

                <div className={s.nftContent}>
                  <h5 className={s.nftName}>{name}</h5>
                  <Row>
                      <Col className={s.nftDetailInformation} xs={12} md={6} lg={12}>
                        <span><FormattedMessage {...messages.country} />:</span>
                        <span className={s.nftDetail}>{country}</span>
                      </Col>
                      <Col className={s.nftDetailInformation} xs={12} md={6} lg={12}>
                        <span><FormattedMessage {...messages.city} />:</span>
                        <span className={s.nftDetail}>{city}</span>
                      </Col>
                  </Row>
                  <Row>
                      <Col className={s.nftDetailInformation} xs={12} md={6} lg={12}>
                        <span><FormattedMessage {...messages.checkIn} />:</span>
                        <span className={s.nftDetail}>{moment(checkIn).format('DD/MM/YYYY')}</span>
                      </Col>
                      <Col className={s.nftDetailInformation} xs={12} md={6} lg={12}>
                        <span><FormattedMessage {...messages.checkOut} />:</span>
                        <span className={s.nftDetail}>{moment(checkOut).format('DD/MM/YYYY')}</span>
                      </Col>
                  </Row>
                  <Row>
                      <Col className={s.nftDetailInformation} xs={12} md={6} lg={12}>
                        <span><FormattedMessage {...messages.guests} />:</span>
                        <span className={s.nftDetail}>{guestNumber}</span>
                      </Col>
                      <Col className={s.nftDetailInformation} xs={12} md={6} lg={12}>
                        <span><FormattedMessage {...messages.beds} />:</span>
                        <span className={s.nftDetail}>{beds}</span>
                      </Col>
                  </Row>
                </div>
                <div className={s.nftInformation}></div>
            </div>
        </Col>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
  claimNFT,
  checkUserWallet
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(NFT)));
