// General
import React, { Component } from "react";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./LoginModal.css";
import bt from "../../components/commonStyle.css";
import { Modal } from "react-bootstrap";

// Redux
import { connect } from "react-redux";
import { closeLoginModal } from "../../actions/modalActions";

// Components
import SocialLogin from "../SocialLogin";

class LoginModal extends Component {
  render() {
    const { closeLoginModal, loginModal } = this.props;

    return (
      <div>
        <Modal
          show={loginModal}
          animation={false}
          onHide={closeLoginModal}
          dialogClassName={cx(s.logInModalContainer, "loginModal")}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <SocialLogin />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({
  loginModal: state.modalStatus.isLoginModalOpen
});

const mapDispatch = {
  closeLoginModal
};

export default withStyles(s, bt)(connect(mapState, mapDispatch)(LoginModal));
