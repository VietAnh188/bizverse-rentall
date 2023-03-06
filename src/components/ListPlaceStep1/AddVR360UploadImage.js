// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

// Internal Component
import PhotoUploadThumbnail from './PhotosUploadThumbnail/PhotoUploadThumbnail';

// Validate
import updateStep2 from './updateStep2';

// Helpers
import validateStep2 from './validateStep2';

class AddVR360UploadImage extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    listId: PropTypes.number.isRequired,
    photosCount: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAvailable: false
    };
  }

  componentWillMount() {
    const { photosCount } = this.props;

    if (photosCount > 0) {
      this.setState({ isAvailable: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { photosCount } = nextProps;

    if (photosCount > 0) {
      this.setState({ isAvailable: true });
    } else {
      this.setState({ isAvailable: false });
    }
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, listId } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Grid fluid className={s.unsetPaddingDefault}>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.landingContent, s.unsetPaddingDefault)}>
            <div>
              <p className={cx(s.landingContentTitle, s.unsetMarginButton)}><FormattedMessage {...messages.uploadThumbnail} /></p>
              <form>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <PhotoUploadThumbnail listId={listId} placeholder={formatMessage(messages.photosPlaceholder)} />
                  </FormGroup>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

AddVR360UploadImage = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep2,
  validate: validateStep2,
})(AddVR360UploadImage);

const mapState = (state) => ({
  photosCount: state.location.photosCount
});
const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AddVR360UploadImage)));







