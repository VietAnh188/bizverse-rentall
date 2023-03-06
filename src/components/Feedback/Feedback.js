import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { graphql, gql, compose } from "react-apollo";
import { FormattedMessage, injectIntl } from "react-intl";
import { Row, Col, Grid } from "react-bootstrap";
import s from "./Feedback.css";
import cx from "classnames";

// Image icons
import phoneIcon from "../../../public/SiteImages/phone-call.svg";
import guaranteeIcon from "../../../public/SiteImages/guarantee.svg";
import verifiedIcon from "../../../public/SiteImages/verified-protection.svg";
import messages from "../../locale/messages";
class Feedback extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getFooterSetting: PropTypes.shape({
        title1: PropTypes.string.isRequired,
        content1: PropTypes.string.isRequired,
        title2: PropTypes.string.isRequired,
        content2: PropTypes.string.isRequired,
        title3: PropTypes.string.isRequired,
        content3: PropTypes.string.isRequired,
      }),
    }),
  };

  render() {
    const {
      data: { loading, getFooterSetting },
    } = this.props;
    console.log(getFooterSetting)
    if (!loading) {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.feedbackContainer}>
              <Grid fluid>
                <Row className={s.feedbackRow}>
                  {getFooterSetting && (
                    <Col
                      xs={12}
                      sm={4}
                      md={4}
                      lg={4}
                      className={cx(s.feedbackBox, "feedbackBorderLeftRtl")}
                    >
                      <div className={cx(s.feedbackIcon, "overViewIconrtl")}>
                        {/* <FontAwesome.FaPhone /> */}
                        <svg className={cx(s.overviewIcon)}>
                          <use
                            
                            xlinkHref={phoneIcon + "#Layer_1"}
                          ></use>
                        </svg>
                       
                      </div>

                      <div className={cx(s.feedbackContent, "feedbackContent")}>
                        <label className={s.landingLabel}>
                          <FormattedMessage {...messages.feedbackContent1}/>
                        </label>
                        <label className={s.landingCaption}>
                          <FormattedMessage {...messages.feedbackItemContent1}/>
                        </label>
                      </div>
                    </Col>
                  )}
                  {getFooterSetting && (
                    <Col
                      xs={12}
                      sm={4}
                      md={4}
                      lg={4}
                      className={cx(s.feedbackBox, "feedbackBorderNoneRtl")}
                    >
                      <div className={cx(s.feedbackIcon, "overViewIconrtl")}>
                        {/* <FontAwesome.FaShield /> */}
                        <svg className={s.overviewIcon}>
                          <use xlinkHref={guaranteeIcon + "#Layer_1"}></use>
                        </svg>
                      </div>
                      <div className={cx(s.feedbackContent, "feedbackContent")}>
                        <label className={s.landingLabel}>
                          <FormattedMessage {...messages.feedbackContent2}/>
                        </label>
                        <label className={s.landingCaption}>
                          <FormattedMessage {...messages.feedbackItemContent2}/>
                        </label>
                      </div>
                    </Col>
                  )}
                  {getFooterSetting && (
                    <Col
                      xs={12}
                      sm={4}
                      md={4}
                      lg={4}
                      className={cx(s.feedbackBox, "feedbackBorderRightRtl")}
                    >
                      <div className={cx(s.feedbackIcon, "overViewIconrtl")}>
                        {/* <FontAwesome.FaCheckSquareO /> */}
                        <svg className={s.overviewIcon}>
                          <use xlinkHref={verifiedIcon + "#Layer_1"}></use>
                        </svg>
                      </div>
                      <div className={cx(s.feedbackContent, "feedbackContent")}>
                        <label className={s.landingLabel}>
                          {" "}
                          <FormattedMessage {...messages.feedbackContent3}/>
                        </label>
                        <label className={s.landingCaption}>
                          <FormattedMessage {...messages.feedbackItemContent3}/>
                        </label>
                      </div>
                    </Col>
                  )}
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(
    gql`
      query getFooterSetting {
        getFooterSetting {
          id
          title1
          content1
          title2
          content2
          title3
          content3
        }
      }
    `,
    { options: { ssr: true } },
  ),
)(Feedback);
