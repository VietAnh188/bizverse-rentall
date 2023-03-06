import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';

// React Redux
import { connect } from 'react-redux';

import {
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './FavIconUploader.css';
import bt from '../../../../components/commonStyle.css';
import DeleteIcon from '../../../../../public/adminIcons/dlt.png';
import defaultPic from '../../../../../public/adminIcons/defaultAdmin.svg';

// Internal Component
import DropZone from './DropZone';
import Loader from '../../../Loader/Loader';

// Locale
import messages from '../../../../locale/messages';
import { deleteFavIcon } from '../../../../actions/siteadmin/manageLogo';

// config 
import * as config from '../../../../config'


class FavIconUploader extends React.Component {

    static propTypes = {
        favIconLoader: PropTypes.bool,
        data: PropTypes.object
    };

    static defaultProps = {
        favIconLoader: false
    };

    render() {
        const { favIconLoader, data: { loading, getSiteSettingsLogo = {} }, faviconLogo, deleteFavIcon } = this.props;

        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.textAlignCenter, s.positionRelative)}>
                    <Loader
                        show={favIconLoader}
                        type={"page"}
                    >
                        {!loading && getSiteSettingsLogo &&
                            <div className={bt.picContainerMain}>
                                <div className={bt.picContainer}>
                                    <div className={bt.profilePic}>
                                        <div
                                            // timestamp usage for refresh the image when upload new image
                                            style={{ backgroundImage: `url(${config.AWS_SERVICE_URL}images/favicon/${getSiteSettingsLogo.value})` }}
                                            className={bt.profileImageBg}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {
							!loading && getSiteSettingsLogo && !getSiteSettingsLogo.value && <div
								style={{ backgroundImage: `url(${config.AWS_SERVICE_URL}${config.AWS_SERVICE_URL_DEFAULT_PIC})` }}
								className={bt.profileImageBg}
							/>
						}
						{
							!loading && getSiteSettingsLogo === null && <div
								style={{ backgroundImage: `url(${config.AWS_SERVICE_URL}${config.AWS_SERVICE_URL_DEFAULT_PIC})` }}
								className={bt.profileImageBg}
							/>
						}
                        {/* {
                            !loading && getSiteSettingsLogo && getSiteSettingsLogo.value && <a href="javascript:void(0);" onClick={() => deleteFavIcon('Favicon Logo', 'faviconLogo', getSiteSettingsLogo.value)}
                                className={cx(bt.trashIconNew, 'trashIconNewRTL')}>
                                <img src={DeleteIcon} alt='Delete' />
                            </a>
                        } */}
                    </Loader>
                    <p className={s.pngFontSize}><FormattedMessage {...messages.pngOnlyLabel} /></p>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
                    <div className={cx(s.fullWidth, s.button, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
                        <DropZone oldFaviconLogo={getSiteSettingsLogo && getSiteSettingsLogo.value} />
                    </div>
                </Col>
            </Row>
        );
    }
}

const mapState = (state) => ({
    favIconLoader: state.loader.favIconLoader
});

const mapDispatch = {
    deleteFavIcon
};

export default compose(
    withStyles(s, bt),
    connect(mapState, mapDispatch),
    graphql(gql`
        query getSiteSettingsLogo($title: String!, $name: String!) {
            getSiteSettingsLogo(title:$title, name: $name) {
                status
                errorMessage
                title
                name
                value
            }
        }
    `, {
        options: {
            ssr: true,
            variables: {
                title: 'Favicon Logo',
                name: 'faviconLogo'
            }
        }
    }),
)(FavIconUploader);