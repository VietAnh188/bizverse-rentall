import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';

import messages from '../../locale/messages';
import { formatURL } from "../../helpers/formatURL";
import moment from 'moment';
import history from '../../core/history';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NFTDetail.css';
import bt from '../../components/commonStyle.css';

import IconDownload from '../../../public/SiteIcons/iconDownload.png'

class NFTItemDetail extends Component {
    static propsTypes = {
        checkIn: PropTypes.string.isRequired,
        checkOut: PropTypes.string.isRequired,
    }
    static defaultProps = {
        checkIn: null,
        checkOut: null,
    }

    handleGoToListing = () => {
        const { nft: { listId, name } } = this.props

        history.push(`/rooms/${formatURL(name)}-${listId}`);
    }

    handleCancelReservation = () => {
        const { nft: { reservationId } } = this.props;

        history.push(`/cancel/${reservationId}/guest`)
    }

    downloadQRCode = () => {
        const { nft : { qrCode, name } } = this.props;
        let a = document.createElement('a');

        a.href = qrCode ? 'data:image/png;base64,' + qrCode : null;
        a.download = 'QR Code of ' + name;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    render() {
        const { nft: {
            id, 
            name, 
            thumbnail, 
            country, 
            city, 
            checkIn, 
            checkOut, 
            roomType, 
            guestNumber,
            beds, 
            detail, 
            houseType, 
            address, 
            description, 
            qrCode, 
            province,
            isMappingReservation,
            isYourNFT,
            isExpired
        } = {}} = this.props;
        let qrcode = qrCode ? 'data:image/png;base64,' + qrCode : null;
        let checkInDate = (checkIn != null) ? moment(checkIn).format('DD/MM/YYYY') : '';
        let checkOutDate = (checkOut != null) ? moment(checkOut).format('DD/MM/YYYY') : '';
        const showQRCode = !!qrcode && !isExpired;

        return (
            <Grid fluid className={s.container}>
                <Row className={s.rowNFT}>
                    <Col xs={12} sm={12} md={6} lg={6} className={s.imgNFT}>
                        <div className={s.imgPlace}>
                            <img src={thumbnail} />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <div className={s.contentNFT}>
                            <div className={s.titleContents}>
                                <p>{name}</p>
                            </div>
                            <Row className={s.detailNFT}>
                                <Col xs={5} sm={6} md={6} lg={6}>
                                    <p className={s.text}>
                                        <FormattedMessage {...messages.country} />: <span className={s.textVal}>{country}</span>
                                    </p>
                                    <p className={s.text}>
                                        <FormattedMessage {...messages.checkIn} />: <span className={s.textVal}>{checkInDate}</span>
                                    </p>
                                    <p className={s.text}>
                                        <FormattedMessage {...messages.guests} />: <span className={s.textVal}>{guestNumber}</span>
                                    </p>
                                </Col>
                                <Col xs={7} sm={6} md={6} lg={6}>
                                    <p className={s.text}>
                                        <FormattedMessage {...messages.city} />: <span className={s.textVal}>{city}</span>
                                    </p>
                                    <p className={s.text}>
                                        <FormattedMessage {...messages.checkOut} />: <span className={s.textVal}>{checkOutDate}</span>
                                    </p>
                                    <p className={s.text}>
                                        <FormattedMessage {...messages.beds} />: <span className={s.textVal}>{beds}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <p className={s.text}>
                                        <FormattedMessage {...messages.street} />: <span className={s.textVal}>{address}</span>
                                    </p>
                                    <p className={s.text}>
                                        <FormattedMessage {...messages.state} />: <span className={s.textVal}>{province}</span>
                                    </p>
                                    <p className={s.text}>
                                        <FormattedMessage {...messages.houseTypeLabel} />: <span className={s.textVal}>{houseType}</span>
                                    </p>
                                    <p className={s.text}>
                                        <FormattedMessage {...messages.roomType} />: <span className={s.textVal}>{roomType}</span>
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <div className={s.splitter}></div>
                <div className={s.descriptionNFT}>
                    <p>
                        {description ? description.charAt(0).toUpperCase() + description.slice(1):''}
                    </p>
                </div>
                <div className={s.qrNFT}>
                    {showQRCode && <p className={s.titleQRCode}>
                        <FormattedMessage {...messages.checkInCode} />
                        {<img className={s.iconDownload} src={IconDownload} onClick={() => {this.downloadQRCode()}}/>}
                    </p>}
                    <div className={s.qrcode}>
                        {showQRCode && <img className={s.imgQRCode} src={qrcode} alt="QRcode CheckIn" />}
                        <div className={cx(s.btnNFT, s.btnNFTFlex)}>
                            <button className={cx(s.nftButton, bt.btnPrimaryBorder)} onClick={this.handleGoToListing}> <FormattedMessage {...messages.gotoListing} /></button>

                            {isMappingReservation && !isYourNFT && !isExpired && <button onClick={this.handleCancelReservation} className={cx(s.nftButton, bt.btnPrimaryBorder)}> <FormattedMessage {...messages.cancelReservation} /></button>}
                
                            {/* <button disabled={true} className={bt.btnPrimary}> 
                                <FormattedMessage {...messages.useNFT} />
                            </button> */}
                        </div>
                    </div>
                </div>

                {isExpired &&
                    <div className={s.btnNFT}>
                        <button className={cx(s.nftButton, bt.btnPrimaryBorder)} onClick={this.handleGoToListing}> <FormattedMessage {...messages.gotoListing} /></button>

                        {/* {isMappingReservation && !isYourNFT && !isExpired && <button onClick={this.handleCancelReservation} className={cx(s.nftButton, bt.btnPrimaryBorder)}> <FormattedMessage {...messages.cancelReservation} /></button>} */}
                    
                        {/* <button disabled={true} className={bt.btnPrimary}> 
                            <FormattedMessage {...messages.useNFT} />
                        </button> */}
                    </div> 
                }
                
            </Grid>
        );
    }
}

export default withStyles(s)(NFTItemDetail);