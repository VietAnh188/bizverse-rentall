import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import s from "./HomeKindofTrip.css";
import { Grid, Row, Col } from "react-bootstrap";
import cx from "classnames";

// Loader
import Loader from "../../Loader";

// config
import * as config from "../../../config"
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "../../../locale/messages";

class HomeKindofTrip extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    loading: PropTypes.bool,
  };

  render() {
    let path = config.AWS_SERVICE_URL + "images/home/";
    let headerTitle, headerContent, blockTitle1, blockContent2;
    let blockContent1, blockImage1, blockTitle2, blockImage2;
    const { loading, data } = this.props;
    if (data && data.getStaticInfo) {
      data.getStaticInfo.map((item, key) => {
        if (item.name == "header") {
          headerTitle = item.title;
          headerContent = item.content;
        } else if (item.name == "block1") {
          blockTitle1 = item.title;
          blockContent1 = item.content;
          blockImage1 = item.image;
        } else {
          blockTitle2 = item.title;
          blockContent2 = item.content;
          blockImage2 = item.image;
        }
      });
    }

    if (loading) {
      return <Loader type={"text"} />;
    } else {
      return (
        <div className={s.container}>
          <Grid fluid className={s.containerPadding}>
            <div className={s.homeFind}>
              <div className={s.containerTitle}>
                <div className={s.homeFindHeader}><FormattedMessage {...messages.homeTitleBlock}/></div>
                <div className={s.homePara}><FormattedMessage {...messages.homeHeaderBlock}/></div>
              </div>
              <div className={s.homeFindMain}>
                <Row className={cx(s.SectionPadding)}>
                  <Col lg={6} md={6} sm={6} xs={12}>
                    <div className={s.homeFindLeft}>
                      <div
                        className={s.homeFindBg}
                        style={{
                          backgroundImage: `url(${path}${blockImage1})`,
                        }}
                      >
                        <div className={s.homeFindText}>
                          {/* <div className={s.homeFindSmall}>{blockTitle1}</div> */}
                          <div className={s.homeParaInner}><FormattedMessage {...messages.homeBlockContent1}/></div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={cx(s.paddingTopMobile)}
                  >
                    <div className={s.homeFindLeft}>
                      <div
                        className={s.homeFindBg}
                        style={{
                          backgroundImage: `url(${path}${blockImage2})`,
                        }}
                      >
                        <div className={s.homeFindText}>
                          {/* <div className={s.homeFindSmall}>{blockTitle1}</div> */}
                          <div className={s.homeParaInner}><FormattedMessage {...messages.homeBlockContent2}/></div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Grid>
        </div>
      );
    }
  }
}

export default (injectIntl, withStyles(s))(HomeKindofTrip);
