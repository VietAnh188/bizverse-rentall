import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

// Styles
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Inventory.css';

// helpers
import { getList } from '../../selector/general';
import {isEqual} from 'lodash';

// Locale
import messages from '../../locale/messages';

// Components
import { Row, Col } from 'react-bootstrap';
import NFT from './NFT'
import MDSpinner from 'react-md-spinner';
import NFTsPagination from './NFTsPagination';
import NFTsActions from './NFTsActions';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';
import { TYPES } from './Inventory';

class NFTs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSelectedAll: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { nfts, isProcessing, page, type, isSold, isSelling, selectedNFTs } = this.props; 

    return !isEqual(nfts, nextProps.nfts) 
      || !!isProcessing !== !!nextProps.isProcessing 
      || page !== nextProps.page
      || type !== nextProps.type
      || isSold !== nextProps.isSold
      || isSelling !== nextProps.isSelling
      || !isEqual(selectedNFTs, nextProps.selectedNFTs)
      || !isEqual(this.state, nextState)
  }

  handleOnChangeIsSelectedAll = value => {
    const { nfts = [], onUpdateSelectedNFTs } = this.props;
    let selectedNFTs = []

    if (value) {
      selectedNFTs = nfts.map(nft => nft.id)
    }

    this.setState({
      isSelectedAll: value
    }, () => {
      onUpdateSelectedNFTs(selectedNFTs)
    })
  }

  handleOnToggleSelectedNFT = ({ id, value }) => {
    const { nfts = [], selectedNFTs = [], onUpdateSelectedNFTs } = this.props;
    const newSelectedNFTs = selectedNFTs.includes(id) ? selectedNFTs.filter(item => item !== id) : [...selectedNFTs, id]
    const isSelectedAll = newSelectedNFTs.length === nfts.length

    this.setState({
      isSelectedAll
    }, () => {
      onUpdateSelectedNFTs(newSelectedNFTs)
    })
  }

  render() {
    const { 
      onRefetchData, 
      isSold, 
      isSelling, 
      onClickBack, 
      onClickNext, 
      page, 
      type, 
      nfts = [], 
      isProcessing, 
      intl: { formatMessage },
      selectedNFTs = [],
      setIsSelling
    } = this.props;
    const { isSelectedAll } = this.state;

    return (
      <Row>
        <Col xs={12} className={s.nftsContentContainer}>
          <div className={s.nftsHeader}>
            <div className={s.nftsHeaderActions}>
              {!!nfts.length && !isSold && 
              <>
                {/* <div className={s.stateWrapper}>
                  <CustomCheckbox
                    id="isSelectedAll"
                    checked={isSelectedAll && selectedNFTs.length === nfts.length}
                    className={cx(s.smallCheckbox, 'icheckbox_square-green')}
                    onChange={this.handleOnChangeIsSelectedAll}
                  />
                  <label className={s.stateLabel} htmlFor="isSelectedAll">
                  {formatMessage(messages.selectAllNFTs)}
                  </label>
                </div> */}

                {!!selectedNFTs.length && (
                  <NFTsActions 
                    onRefetchData={onRefetchData} 
                    selectedNFTs={selectedNFTs} 
                    isSold={isSold} 
                    isSelling={isSelling} 
                    type={type} 
                    setIsSelling={setIsSelling}
                  />
                )}
              </>}
            </div>
          </div>

          <div className={s.tabContent}>
            <Row className={cx(s.nftsContainer)}>
              {!isProcessing && !!nfts.length && nfts.map(nft => (
                  <NFT isSellingTab={isSelling} onRefetchData={onRefetchData} onToggleSelectedNFT={this.handleOnToggleSelectedNFT} type={type} nft={nft} key={nft.id} isSelected={selectedNFTs.includes(nft.id)} />
              ))}

              {isProcessing && (
                <div className={s.indicatorContainer}>
                  <MDSpinner animation="border" variant="danger" size={50} />
                </div>
              )}

              {!isProcessing && !nfts.length && (
                <p className={s.noResults}>
                  {formatMessage(messages.noResultsTitle)}
                </p>
              )}
            </Row>

            <div className={s.paginationWrapper}>
              <NFTsPagination page={page} onClickNext={onClickNext} onClickBack={onClickBack} />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  nfts: getList(state.nft),
  isProcessing: state.nft.isProcessing
});

const mapDispatch = {
  
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(NFTs)));
