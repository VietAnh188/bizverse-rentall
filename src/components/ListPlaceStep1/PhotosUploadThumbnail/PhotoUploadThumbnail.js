import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Redux Action
import { removeListPhotos } from '../../../actions/manageListPhotos';
import { uploadPhoto, removePhoto } from '../../../actions/uploadPhoto';
 
// Style
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import style from './filepicker.css';

import { maxUploadSize } from '../../../config';

class PhotoUploadThumbnail extends Component {

  static propTypes = {
    uploadPhoto: PropTypes.any.isRequired,
    removePhoto: PropTypes.any.isRequired,
    removeListPhotos: PropTypes.any.isRequired,
    listId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
    this.complete = this.complete.bind(this);
    this.dropzone = null;
    this.addedfile = this.addedfile.bind(this);
    this.state = {
      djsConfig: {},
      isSetLink: true,
    }
  }

  componentDidMount() {
    const { placeholder } = this.props;
    const isBrowser = typeof window !== 'undefined';
    const isDocument = typeof document !== undefined;

    const element = document.querySelector(".dz-hidden-input");
    if (isBrowser && isDocument) {
      if (element !== null) {
        element.style.visibility = 'visible';
        element.style.opacity = '0';
        element.style.height = '100%';
        element.style.width = '100%';
        element.style.cursor = 'pointer';
      }
    }

    if (placeholder) {
      this.setState({
        djsConfig: {
          dictDefaultMessage: placeholder,
          addRemoveLinks: false,
          maxFilesize: 1,
          maxFiles: 1,
          acceptedFiles: 'image/jpeg,image/png',
          hiddenInputContainer: '.dzInputContainer',
        }
      });
    }
  }

  componentDidMount () {
    this.setState({isSetLink: false});
  }

  componentWillMount() {
    const { placeholder } = this.props;

    if (placeholder) {
      this.setState({
        djsConfig: {
          dictDefaultMessage: placeholder,
          addRemoveLinks: false,
          maxFilesize: 1,
          maxFiles: 2,
          acceptedFiles: 'image/jpeg,image/png',
          hiddenInputContainer: '.dzInputContainer',
        }
      });
    }
  }

  success(file, fromServer) {}

  addedfile(file) {
    
    // not more than the size in the server config
    if (file.size > (1024 * 1024 * maxUploadSize)) {
      toastr.error('Maximum upload size Exceeded! ', 'Try with smallest size image');
      this.dropzone.removeFile(file);
    }
  }

  complete(file) {
    const { uploadPhoto } = this.props;

    if (file?.xhr?.response) {
        uploadPhoto(file);
        this.setState({isSetLink: true})
      
      this.dropzone.removeFile(file);
    }
  }

  render() {
    const { djsConfig } = this.state;
    const { currentLink } = this.props;

    // Action store
    const { removePhoto } = this.props;

    const linkRemove = currentLink?.slice(process.env.AWS_SERVICE_URL.length + 17);

    const componentConfig = {
      iconFiletypes: ['.jpg', '.png'],
      postUrl: '/photos'
    };
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      success: this.success,
      complete: this.complete,
      addedfile: this.addedfile
    };

    const handleRemovePhoto = (linkRemove) => {
      removePhoto(linkRemove);
    }

    const renderUploadPhotoArea = () => {
      return (
        (!currentLink || !this.state.isSetLink) ? (
          <div className={cx('dzInputContainer', 'zoneUploadImage')}>
            <DropzoneComponent
              className = {style.customWidthUploadFile}
              config={componentConfig}
              eventHandlers={eventHandlers}
              djsConfig={djsConfig}
            />
          </div>
          ) : (
          <div className={style.imageContainer}>
            <img className={style.image} src={currentLink} />
            <div className={style.imageCloseButton}>
              <span onClick={() => handleRemovePhoto(linkRemove)}>X</span>
            </div>
          </div>
        )
      )
    }

    return (
      <div className={cx('listPhotoContainer')}>
        {renderUploadPhotoArea()}
        <div className='bizverse-text-secondary'>
          <FormattedMessage {...messages.uploadSizedLabel} /> {maxUploadSize}MB
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  currentLink: state.uploadPhoto.currentLink,
});

const mapDispatch = {
  removeListPhotos,
  uploadPhoto,
  removePhoto
};

export default withStyles(s, style)(connect(mapState, mapDispatch)(PhotoUploadThumbnail));
