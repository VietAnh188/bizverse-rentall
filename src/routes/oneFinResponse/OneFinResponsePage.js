import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { injectIntl } from 'react-intl';

// Core
import history from '../../core/history'

// Locale
import messages from '../../locale/messages';

// Actions
import { getOneFinPaymentStatus } from '../../actions/booking/getOneFinPaymentStatus'

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './oneFinResponsePage.css';
import bt from '../../components/commonStyle.css';

// Components
import Layout from '../../components/Layout';
import {
    Button
  } from 'react-bootstrap';
import Loader from '../../components/Loader/CircleLoader';

class OneFinResponsePage extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            getStatusTimeout: null,
            isFirstLoad: true
        }
    }

    componentDidMount() {
        const { getOneFinPaymentStatus } = this.props;
        const url = new URL(location.href);
        const trxRefNo = url.searchParams.get("trxRefNo");
    
        if (trxRefNo) {
            getOneFinPaymentStatus(trxRefNo);

            this.setState({
                isFirstLoad: false,
                getStatusTimeout: setTimeout(() => {
                    getOneFinPaymentStatus(trxRefNo);
                }, 1500)
            })
        }
    }

    componentDidUpdate() {
        const { reservationState } = this.props;
        const { getStatusTimeout } = this.state;

        if (reservationState) {
            clearTimeout(getStatusTimeout)
        }
    }

    handleGoToTrips = () => {
        history.push('/trips/current')
    }

    render() {
        const { isApp, reservationState, isLoading, intl: { formatMessage} } = this.props;
        const { isFirstLoad } = this.state;
        
        return (
            <Layout>
                <div className={s.oneFinResponseContainer}>
                    <div className={cx('container', s.oneFinResponseContent, s.bizverseBox, s.bizverseBoxSecondary)}>
                        {isFirstLoad && isLoading ? <Loader show /> : (
                            <>
                                <h2 className={s.landingTitle}>Your Booking is 
                                    <b> {reservationState || "Processing"} </b> 
                                </h2>

                                {!isApp && <Button bsSize="small" className={cx(bt.btnPrimary, s.btnBlock, s.btnLarge, s.buttonGoToTrips)} onClick={this.handleGoToTrips}>
                                    {formatMessage(messages.goToYourTrips)}
                                </Button>}
                            </>
                        )}
                        
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapState = (state) => ({
    reservationState: state.oneFin.reservationState,
    isLoading: state.oneFin.isLoading
});

const mapDispatch = {
    getOneFinPaymentStatus
  };

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(OneFinResponsePage)));