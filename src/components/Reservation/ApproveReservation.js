import React from 'react';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservation.css';

// Component
import ModalConfirm from '../ModalConfirm';
import {
	Button
} from 'react-bootstrap';

// Locale
import messages from '../../locale/messages';

// GraphQL
import getReservationQuery from '../../graphql/Reservation/getReservation.graphql';

// Style
import cx from 'classnames';
import bt from '../commonStyle.css';

class ApproveReservation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirmApprove: false
    }
  }

  handleConfirmApproveAndMint = async () => {
    const { 
        sendMessage
    } = this.props;

    sendMessage('approved', { onSuccess: this.handleToggleConfirmApproveModal });
  }

  handleConfirmApprove = () => {
    this.handleConfirmApproveAndMint();
  }

  handleToggleConfirmApproveModal = () => {
    this.setState(({ showConfirmApprove }) => ({
      showConfirmApprove: !showConfirmApprove
    }))
  }

  render() {
    const { 
      getReservation: { getReservation: getReservationData } = {},
      type = 'link' 
    } = this.props;
    const { showConfirmApprove } = this.state;

    if (!getReservationData) {
      return null;
    }

    const { nftIds = [] } = getReservationData
    const rightWordNFT = nftIds.length === 1 ? 'NFT' : 'NFTs';

    return (
      <>
        {type === 'link' ? (
          <a className={s.informationLink} onClick={this.handleToggleConfirmApproveModal}>
            <FormattedMessage {...messages.approve} />
          </a>
        ) : (
          <Button className={cx(bt.btnPrimary)} onClick={this.handleToggleConfirmApproveModal}>
            <FormattedMessage {...messages.approve} />
          </Button>
        )}

        <ModalConfirm 
          show={showConfirmApprove}
          onClose={this.handleToggleConfirmApproveModal}
          onOk={this.handleConfirmApprove}
          title={
            <FormattedMessage {...messages[nftIds.length ? 'confirmApproveAndBurnNFT' : 'confirmApproveAndMintNFT']} values={{ number: nftIds.length, rightWordNFT }}/>
          } 
        />
      </>
    );
  }
}

const mapState = (state) => ({
  wallet: state?.account?.data?.wallet,
});

export default compose(
  withStyles(s),
  connect(mapState),
  graphql(getReservationQuery,
    {
      name: 'getReservation',
      options: (props) => ({
        variables: {
          reservationId: props.reservationId
        },
        fetchPolicy: 'network-only',
        ssr: true
      })
    })
)(ApproveReservation);