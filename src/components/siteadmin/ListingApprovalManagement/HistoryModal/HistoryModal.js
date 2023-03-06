import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../../../Reservation/Reservation.css';
import c from './HistoryModal.css';
import {
  Col,
  Row,
  FormGroup,
  FormControl,
  Modal
} from 'react-bootstrap';
import { Field, reduxForm, change } from 'redux-form';

import { closeHistoryModal } from '../../../../actions/modalActions';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';


class HistoryModal extends Component {
  static propTypes = {
    closeHistoryModal: PropTypes.func.isRequired,
    historyModal: PropTypes.bool
  };

  static defaultProps = {
    historyModal: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }


  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
        <FormControl
          {...input}
          className={className}
          placeholder={label}
          componentClass={"textarea"}
        />
      </FormGroup>
    )
  }

  render() {
    const { closeHistoryModal, historyModal, listingHistory } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Modal show={historyModal} onHide={closeHistoryModal} dialogClassName={c.logInModalContainer} >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.history} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={c.logInModalBody}>
            <div className={c.root}>
              <div className={c.container}>
                {
                  listingHistory && listingHistory.map((item, index) => {
                    return (
                      <div className={s.positionRelative}>
                        <div className={s.displayTable}>
                          <div className={s.displayTableRow}>
                            <div className={cx(s.displayTableCell, s.borderLine, s.dateSectionWidth, c.dateWidthMobile, s.dateSection, 'reservationLine')}>
                            </div>
                            <div className={cx(s.circle, 'reservartioARCircle', c.histryCircle, 'histryCircleRTL')} style={{ borderColor: '#d9534f' }}>
                            </div>
                            <div className={cx(s.positionRelative, s.spaceTop3)}>
                              <div className={cx(s.displayTableCell, s.mainSection, s.space2, s.afterSection, 'reservationAfterSection')}>
                                <div className={s.displayTable}>
                                  <div className={s.displayTableRow}>
                                    <p className={cx(s.noMargin, s.dateFontMargin, s.fontWeight)}>{moment(item.createdAt).format('Do MMM, YYYY')}</p>
                                    <div className={cx(s.sectionTitleLight, s.responsiveDisplay, s.tabScreenresolution)}>
                                      {item.reason} - <FormattedMessage {...messages.listingRejected} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

HistoryModal = reduxForm({
  form: 'CommentForm', // a unique name for this form
})(HistoryModal);

const mapState = (state) => ({
  historyModal: state.adminModalStatus.historyModal,
  comment: state.adminModalStatus.comment,
  listingHistory: state.adminModalStatus.listingHistory
});

const mapDispatch = {
  closeHistoryModal,
  change
};

export default compose(
  withStyles(s, c),
  injectIntl,
  connect(mapState, mapDispatch),
)(HistoryModal);