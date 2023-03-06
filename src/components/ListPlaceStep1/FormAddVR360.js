// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

// Redux Form
import { Field, reduxForm, reset } from 'redux-form';
import validate from './validateFormAddVR360';

// Translation
import { injectIntl } from 'react-intl';
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';

import { compose } from 'react-apollo';

// Import component upload image
import AddVR360UploadImage from './AddVR360UploadImage';

// Import action save link
import { saveTypeLink } from '../.../../../actions/changeTypeLink';

class FormAddVR360 extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.any,
    listId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx(s.formGroup, 'row')}>
        <Col componentClass={ControlLabel} xs={12} sm={12} md={12} lg={12}>
          <label className={s.labelText} >{label}</label>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <FormControl {...input} placeholder={placeholder} type={type} className={className} />
          {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </Col>
      </FormGroup>
    );
  }
  
  renderUploadImage = ({ input, label, type, meta: { touched, error }, className, placeholder, link }) => {
    return (

    <FormGroup className={cx(s.formGroup, 'row')}>
      <Col xs={12} sm={12} md={12} lg={12}>
        <AddVR360UploadImage />
        {!link && <span className={s.errorMessage}>*Required</span>}
      </Col>
    </FormGroup>

   )
  }

  submitForm = async values => {
    const { listId, onAdd, currentLink, saveTypeLink } = this.props;
    const newData = {...values, fullLink: currentLink, listId, type: 'vr360'};
    await saveTypeLink(newData);
    onAdd(newData);
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, valid, currentLink } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={'inputFocusColor'}>
        <form onSubmit={handleSubmit(this.submitForm)}>
          <Field
            name="title"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.vr360Title)}
            placeholder={formatMessage(messages.vr360Title)}
            className='inputModal'
          />

          <Field
            name="url"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.vr360Link)}
            placeholder={formatMessage(messages.vr360Link)}
            className='inputModal'
          />

          <Field
            name="thumbnail"
            type="file"
            component={this.renderUploadImage}
            label={formatMessage(messages.uploadThumbnail)}
            placeholder={formatMessage(messages.uploadThumbnail)}
            className='uploadThumbnailModal'
            link = {currentLink}
          />

          <FormGroup className={s.formGroup}>
            <Button className={cx(s.button, bt.btnPrimary, bt.btnLarge)}  block type="submit" disabled={!valid || !currentLink}>
              {formatMessage(messages.save)}
            </Button>
          </FormGroup>
        </form>
      </div>
    )
  }

}

FormAddVR360 = reduxForm({
  form: "FormAddVR360",
  validate,
})(FormAddVR360);

const mapState = (state) => ({
  currentLink: state.uploadPhoto.currentLink,
});

const mapDispatch = {
  saveTypeLink,
};

export default compose(injectIntl,withStyles(s, bt))(connect(mapState, mapDispatch)(FormAddVR360));