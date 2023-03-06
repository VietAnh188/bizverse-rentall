import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import moment from 'moment';
import history from '../../../core/history'

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NFTInformationModal.css';
import bt from '../../../components/commonStyle.css';
import {
    Button,
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Config
import { AWS_SERVICE_URL } from '../../../config';

// Actions
import { createNFT } from '../../../actions/nft/createNFT'

// Component
import Modal from '../../Modal/Modal'
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';

// Locale
import messages from '../../../locale/messages';

class NFTInformationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canBooking: true
        }
    }

    handleMintNFT = async () => {
        const { onClose, createNFT, wallet, guests, startDate, endDate, currentListing: { userId, listPhotos, id, beds, country, city, state, street, title } = {} }= this.props;
        const { canBooking } = this.state;
        const { houseType, roomType } = this.getHouseTypeRoomType();
        const payload = {
            listId: id,
            checkIn: moment(startDate).format('YYYY-MM-DD'),
            checkOut: moment(endDate).format('YYYY-MM-DD'),
            thumbnail: !!listPhotos?.length ? `${AWS_SERVICE_URL}images/upload/x_large_${listPhotos[0].name}` : undefined,
            roomType,
            houseType,
            name: title,
            country,
            city,
            guestNumber: guests,
            beds,
            recipient: String(wallet).toLowerCase(),
            address: `${street || ''} ${city || ''}`,
            userId,
            canBooking
        }

        const isMintSuccess = await createNFT({ payload })

        if (isMintSuccess) {
            onClose();

            history.push('/nft/inventory')
        }
    }

    getHouseTypeRoomType = () => {
        const { currentListing: { settingsData } = { settingsData: [] } } = this.props;
        let houseType, roomType;

        settingsData.forEach(({ listsettings }) => {
            const type = listsettings?.settingsType?.typeName;

            switch(type) {
                case 'houseType':
                    houseType = listsettings?.itemName
                    break;
                case 'roomType':
                    roomType = listsettings?.itemName
                    break;
                
                default:

            }
        })

        return {
            houseType,
            roomType
        }
    }

    handleOnChangeCanBooking = (value) => {
        this.setState({ canBooking: value })
    }

    render() {
        const { isProcessing, show, onClose, guests, startDate, endDate, intl: { formatMessage }, currentListing } = this.props;
        const { canBooking } = this.state;

        if (!currentListing) {
            return null;
        }

        const { beds, country, city, state, street, title } = currentListing;
        const { houseType, roomType } = this.getHouseTypeRoomType();

        return (
            <Modal 
                show={show} 
                onClose={onClose} 
                headline={<FormattedMessage {...messages.confirmMintNFT} />}
                titleClassName={s.modalTitle}
                dialogClassName={s.dialogClassName}
            >
                <div className={s.mintNFTContent}>
                    <div className={s.nftInformation}>
                        <h3 className={cx(s.listingName, s.customLengthText)}>{title}</h3>
                        <Row>
                            <Col xs={12} md={7}>
                                {/* Street */}
                                <div>
                                    <span className={cx(s.information, s.subTitle)}>{formatMessage(messages.street)}:</span>
                                    <span className={cx(s.information, s.subContent, s.informationBold)}>{street}</span>
                                </div>
                            </Col>
                            <Col xs={12} md={5}> 
                                {/* City */}
                                <div>
                                    <span className={cx(s.information, s.subTitle)}>{formatMessage(messages.city)}:</span>
                                    <span className={cx(s.information, s.subContent, s.informationBold)}>{city}</span>
                                </div>
                            </Col>
                        </Row>

                        <Row className={s.spaceTop3}>
                            <Col xs={12} md={7}>
                                {/* State */}
                                <div>
                                    <span className={cx(s.information, s.subTitle)}>{formatMessage(messages.state)}:</span>
                                    <span className={cx(s.information, s.subContent, s.informationBold)}>{state}</span>
                                </div>
                            </Col>
                            <Col xs={12} md={5}> 
                                {/* Country */}
                                <div>
                                    <span className={cx(s.information, s.subTitle)}>{formatMessage(messages.country)}:</span>
                                    <span className={cx(s.information, s.subContent, s.informationBold)}>{country}</span>
                                </div>
                            </Col>
                        </Row>

                        <div className={s.splitter}></div>
                    </div>

                    {/* House type */}
                    <div className={s.nftInformation}>

                        <Row>
                            <Col xs={12} md={7}>
                                <div>
                                    <span className={cx(s.information, s.subTitle)}>{formatMessage(messages.houseTypeLabel)}:</span>
                                    <span className={cx(s.information, s.subContent, s.informationBold)}>
                                        {houseType}
                                    </span>
                                </div>
                            </Col>
                            <Col xs={12} md={5}> 
                                <div>
                                    <span className={cx(s.information, s.subTitle)}>{formatMessage(messages.roomType)}:</span>
                                    <span className={cx(s.information, s.subContent, s.informationBold)}>
                                        {roomType}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        
                        <div className={s.splitter}></div>
                    </div>
                    
                    {/* CheckIn, CheckOut */}
                    <div className={s.nftInformation}>
                        <Row>
                            <Col xs={12} md={7}>
                                <div>
                                    <span className={cx(s.information, s.subTitle)}>{formatMessage(messages.checkIn)}:</span>
                                    <span className={cx(s.information, s.subContent, s.informationBold)}>
                                        {moment(startDate).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                            </Col>
                            <Col xs={12} md={5}> 
                                <div>
                                    <span className={cx(s.information, s.subTitle)}>{formatMessage(messages.checkOut)}:</span>
                                    <span className={cx(s.information, s.subContent, s.informationBold)}>
                                        {moment(endDate).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        
                        <div className={s.splitter}></div>
                    </div>

                    <div className={s.nftInformation}>
                        <Row>
                            <Col xs={12} md={7}>
                                <div>
                                    <span className={cx(s.information, s.subTitle)}>{formatMessage(messages.guests)}:</span>
                                    <span className={cx(s.information, s.subContent, s.informationBold)}>
                                        {guests}
                                    </span>
                                </div>
                            </Col>
                            <Col xs={12} md={5}> 
                                <div>
                                    <span className={cx(s.information, s.subTitle)}>{formatMessage(messages.beds)}:</span>
                                    <span className={cx(s.information, s.subContent, s.informationBold)}>
                                        {beds}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        
                        <div className={s.splitter}></div>
                    </div>

                    <div className={s.checkboxWrapper}>
                        <CustomCheckbox
                            id="canBooking"
                            checked={canBooking}
                            className={cx('icheckbox_square-green')}
                            onChange={this.handleOnChangeCanBooking}
                        />
                        <label className={s.checkboxLabel} htmlFor="canBooking">
                            {formatMessage(messages.guestCanStillBooking)}
                        </label>
                    </div>

                    <div className={cx(s.mintNFTActions)}>
                        <Button disabled={isProcessing} onClick={this.handleMintNFT} className={cx(bt.btnPrimary, bt.btnLarge, s.buttonConfirm )}>
                            {/* {isProcessing ? 
                                <MDSpinner className={s.mintingIndicator} animation="border" variant="danger" size={20} /> : 
                                formatMessage(messages.continue)
                            } */}
                            {formatMessage(messages.continue)}
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

const selector = formValueSelector('BookingForm');

const mapState = state => ({
    startDate: selector(state, 'startDate'),
    endDate: selector(state, 'endDate'),
    guests: Number(selector(state, 'guests')) || 1,
    currentListing: state.viewListing?.current,
    wallet: state?.account?.data?.wallet,
    isProcessing: state.nft.isProcessing
});

const mapDispatch = {
    createNFT
}

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(NFTInformationModal)));
