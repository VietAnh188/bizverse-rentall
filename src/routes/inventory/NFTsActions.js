import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

// Styles
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Inventory.css';
import bt from '../../components/commonStyle.css';

// helpers
import { getList } from '../../selector/general';
import { isEqual } from 'lodash';

// Actions
import { burnNFTs } from '../../actions/nft/burnNFTs'
import { pushNFTsToMarketplace } from '../../actions/nft/pushNFTsToMarketplace'
import { pullNFTsOutMarketplace } from '../../actions/nft/pullNFTsOutMarketplace'

// Locale
import messages from '../../locale/messages';

// Components
import { Button } from 'react-bootstrap';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm'

import { TYPES } from './Inventory';

const CONFIRM_TYPES = {
  pushToMarketplace: 'PUSH_TO_MARKETPLACE',
  pullOutMarketplace: 'PULL_OUT_MARKETPLACE',
  burn: 'BURN'
}

class NFTsActions extends Component {
  constructor(props) {
    super(props)

    this.state = {
        showConfirmModal: false,
        confirmType: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { type, selectedNFTs, isSold, isSelling } = this.props; 

    return type !== nextProps.type
      || !isEqual(selectedNFTs, nextProps.selectedNFTs)
      || isSold !== nextProps.isSold
      || isSelling !== nextProps.isSelling
      || !isEqual(this.state, nextState)
  }

  handlePushNFTsToMarketplace = async () => {
    const { pushNFTsToMarketplace, selectedNFTs, setIsSelling, onRefetchData } = this.props;
    const isSuccess = await pushNFTsToMarketplace(selectedNFTs)

    if (isSuccess) {
      this.handleToggleShowHideConfirmModal();

      setIsSelling(true)

      onRefetchData();
    }
  }

  handlePullNFTsOutMarketplace = async () => {
    const { pullNFTsOutMarketplace, selectedNFTs, setIsSelling, onRefetchData } = this.props;
    const isSuccess = await pullNFTsOutMarketplace(selectedNFTs)

    if (isSuccess) {
      this.handleToggleShowHideConfirmModal();

      setIsSelling(false)

      onRefetchData();
    }
  }

  handleBurnNFTs = async () => {
    const { burnNFTs, selectedNFTs, onRefetchData } = this.props;
    const isSuccess = await burnNFTs({ nftIds: selectedNFTs })

    if (isSuccess) {
      this.handleToggleShowHideConfirmModal();

      onRefetchData();
    }
  }

  handleToggleShowHideConfirmModal = () => {
    this.setState(({ showConfirmModal }) => ({
      showConfirmModal: !showConfirmModal,
      confirmType: ''
    }))
  }

  handleOpenConfirmBurnNFTs = () => {
    this.setState(({ showConfirmModal }) => ({
      showConfirmModal: !showConfirmModal,
      confirmType: CONFIRM_TYPES.burn
    }))
  }

  handleOpenConfirmPushingToMarketplace = () => {
    this.setState(({ showConfirmModal }) => ({
      showConfirmModal: !showConfirmModal,
      confirmType: CONFIRM_TYPES.pushToMarketplace
    }))
  }

  handleOpenConfirmPullingOutMarketplace = () => {
    this.setState(({ showConfirmModal }) => ({
      showConfirmModal: !showConfirmModal,
      confirmType: CONFIRM_TYPES.pullOutMarketplace
    }))
  }

  validateCanPushNFTsToMarketplace = () => {
    const { selectedNFTs = [], nfts } = this.props;

    const isValid = selectedNFTs.every(nftId => {
      const nft = nfts.find(item => item.id === nftId)
      
      if (!nft) {
        return false;
      }
      
      const { isClaimed, isOnMarketplace, isSelling: isNFTSelling, isSold: isNFTSold, isExpired, isBought, isMinting } = nft;

      return isClaimed && !isOnMarketplace && !isNFTSelling && !isNFTSold && !isExpired && !isBought && !isMinting
    })

    return isValid;
  }

  validateCanPullNFTsOutMarketplace = () => {
    const { selectedNFTs = [], nfts } = this.props;

    const isValid = selectedNFTs.every(nftId => {
      const nft = nfts.find(item => item.id === nftId)
      
      if (!nft) {
        return false;
      }
      
      const { isClaimed, isOnMarketplace, isSelling: isNFTSelling, isSold: isNFTSold, isBought, isMinting } = nft;

      return isClaimed && isOnMarketplace && !isNFTSelling && !isNFTSold && !isBought && !isMinting
    })

    return isValid;
  }

  validateCanBurnNFTs = () => {
    const { selectedNFTs = [], nfts, type } = this.props;

    if (type !== TYPES.host) {
      return false;
    }

    const isValid = selectedNFTs.every(nftId => {
      const nft = nfts.find(item => item.id === nftId)
      
      if (!nft) {
        return false;
      }
      
      const { isClaimed, isSelling: isNFTSelling, isSold: isNFTSold, isBought, isMinting } = nft;

      return isClaimed && !isNFTSelling && !isNFTSold && !isBought && !isMinting
    })

    return isValid;
  }

  render() {
    const { selectedNFTs = [] } = this.props;
    const { showConfirmModal, confirmType } = this.state;
    const nftWord = selectedNFTs.length === 1 ? 'NFT' : 'NFTs';
    let message;
    let handleOnConfirm;

    switch(confirmType) {
      case CONFIRM_TYPES.burn:
        message = 'confirmBurnNFTs'
        handleOnConfirm = this.handleBurnNFTs
        break;

      case CONFIRM_TYPES.pushToMarketplace:
        message = 'confirmPushToMarketplace'
        handleOnConfirm = this.handlePushNFTsToMarketplace
        break;

      case CONFIRM_TYPES.pullOutMarketplace:
        message = 'confirmPullOutMarketplace'
        handleOnConfirm = this.handlePullNFTsOutMarketplace
        break;

      default:
    }

    const canPushNFTsToMarketplace = this.validateCanPushNFTsToMarketplace()
    const canBurnNFTs = this.validateCanBurnNFTs()
    const canPullNFTOutMarketplace = this.validateCanPullNFTsOutMarketplace()

    return (
        <>
          {canPushNFTsToMarketplace && 
            <Button
              className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.nftAction)}
              onClick={this.handleOpenConfirmPushingToMarketplace}
            >
              <FormattedMessage {...messages.pushToMarketplace} />
            </Button>
          }

          {canBurnNFTs && <Button
            className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.nftAction)}
            onClick={this.handleOpenConfirmBurnNFTs}
          >
            <FormattedMessage {...messages.burnNFTs} />
          </Button>}

          {canPullNFTOutMarketplace && 
            <Button
              className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.nftAction)}
              onClick={this.handleOpenConfirmPullingOutMarketplace}
            >
              <FormattedMessage {...messages.pullOutMarketplace} />
            </Button>
          }

          {!!message && <ModalConfirm 
            title={
            <FormattedMessage {...messages[message]} 
              values={{ selectedCount: selectedNFTs.length, nftWord }} 
            />} 
            show={showConfirmModal} 
            onOk={handleOnConfirm} 
            onClose={this.handleToggleShowHideConfirmModal} 
          />}
        </>
    );
  }
}

const mapState = (state) => ({
  nfts: getList(state.nft),
  isProcessing: state.nft.isProcessing
});

const mapDispatch = {
  burnNFTs,
  pushNFTsToMarketplace,
  pullNFTsOutMarketplace
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(NFTsActions)));
