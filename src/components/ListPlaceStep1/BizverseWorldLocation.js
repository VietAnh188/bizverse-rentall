// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

//Redux Form
import { Field, reduxForm } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Import action remove link and get list link
import { removeTypeLink, getTypeLink } from '../../actions/changeTypeLink';
import { removeSpaceLink, getSpaceLink } from '../../actions/changeSpaceLink';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Modal
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

// Helpers
import validate from './validate';

// Internal Components
import ListPlaceTips from '../ListPlaceTips';
import CloseIcon from 'react-icons/lib/fa/close';
import FormAddVR360 from './FormAddVR360';
import FormAddBizverseSpace from './FormAddBizverseSpace';

import update from './update';

class BizverseWorldLocation extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    listId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showAddVR360Form: false,
      showAddBizverseSpaceForm: false
    }
  }

  componentDidMount () {
    const {getTypeLink, getSpaceLink, listId} = this.props;
    getTypeLink(listId, 'vr360');
    getSpaceLink(listId, 'bizverseSpace');
  }

  handleToggleShowHideAddVR360Form = () => {
    this.setState((prevState) => ({
      showAddVR360Form: !prevState.showAddVR360Form
    }))
  }

  handleToggleShowHideAddBizverseSpaceForm = () => {
    this.setState((prevState) => ({
      showAddBizverseSpaceForm: !prevState.showAddBizverseSpaceForm
    }))
  }

  handleAddBizverseSpace = (newData) => {
    const { bizverseSpaceData = [], change } = this.props;

    change("bizverseSpaceData", [...bizverseSpaceData, newData])

    this.handleToggleShowHideAddBizverseSpaceForm();

    toastr.success('Success!', 'Your have added Bizverse Space successfully!');
  }

  handleDeleteBizverseSpace = async id => {
    const { removeSpaceLink } = this.props;

    await removeSpaceLink(id);

    toastr.success('Success!', 'Your have deleted Bizverse Space successfully!');
  }

  handleAddVR360 = (newData) => {
    const { vr360Data, change } = this.props;

    change("vr360Data", [...vr360Data, newData])

    this.handleToggleShowHideAddVR360Form();

    toastr.success('Success!', 'Your have added VR360 successfully!');
  }

  handleDeleteVR360 = async id => {
    const { removeTypeLink } = this.props;

    await removeTypeLink(id);

    toastr.success('Success!', 'Your have deleted VR360 successfully!');
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          placeholder={label}
          type={type}
          className={className}
        />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { handleSubmit, previousPage, nextPage, valid, vr360Data = [], bizverseSpaceData = [], listId } = this.props;
    const { formatMessage } = this.props.intl;
    const { showAddVR360Form, showAddBizverseSpaceForm } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.bizverseWorldLocation} />
              </h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <ControlLabel className={s.landingLabel}>
                      <FormattedMessage {...messages.hasBizverseLocation} />
                    </ControlLabel>
                    <div>
                      <label className={cx(s.blockRadioButton, s.landingLabel, s.bizverseBox, s.bizverserBoxSecondary)}>
                        <FormattedMessage {...messages.yesText} /> <Field name="hasBizverseLocation" component="input" type="radio" value="1" className={cx(s.pullRight, 'floatLeft')} />
                      </label>
                      <label className={cx(s.blockRadioButton, s.landingLabel, s.bizverseBox, s.bizverserBoxSecondary)}>
                        <FormattedMessage {...messages.noText} /> <Field name="hasBizverseLocation" component="input" type="radio" value="0" className={cx(s.pullRight, 'floatLeft')} />
                      </label>
                    </div>
                  </FormGroup>

                  <FormGroup className={cx(s.formGroup, s.space4)}>
                      <ControlLabel className={s.landingStep3}>
                          <FormattedMessage {...messages.linkVR360} />
                      </ControlLabel>

                      <div className={cx(s.vr360LinksContainer, s.bizverseBox, s.bizverseBoxSecondary)}>

                      {!!vr360Data && vr360Data.map(({ id, title, url }) => (
                        <div key={id} className={cx(s.vr360Item, s.bizverseBox, s.bizverseBoxSecondary)}>
                          <a target="_blank" className={cx(s.vr360Link, s.bizverseLink)} href={url}>{title}</a>
                          <CloseIcon onClick={() => this.handleDeleteVR360(id)} className={s.vr360DeleteIcon} />
                        </div>
                      ))}

                        <Button onClick={this.handleToggleShowHideAddVR360Form} className={cx(s.button, s.bizverseButtonSecondary, bt.btnLarge)}>
                          {formatMessage(messages.addLinkVR360)}
                        </Button>
                      </div>
                  </FormGroup>

                  <FormGroup className={cx(s.formGroup, s.space4)}>
                      <ControlLabel className={s.landingStep3}>
                          <FormattedMessage {...messages.linkBizverseSpace} />
                      </ControlLabel>

                      <div className={cx(s.vr360LinksContainer, s.bizverseBox, s.bizverseBoxSecondary)}>

                      {!!bizverseSpaceData && bizverseSpaceData.map(({ id, title, url }) => (
                        <div key={id} className={cx(s.vr360Item, s.bizverseBox, s.bizverseBoxSecondary)}>
                          <a target="_blank" className={cx(s.vr360Link, s.bizverseLink)} href={url}>{title}</a>
                          <CloseIcon onClick={() => this.handleDeleteBizverseSpace(id)} className={s.vr360DeleteIcon} />
                        </div>
                      ))}

                        <Button onClick={this.handleToggleShowHideAddBizverseSpaceForm} className={cx(s.button, s.bizverseButtonSecondary, bt.btnLarge)}>
                          {formatMessage(messages.addLinkBizverseSpace)}
                        </Button>
                      </div>
                  </FormGroup>

                </div>
                <div className={cx(s.nextPosition, s.bizverseBox, s.bizverseBoxSecondary)}>
                  <div className={s.nextBackButton}>
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.bizverseButtonSecondary, bt.btnLarge, s.pullLeft, 'floatRight')} onClick={() => previousPage("map")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.pullRight, 'floatLeft')} onClick={() => nextPage("amenities")} disabled={!valid}>
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </form>
            </div>
          </Col>
          <ListPlaceTips />
        </Row>

        <Modal show={showAddVR360Form} onHide={this.handleToggleShowHideAddVR360Form} dialogClassName={cx(s.logInModalContainer, 'loginModal', 'wishListCloseBtn')} >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
          
            <div className={s.root}>
            <h4 className={s.titleBold}>
              <FormattedMessage {...messages.addVR360} />
            </h4>
              <div className={cx(s.container, s.containerPadding)}>
                <FormAddVR360 
                listId={listId}
                onAdd={this.handleAddVR360}
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showAddBizverseSpaceForm} onHide={this.handleToggleShowHideAddBizverseSpaceForm} dialogClassName={cx(s.logInModalContainer, 'loginModal', 'wishListCloseBtn')} >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
          
            <div className={s.root}>
            <h4 className={s.titleBold}>
              <FormattedMessage {...messages.addBizverseSpace} />
            </h4>
              <div className={cx(s.container, s.containerPadding)}>
                <FormAddBizverseSpace 
                  listId={listId}
                  onAdd={this.handleAddBizverseSpace} 
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Grid>
    )
  }
}

BizverseWorldLocation = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update,
  validate
})(BizverseWorldLocation);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  vr360Data: state.changeTypeLink.linkList,
  bizverseSpaceData: state.changeSpaceLink.linkList,
});

const mapDispatch = {
  removeTypeLink,
  getTypeLink,
  removeSpaceLink,
  getSpaceLink
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(BizverseWorldLocation)));
