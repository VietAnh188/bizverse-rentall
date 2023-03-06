import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

//action
import { deleteWishListGroup } from '../../../actions/WishList/deleteWishListGroup';
import { closeWishListGroupModal } from '../../../actions/WishList/modalActions';

//local
import messages from '../../../locale/messages';

//css 
import s from './DeleteWishListGroupForm.css';
import cx from 'classnames';

class DeleteWishListGroupForm extends Component {
    render() {
        const { closeWishListGroupModal, initialValues, deleteWishListGroup } = this.props;
        return (
            <div>
                <div className={s.titleDelete}><FormattedMessage {...messages.areYouSureDeleteWishList}/></div>
                <div className={s.btnDeleteGroup}>
                    <button className={cx(s.buttonCancel, 'buttonCancelAR')} onClick={closeWishListGroupModal}>
                        <FormattedMessage {...messages.cancel} />
                    </button>
                    <button className={s.buttonConfirmDelete} onClick={() => {deleteWishListGroup(initialValues.id)}}>
                        <FormattedMessage {...messages.delete} />
                    </button>
                </div>
            </div>
        );
    }
}
const mapDispatch = {
    closeWishListGroupModal,
    deleteWishListGroup
}
export default withStyles(s)(connect(null, mapDispatch)(DeleteWishListGroupForm));