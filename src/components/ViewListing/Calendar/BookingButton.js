import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import bt from '../../../components/commonStyle.css';
import {
    Button,
    FormGroup,
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Helpers
import { getWallet } from '../../../helpers/getWallet';

// Actions
import { checkUserWallet } from '../../../actions/user/checkUserWallet';

// Component
import Loader from '../../Loader';
import history from '../../../core/history';
import NFTInformationModal from './NFTInformationModal';

// Locale
import messages from '../../../locale/messages';
class BookingButton extends Component {
    static propTypes = {
        availability: PropTypes.bool.isRequired,
        isDateChosen: PropTypes.bool.isRequired,
        basePrice: PropTypes.number.isRequired,
        isHost: PropTypes.bool.isRequired,
        bookingProcess: PropTypes.any.isRequired,
        listId: PropTypes.number.isRequired,
        guests: PropTypes.number.isRequired,
        startDate: PropTypes.object,
        endDate: PropTypes.object,
        bookingType: PropTypes.string.isRequired,
        bookingLoading: PropTypes.bool,
        formatMessage: PropTypes.any,
        maximumStay: PropTypes.bool,
        userBanStatus: PropTypes.number,
    };
    static defaultProps = {
        availability: true,
        isDateChosen: false,
        bookingLoading: false
    }
    constructor(props) {
        super(props);

        this.state = {
            showConfirmForm: false,
            isConnecting: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleToggleShowHideConfirmForm = () => {
        this.setState((prevState) => ({
            showConfirmForm: !prevState.showConfirmForm
        }))
    }

    handleCheckUserWalletExist = async () => {
        const { checkUserWallet } = this.props;
        
        this.setState({
            isConnecting: true
        })

        const { error, wallet } = await getWallet();

        if (error) {
            toastr.error("Connect wallet failed!", error);
        } else {
            const { isOk, userWallet } = await checkUserWallet();

            if (isOk) {
                if (userWallet.toLowerCase() === wallet.toLowerCase()) {
                    this.handleToggleShowHideConfirmForm();
                } else {
                    toastr.error("Connect wallet failed!", "Current connect wallet is different with your wallet from social account");
                }
            }
        }

        this.setState({
            isConnecting: false
        })
    }

    handleClick() {
        const { bookingProcess, listId, guests, startDate, endDate, taxRate } = this.props;
        bookingProcess(listId, guests, startDate, endDate, null, taxRate);
    }

    handleChange() {
        history.push('/s');
    }
    
    render() {
        const { showConfirmForm, isConnecting } = this.state;
        const { isPublished, basePrice, userBanStatus, country, isDateChosen, availability, isHost, bookingType, bookingLoading, isProcessing } = this.props;
        const { formatMessage } = this.props.intl;
        const { maximumStay, minimumStay } = this.props;        
        const disabled = !isPublished || !isDateChosen || basePrice < 1 || maximumStay || userBanStatus|| minimumStay || isProcessing || isConnecting;
        let buttonLabel;

        if (bookingType === 'instant') {
            buttonLabel = messages.book;
        } else {
            buttonLabel = messages.requestToBook;
        }

        if (isHost) {
            buttonLabel = messages.mintNFT
        }

        if (!availability && isDateChosen) {
            return (
                <div>
                    <FormGroup className={s.formGroup}>
                        <Button className={cx(s.btn, s.btnBlock, bt.btnLarge, bt.btnPrimary, s.mintNFTButton)} onClick={this.handleChange}>
                            <FormattedMessage {...messages.viewOtherListings} />
                        </Button>
                    </FormGroup>
                </div>
            );
        } else {
            return (
                <>
                    <FormGroup className={s.formGroup}>
                        <Loader
                            type={"button"}
                            containerClass={s.submitButtonWrapper}
                            className={cx({
                                [s.btnDisabled]: disabled
                            }, s.btn, s.btnBlock, bt.btnLarge, bt.btnPrimary, s.mintNFTButton, 'arButtonLoader')}
                            handleClick={isHost ? this.handleCheckUserWalletExist : this.handleClick}
                            disabled={disabled}
                            show={bookingLoading}
                            label={formatMessage(buttonLabel)}
                        />
                        {!isPublished && <p className={s.textNotPublished}><FormattedMessage {...messages.alertNotPublishedYet} /></p>}
                    </FormGroup>

                    <NFTInformationModal country={country} show={showConfirmForm} onClose={this.handleToggleShowHideConfirmForm} />
                </>
            );
        }
    }
}

const mapState = state => ({
    isProcessing: !!state.account.isLoading,
    isPublished: !!state?.viewListing?.current?.isPublished
})

const mapDispatch = {
    checkUserWallet
}

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(BookingButton)));
