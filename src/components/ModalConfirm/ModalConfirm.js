import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Style
import s from './ModalConfirm.css';
import bt from '../commonStyle.css';

// Locale
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../locale/messages';

// Components
import {
  Modal,
  Button
} from 'react-bootstrap';
import CloseIcon from 'react-icons/lib/fa/close';

class CustomModal extends React.Component {

    render() {
        const { onClose, show, title, onOk, dialogClassName, titleClassName } = this.props;

        return (
          <Modal 
              show={show} 
              animation={false} 
              onHide={onClose} 
              dialogClassName={cx(s.modalContainer, s.bizverseBox, s.bizverseBoxSecondary, "modalConfirm", {
                  [dialogClassName]: !!dialogClassName
              })} 
          >
              <Modal.Body bsClass={s.logInModalBody}>
                  <div className={s.modalCustomHeader}>
                      <h3 className={cx(s.modalTitle, {[titleClassName]: !!titleClassName})}>{title}</h3>
                      <div>
                          <CloseIcon onClick={onClose} className={s.modalCloseIcon} />
                      </div>
                  </div>
                  <div className={cx(s.sectionSplitter, s.modalContentSplitter)} />
                  <div className={s.actionsWrapper}>
                    <Button
                          className={cx(s.button, s.bizverseButtonSecondary, bt.btnLarge, s.pullLeft, 'floatRight')}
                          onClick={onClose}
                        >
                          <FormattedMessage {...messages.cancel} />
                    </Button>
                    <Button className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.pullRight, 'floatLeft')} onClick={onOk}>
                        <FormattedMessage {...messages.continue} />
                    </Button>
                  </div>
              </Modal.Body>
          </Modal>
        )
    }
}

export default withStyles(s, bt)(CustomModal);