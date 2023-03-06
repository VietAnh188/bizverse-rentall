import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import DropzoneComponent from 'react-dropzone-component';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

import { connect } from 'react-redux';
import { startLogoUploaderLoader, doUploadLogo, doRemoveLogo, stopLogoUploaderLoader } from '../../../../actions/siteadmin/manageLogo';
import { change } from 'redux-form';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
import { maxUploadSize } from '../../../../config';

class Dropzone extends Component {

    static propTypes = {
        doUploadLogo: PropTypes.any.isRequired,
        doRemoveLogo: PropTypes.any.isRequired,
        startLogoUploaderLoader: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: null
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { doUploadLogo, data, change } = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data != null ? data.value : null;
        let filePath = fromServer.file.path;
        doUploadLogo(fileName, filePath, oldPicture);
        await change('SiteSettingsForm', 'Logo', fileName);
    }

    addedfile(file, fromServer) {
        const { startLogoUploaderLoader } = this.props;

		let fileFormates = [
			'image/svg+xml',
			'application/sql',
			'application/pdf',
			'application/vnd.oasis.opendocument.presentation',
			'text/csv',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/epub+zip',
			'application/zip',
			'text/plain',
			'application/rtf',
			'application/vnd.oasis.opendocument.text',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.oasis.opendocument.spreadsheet',
			'text/tab-separated-values',
			'text/calendar',
			'application/json',
		];


		if (file && file.size > (1024 * 1024 * maxUploadSize)) {
			toastr.error('Maximum upload size Exceeded! ', 'Try again with a smaller sized image');
			this.dropzone.removeFile(file);
		} else if (fileFormates.indexOf(file && file.type) > 0) {
			setTimeout(() => {
				if (file && file.accepted === false) {
					toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
					this.dropzone.removeFile(file.name);
				}
			}, 1000);
		} else if (file && file.accepted === false) {
			setTimeout(() => {
				if (file && file.accepted === false) {
					toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
					this.dropzone.removeFile(file.name);
				}
			}, 1000);
		} else {
			startLogoUploaderLoader();
		}

    }

    render() {
        const { formatMessage } = this.props.intl;
        const djsConfig = {
            dictDefaultMessage: formatMessage(messages.clickHeretoUploadLogo),
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadLogo'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                />
            </div>
        );
    }
}

const mapState = (state) => ({
    change
});

const mapDispatch = {
    doUploadLogo,
    doRemoveLogo,
    startLogoUploaderLoader,
    stopLogoUploaderLoader
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
