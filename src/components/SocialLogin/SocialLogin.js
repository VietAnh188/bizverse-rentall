import React, { Component } from "react";
import PropTypes from "prop-types";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Image } from "react-bootstrap";

import cx from "classnames";
import s from "./SocialLogin.css";

// Locale
import bizverseIcon from "../../../public/SocialNetwork/logoBizverse.png";
import { bizverseAppId, bizverseLinkSocialApp } from "../../config";

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
  };

  render() {
    let BizverseURL = `${bizverseLinkSocialApp}oauth?app_id=${bizverseAppId}`;

    return (
      <div>
        <div className={s.formGroup}>
          <a className={cx(s.bizverse, s.button)} href={BizverseURL}>
            <div className={cx(s.icon, "floatRight")}>
              <Image src={bizverseIcon} responsive />
            </div>
            Continue with Bizverse
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SocialLogin);
