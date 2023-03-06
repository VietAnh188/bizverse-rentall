import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Style
import s from './Modal.css';

// Components
import {
  Modal
} from 'react-bootstrap';
import CloseIcon from 'react-icons/lib/fa/close';

class CustomModal extends React.Component {

    render() {
        const { onClose, show, children, headline, titleClassName, dialogClassName, modalContentWrapper } = this.props;

        return (
          <Modal 
              show={show} 
              animation={false} 
              onHide={onClose} 
              dialogClassName={cx(s.modalContainer, s.bizverseBox, s.bizverseBoxSecondary, "modalListingOnBizverseWorld", {
                  [dialogClassName]: !!dialogClassName
              })} 
          >
              <Modal.Body bsClass={s.logInModalBody}>
                  <div className={s.modalCustomHeader}>
                      <h3 className={cx({[titleClassName]: !!titleClassName})}>{headline}</h3>
                      <div>
                          <CloseIcon onClick={onClose} className={s.modalCloseIcon} />
                      </div>
                  </div>
                  <div className={cx(s.sectionSplitter, s.modalContentSplitter)} />
                  <div className={cx(s.modalContentWrapper, {
                      [modalContentWrapper]: !!modalContentWrapper
                  })}>
                      {children}
                  </div>
              </Modal.Body>
          </Modal>
        )
    }
}

export default withStyles(s)(CustomModal);