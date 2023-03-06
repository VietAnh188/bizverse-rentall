import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditProfileSideMenu.css';
import bt from '../../components/commonStyle.css';
import {
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Component
import SubnavBar from '../../components/SubnavBar/SubnavBar'
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';
class EditProfileSideMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userData } = this.props;
        let isVerified;
        if (userData) {
            isVerified = userData.profileId;
        }

        const menuItems = [
            {
              paths: ['/user/edit'],
              mainPath: '/user/edit',
              message: messages.editProfile
            },
            {
              paths: ['/user/photo'],
              mainPath: '/user/photo',
              message: messages.profilePhoto
            },
            {
                paths: ['/user/reviews'],
                mainPath: '/user/reviews',
                message: messages.reviews
            },
            {
              paths: ['/dashboard'],
              mainPath: '/dashboard',
              message: messages.dashboard
            }
        ]

        return (
            <div>
                <SubnavBar menuItems={menuItems} />

                <Col cols={12} className={cx(s.noPadding, s.space3, s.spaceTop2)}>
                    <Link to={"/users/show/" + isVerified} className={cx(bt.noTextDecration, bt.btnPrimary, bt.btnLarge, s.displayInlineBlock, s.btnViewProfile)}>
                        <FormattedMessage {...messages.viewProfile} />
                    </Link>
                </Col>
            </div>
        )
    }
}

const mapState = (state) => ({
    userData: state.account.data,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditProfileSideMenu)));