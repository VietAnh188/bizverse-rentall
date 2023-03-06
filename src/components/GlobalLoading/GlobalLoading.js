import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Style
import s from './GlobalLoading.css';

// Components
import { Modal } from 'react-bootstrap';
import MDSpinner from 'react-md-spinner';

class GlobalLoading extends React.Component {

    render() {
        const { onClose, show } = this.props;

        return (
          <Modal 
              show={show} 
              animation={false} 
              onHide={onClose} 
              dialogClassName={cx(s.globalLoadingContainer, 'globalLoadingContainer')} 
              backdropClassName={s.backdropClassName}
          >
              <Modal.Body bsClass={s.globalLoadingContent}>
                <MDSpinner animation="border" variant="danger" size={50} />
              </Modal.Body>
          </Modal>
        )
    }
}

export default withStyles(s)(GlobalLoading);