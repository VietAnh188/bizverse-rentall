// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../locale/messages';
// Style
import {
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ExistingPage.css';
import bt from '../../components/commonStyle.css';
import defaultPic from '../../../public/SiteImages/vector.png';

// Component
import Loader from '../Loader';

// Redux action
import { ManagePublishStatus, submitForVerification, approveListing } from '../../actions/Listing/ManagePublishStatus';
import { cancelSubmitListing } from '../../actions/Listing/cancelSubmit'

import { openCommentModal, closeCommentModal } from '../../actions/modalActions';
import CommentModal from '../siteadmin/ListingApprovalManagement/CommentModal/CommentModal';
class ExistingPage1 extends Component {
  static propTypes = {
    listingSteps: PropTypes.shape({
      step1: PropTypes.string.isRequired,
      step2: PropTypes.string.isRequired,
      step3: PropTypes.string.isRequired,
      listing: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isReady: PropTypes.bool.isRequired,
        isPublished: PropTypes.bool.isRequired
      }),
      user: PropTypes.shape({
        userBanStatus: PropTypes.number,
      }),
    }),
    nextPage: PropTypes.any.isRequired,
    stepsLoading: PropTypes.bool,
    ManagePublishStatus: PropTypes.any.isRequired,
    publishListLoading: PropTypes.bool,
  };
  static defaultProps = {
    listingSteps: {
      step1: "inactive",
      step2: "inactive",
      step3: "inactive",
      step4: "active",
      listing: {
        id: 0,
        isReady: false,
        isPublished: false
      },
      user: {
        userBanStatus: 0,
      }
    },
    photosCount: 0,
    stepsLoading: false,
    publishListLoading: false
  };

  constructor(props) {
    super(props);
    this.handleApprove = this.handleApprove.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this);
  }

  async handleApprove(event) {
    const { approveListing, listingSteps: { listing: { id } }, openCommentModal } = this.props;
    if (event.target.value === 'approved') {
      await approveListing(id, 'approved');
    } else if (event.target.value === 'declined') {
      openCommentModal(id);
    }
  }

  async handleDecline(listId, comment) {
    const { closeCommentModal, approveListing } = this.props;
    await approveListing(listId, 'declined', comment);
    closeCommentModal();
  }

  async handleCancelSubmit() {
    const { listingSteps: { listing: { id } }, cancelSubmitListing } = this.props;

    cancelSubmitListing(id);
  }


  render() {
    const { nextPage, listingSteps, photosCount, stepsLoading, account, publishListLoading } = this.props;
    const { formatMessage } = this.props.intl;
    const { listingSteps: { hasReservation, listing: { id, isReady, isPublished, user, listApprovalStatus } } } = this.props;

    let userDelete = user && user.userDeletedAt;
    let isShowButton = false, stepOneCircle = false, stepTwoCircle = false, stepThreeCircle = false;
    let stepFour = false;

    if (stepsLoading) {
      return <Loader type={"text"} />
    }

    if (!userDelete) {
      isShowButton = true;
    } else {
      isShowButton = false;
    }

    let userBanStatusValue;
    if (user) {
      const { listingSteps: { listing: { user: { userBanStatus } } } } = this.props;
      userBanStatusValue = userBanStatus;
    }
    const { listingSteps: { step1, step2, step3, step4 } } = this.props;
    const { ManagePublishStatus, submitForVerification } = this.props;
    let isPhotoAvailable = false;
    if (photosCount > 0) {
      isPhotoAvailable = true;
    }

    if (step1 == 'completed') {
      stepOneCircle = true;
    }
    if (step2 == 'completed' && isPhotoAvailable) {
      stepTwoCircle = true;
    }
    if (step4 == 'completed') {
      stepThreeCircle = true;
    }

    if (step3 == "active") {
      stepFour = true;
    }

    if (step3 == "completed" && step4 == "active") {
      stepFour = true;
    }

    let isAdmin = false;
    if (!account) {
      isAdmin = true;
    }

    return (
      <div className={cx(s.mainSectionPadding, s.bizverseBox, s.bizverseBoxSecondary, 'noPaddingBottom')}>
        <Grid>
          <CommentModal handleDecline={this.handleDecline} />
          <Row className={s.landingContainer}>
            <Col xs={12} sm={7} md={7} lg={7}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <h3 className={s.landingTitle}><FormattedMessage {...messages.step1Heading} /></h3>
              </Col>
              <div>
                <div className={cx(s.displayTable, s.positionRelative)}>
                  <div className={s.displayTableRow}>
                    {
                      <div
                        className={cx(s.displayTableCell, s.vtrTop, s.iconWidth, s.borderLine, 'exitingBorderLine', { [s.borderLineActive]: stepOneCircle })}
                      >
                      </div>
                    }
                    <div
                      className={cx(s.circle, 'exittingCircle', { [s.circleSuccess]: stepOneCircle })}
                    >
                    </div>
                    <div className={cx(s.positionRelative)}>
                      <div className={cx(s.displayTableCell, s.vtrTop, s.contentWidth, s.paddingBottom, s.paddingLeft, s.mainSection)}>
                        <div className={cx(s.contentSection, s.bizverseBox, s.bizverseBoxSecondary)}>
                          <strong className={cx(s.step)}><span><FormattedMessage {...messages.step1HeadingNew} /></span></strong>
                          <h3 className={s.landingContentTitle}><FormattedMessage {...messages.Sayyourspace} /></h3>
                          <p className={cx(s.landingTitleStep)}><span><FormattedMessage {...messages.step1HeadingContent} /></span></p>
                          {
                            step1 == "active" && <Button className={cx(s.button, bt.btnPrimary)} onClick={() => nextPage('map')}>
                              <FormattedMessage {...messages.continue} />
                            </Button>
                          }
                          {
                            step1 == "completed" && !hasReservation && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('room')}>
                              <FormattedMessage {...messages.change} />
                            </a>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className={cx(s.displayTable, s.positionRelative)}>
                  <div className={s.displayTableRow}>
                    {
                      <div
                        className={cx(s.displayTableCell, s.vtrTop, s.iconWidth, s.borderLine, 'exitingBorderLine', { [s.borderLineActive]: stepTwoCircle })}
                      >
                      </div>
                    }
                    <div
                      className={cx(s.circle, 'exittingCircle', { [s.circleSuccess]: stepTwoCircle })}
                    >
                    </div>
                    <div className={cx(s.positionRelative)}>
                      <div className={cx(s.displayTableCell, s.vtrTop, s.contentWidth, s.paddingBottom, s.paddingLeft, s.mainSection)}>
                        <div className={cx(s.contentSection, s.bizverseBox, s.bizverseBoxSecondary)}>
                          <strong className={s.step}><span><FormattedMessage {...messages.step2Heading} /></span></strong>
                          <h3 className={s.landingContentTitle}><FormattedMessage {...messages.step2SubHeading} /></h3>
                          <p className={cx(s.landingTitleStep)}><span><FormattedMessage {...messages.step2HeadingContent} /></span></p>
                          {
                            step2 == "active" && <Button className={cx(s.button, bt.btnPrimary)} onClick={() => nextPage('photos')}>
                              <FormattedMessage {...messages.continue} />
                            </Button>
                          }
                          {
                            step2 == "completed" && !isPhotoAvailable && <Button className={cx(s.button, bt.btnPrimary)} onClick={() => nextPage('photos')}>
                              <FormattedMessage {...messages.continue} />
                            </Button>
                          }
                          {
                            step2 == "completed"  && !hasReservation && isPhotoAvailable && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('photos')}>
                              <FormattedMessage {...messages.change} />
                            </a>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className={cx(s.displayTable, s.positionRelative)}>
                  <div className={s.displayTableRow}>
                    {
                      <div className={cx(s.displayTableCell, s.vtrTop, s.iconWidth, s.borderLine, 'exitingBorderLine', { [s.borderLineActive]: stepThreeCircle })}>
                      </div>
                    }
                    <div
                      className={cx(s.circle, 'exittingCircle', { [s.circleSuccess]: stepThreeCircle })}
                    >
                    </div>
                    <div className={cx(s.positionRelative)}>
                      <div className={cx(s.displayTableCell, s.vtrTop, s.contentWidth, s.paddingLeft, s.mainSection)}>
                        <div className={cx(s.contentSection, s.bizverseBox, s.bizverseBoxSecondary)}>
                          <strong className={s.step}><span><FormattedMessage {...messages.step3Heading} /></span></strong>
                          <h3 className={s.landingContentTitle}><FormattedMessage {...messages.step3SubHeading} /></h3>
                          <p className={cx(s.landingTitleStep)}><span><FormattedMessage {...messages.step3HeadingContent} /></span></p>
                          {
                            stepFour == true && <Button className={cx(s.button, bt.btnPrimary)} onClick={() => nextPage('guest-requirements')}>
                              <FormattedMessage {...messages.continue} />
                            </Button>
                          }
                          {
                            step4 == "completed"  && !hasReservation && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('guest-requirements')}>
                              <FormattedMessage {...messages.change} />
                            </a>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Col xs={12} sm={12} md={12} lg={12}>
                <div className={s.sectionSplitter} />
              </Col>
              {
                !isShowButton &&
                <Col xs={12} sm={12} md={12} lg={12} >
                  <h3 className={s.spaceTop1}>
                    <FormattedMessage {...messages.listDeleted} />
                  </h3>
                </Col>
              }
              {/* ````````````````Publish Button````````````` */}
              {
                listingSteps && isReady && listApprovalStatus === 'approved' && !isPublished && !userBanStatusValue && isShowButton && <Col xs={12} sm={12} md={12} lg={12} >
                  <h3 className={s.spaceTop1}>
                    <FormattedMessage {...messages.readyToPublish} />
                  </h3>
                  
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                    <div className={s.displayInline}>
                      <Loader
                        type={"button"}
                        className={cx(s.button, bt.btnPrimary)}
                        handleClick={() => ManagePublishStatus(id, 'publish')}
                        show={publishListLoading}
                        label={formatMessage(messages.publishNow)}
                      />
                    </div>

                    <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, s.bizverseLink, 'prviewLinkAR')} rel="noreferrer">
                      <FormattedMessage {...messages.previewListing} />
                    </a>
                  </Col>
                </Col>
              }
              {/* ````````````````UnPublish Button````````````` */}
              {
                listingSteps && isReady && listApprovalStatus === 'approved' && isPublished && !userBanStatusValue && isShowButton && <Col xs={12} sm={12} md={12} lg={12} >
                  
                  {hasReservation ? 
                    <h3 className={s.spaceTop1}>
                      <FormattedMessage {...messages.listingHasReservation} />
                    </h3> : 
                    <h3 className={s.spaceTop1}>
                      <FormattedMessage {...messages.listingPublished} />
                    </h3>
                  }
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                    <div className={s.displayInline}>
                      <Loader
                        type={"button"}
                        className={cx(s.button, bt.btnPrimary)}
                        handleClick={() => ManagePublishStatus(id, 'unPublish')}
                        show={publishListLoading}
                        label={formatMessage(messages.unPublishNow)}
                        disabled={hasReservation}
                      />
                    </div>
                    <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, s.bizverseLink, 'prviewLinkAR')} rel="noreferrer"><FormattedMessage {...messages.previewListing} /> </a>
                  </Col>
                </Col>
              }
              {/* ````````````````Submit for verification Button````````````` */}
              {
                !isAdmin && listingSteps && isReady && !listApprovalStatus && !userBanStatusValue && isShowButton && <Col xs={12} sm={12} md={12} lg={12} >
                  <h3 className={s.spaceTop1}>
                    <FormattedMessage {...messages.readyForVerification} />
                  </h3>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                    <div className={s.displayInline}>
                      <Loader
                        type={"button"}
                        className={cx(s.button, bt.btnPrimary)}
                        handleClick={() => submitForVerification(id, 'submit')}
                        show={publishListLoading}
                        label={formatMessage(messages.submitForVerification)}
                      />
                    </div>

                    <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, s.bizverseLink, 'prviewLinkAR')} rel="noreferrer">
                      <FormattedMessage {...messages.previewListing} />
                    </a>
                  </Col>
                </Col>
              }

              {
                !isAdmin && listApprovalStatus === 'submit' && !userBanStatusValue && isShowButton && <Col xs={12} sm={12} md={12} lg={12} >
                  <h3 className={s.spaceTop1}>
                    <FormattedMessage {...messages.readyForApproval} />
                  </h3>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                    <div className={s.displayInline}>
                      <Loader
                        type={"button"}
                        className={cx(s.button, bt.btnPrimary)}
                        label={formatMessage(messages.cancelSubmitListing)}
                        handleClick={this.handleCancelSubmit}
                      />
                    </div>
                    <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, s.bizverseLink, 'prviewLinkAR')} rel="noreferrer">
                      <FormattedMessage {...messages.previewListing} />
                    </a>
                  </Col>
                </Col>
              }

              {/* ````````````````Submit for appeal Button````````````` */}
              {
                !isAdmin && listingSteps && isReady && listApprovalStatus === 'declined' && !userBanStatusValue && isShowButton && <Col xs={12} sm={12} md={12} lg={12} >
                  <h3 className={s.spaceTop1}>
                    <FormattedMessage {...messages.readyForVerification} />
                  </h3>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                    <div className={s.displayInline}>
                      <Loader
                        type={"button"}
                        className={cx(s.button, bt.btnPrimary)}
                        handleClick={() => submitForVerification(id, 'pending')}
                        label={formatMessage(messages.submitForAppeal)}
                      />
                    </div>

                    <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, s.bizverseLink, 'prviewLinkAR')} rel="noreferrer">
                      <FormattedMessage {...messages.previewListing} />
                    </a>
                  </Col>
                </Col>
              }

              {/* ````````````````Approve/Decline Admin Button````````````` */}

              {
                isAdmin && listingSteps && isReady && listApprovalStatus === 'pending' && !userBanStatusValue && isShowButton && <Col xs={12} sm={12} md={12} lg={12} >
                  <Row className={s.spaceTop4}>
                    <Col lg={4} md={4} sm={4} xs={12}>
                      <div className={'publishArrow'}>
                        <select className={cx(s.formSelect, s.formSelectNew)} value={listApprovalStatus} onChange={this.handleApprove}>
                          <option value="pending">{formatMessage(messages.messageStatus5)}</option>
                          <option value="approved">{formatMessage(messages.approved)}</option>
                          <option value="declined">{formatMessage(messages.declined)}</option>
                        </select>
                      </div>
                    </Col>
                    <Col lg={8} md={8} sm={8} xs={12}>
                      <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, s.bizverseLink, 'prviewLinkAR')} rel="noreferrer">
                        <FormattedMessage {...messages.previewListing} />
                      </a>
                    </Col>
                  </Row>
                </Col>
              }

              {
                isAdmin && listingSteps && isReady && listApprovalStatus === 'declined' && !userBanStatusValue && isShowButton && <Col xs={12} sm={12} md={12} lg={12} >
                  <h3 className={s.spaceTop1}>
                    <FormattedMessage {...messages.declineAdmin} />
                  </h3>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                    <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, s.bizverseLink, 'prviewLinkAR')} rel="noreferrer">
                      <FormattedMessage {...messages.previewListing} />
                    </a>
                  </Col>
                </Col>
              }

              {
                userBanStatusValue == true && isShowButton && <Col xs={12} sm={12} md={12} lg={12} >
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                    <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLinkUserBan, s.bizverseLink)} rel="noreferrer">
                      <FormattedMessage {...messages.previewListing} />
                    </a>
                  </Col>
                </Col>
              }
            </Col>

            <Col xs={12} sm={5} md={5} lg={5} className={'hidden-xs'}>
              <div>
                <div>
                  <img src={defaultPic} className={s.imageSection} />
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
const mapState = (state) => ({
  listingSteps: state.location.listingSteps,
  stepsLoading: state.location.stepsLoading,
  account: state.account.data,
  publishListLoading: state.location.publishListLoading,
});
const mapDispatch = {
  ManagePublishStatus,
  submitForVerification,
  approveListing,
  openCommentModal,
  closeCommentModal,
  cancelSubmitListing
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ExistingPage1)));
