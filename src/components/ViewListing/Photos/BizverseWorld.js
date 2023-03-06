import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Redux
import { connect } from 'react-redux';

// Style
import s from './Photos.css';
import bt from '../../../components/commonStyle.css';

// Components
import {
  Modal
} from 'react-bootstrap';
import CloseIcon from 'react-icons/lib/fa/close';
import { 
    Button,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// constants
import { BIZVERSE_WORLD_URL } from '../../../config';

// Icons
import icon3DSpace from '../../../../public/SiteIcons/icon-3d-space.svg'
import iconBizverseSpace from '../../../../public/SiteIcons/icon-bizverse-space.svg'
import iconWorld from '../../../../public/SiteIcons/icon-world.svg'

class BizverseWorld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showBizverseWorld: false,
            showBizverseSpaceLinks: false,
            showVR360Links: false
        }
    }

    handleToggleShowBizverseWorld = () => {
        this.setState((prevState) => ({
            showBizverseWorld: !prevState.showBizverseWorld
        }))
    }

    handleToggleShowVR360Links = () => {
        this.setState((prevState) => ({
            showVR360Links: !prevState.showVR360Links
        }))
    }

    handleToggleShowBizverseSpaceLinks = () => {
        this.setState((prevState) => ({
            showBizverseSpaceLinks: !prevState.showBizverseSpaceLinks
        }))
    }

    render() {
        const { lat, lng, vr360Data = [], bizverseSpaceData = [] } = this.props;
        const { showBizverseWorld, showVR360Links, showBizverseSpaceLinks } = this.state;

        // Link to listing on bizverse world
        const bizverseWorldLink = `${BIZVERSE_WORLD_URL}/guest#16/${lat}/${lng}/-45/77`

        const renderItemList = (list) => {
            return (
                list.map(item => {
                    return (
                        <div 
                            className={s.modalBodyItem}
                            key={item.id}
                        >
                            <img 
                                className={s.modalBodyItemImage} 
                                src={item.fullLink} 
                            />
                            <p>
                                <a 
                                    className={cx(s.vr360Link, s.bizverseLink, s.customLink)}
                                    target="_blank"
                                    href={item.url}
                                >
                                    {item.title}
                                </a>
                            </p>
                        </div>
                    )
                })
            )
        }

        return (
            <div>
                {!!vr360Data.length && 
                <OverlayTrigger
                    overlay={<Tooltip id='vr360'><FormattedMessage {...messages.vr360} /></Tooltip>}
                    placement="top"
                >
                    <Button
                        className={cx(bt.btnPrimary, s.overviewListingBtn)}
                        onClick={this.handleToggleShowVR360Links}
                    >
                        <img src={icon3DSpace} alt="3D Space" />
                    </Button>
                </OverlayTrigger>
                }

                {!!bizverseSpaceData.length && 
                <OverlayTrigger
                    overlay={<Tooltip id='vr360'><FormattedMessage {...messages.bizverseSpace} /></Tooltip>}
                    placement="top"
                >
                    <Button
                        className={cx(bt.btnPrimary, s.overviewListingBtn)}
                        onClick={this.handleToggleShowBizverseSpaceLinks}
                    >
                        <img src={iconBizverseSpace} alt="Bizverse Space" />
                    </Button>
                </OverlayTrigger>
                }

                <OverlayTrigger
                    overlay={<Tooltip id='vr360'><FormattedMessage {...messages.viewOnBizverseWorld} /></Tooltip>}
                    placement="top"
                >
                    <Button
                        className={cx(bt.btnPrimary, s.overviewListingBtn)}
                        onClick={this.handleToggleShowBizverseWorld}
                    >
                        <img src={iconWorld} alt="Bizverse world" />
                    </Button>
                </OverlayTrigger>

                {/* Modal embed link to listing on bizverse world */}
                <Modal 
                    show={showBizverseWorld} 
                    animation={false} 
                    onHide={this.handleToggleShowBizverseWorld} 
                    dialogClassName={cx(s.modalListingOnBizverseWorld, s.bizverseBox, s.bizverseBoxSecondary, s.customModalAnimation, "modalListingOnBizverseWorld")} 
                >
                    <Modal.Body bsClass={s.logInModalBody}>
                        <div className={s.listingOnBizverseHeader}>
                            <h3><FormattedMessage {...messages.previewListing} /></h3>
                            <div>
                                <CloseIcon onClick={this.handleToggleShowBizverseWorld} className={s.listingOnBizverseWorldIcon} />
                            </div>
                        </div>
                        <div className={cx(s.sectionSplitter, s.modalContentSplitter)} />
                        <div className={s.listingOnBizverseWorldWrapper}>
                            <iframe 
                                className={cx(s.listingOnBizverseWorld, s.bizverseBox, s.bizverseBoxSecondary)}
                                src={bizverseWorldLink} 
                                width="100%" 
                                height="100%" 
                                frameborder="0"
                                allowfullscreen 
                                allow="microphone; camera; vr; speaker; display-capture;">     
                            </iframe>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal 
                    show={showVR360Links}
                    animation={false}
                    className={s.vr360Dialog}
                    onHide={this.handleToggleShowVR360Links}
                    dialogClassName={cx(s.bizverseBox, s.bizverseBoxSecondary, s.modalContainerCustomPadding)}
                >
                    <Modal.Body bsClass={s.logInModalBody} className = {s.customModalPadding}>
                            <div className={cx(s.listingOnBizverseHeader, s.modalCustomPosition, s.modalHeader)}>
                                <h3 className={s.headingTitle}><FormattedMessage {...messages.vr360Links} /></h3>
                                <div>
                                    <CloseIcon onClick={this.handleToggleShowVR360Links} className={s.listingOnBizverseWorldIcon} />
                                </div>
                            </div>
                            <div className={s.modalBody}>
                                {renderItemList(vr360Data)}
                            </div>
                    </Modal.Body>
                </Modal>

                <Modal 
                    show={showBizverseSpaceLinks} 
                    animation={false}
                    className={s.vr360Dialog}
                    onHide={this.handleToggleShowBizverseSpaceLinks} 
                    dialogClassName={cx(s.bizverseBox, s.bizverseBoxSecondary, s.modalContainerCustomPadding, "modalListingOnBizverseWorld")}
                >
                    <Modal.Body bsClass={s.logInModalBody} className = {s.customModalPadding}>
                            <div className={cx(s.listingOnBizverseHeader, s.modalCustomPosition, s.modalHeader)}>
                                <h3 className={s.headingTitle}><FormattedMessage {...messages.bizverseSpaceLinks} /></h3>
                                <div>
                                    <CloseIcon onClick={this.handleToggleShowBizverseSpaceLinks} className={s.listingOnBizverseWorldIcon} />
                                </div>
                            </div>
                            <div className={s.modalBody}>
                                {renderItemList(bizverseSpaceData)}
                            </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapState = (state) => {
    const { bizverseSpaceData, vr360Data, lat, lng } = state?.viewListing?.current || {}

    return {
        vr360Data,
        bizverseSpaceData,
        lat,
        lng
    }
};

export default connect(mapState)(BizverseWorld);