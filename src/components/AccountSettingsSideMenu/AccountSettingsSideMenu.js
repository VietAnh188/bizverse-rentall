import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AccountSettingsSideMenu.css';

// Component
import SubnavBar from '../SubnavBar/SubnavBar';

// Locale
import messages from '../../locale/messages';

class AccountSettingsSideMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const menuItems = [
            {
              paths: ['/user/payout', '/user/addpayout'],
              mainPath: '/user/payout',
              message: messages.payoutPreferences
            },
            {
              paths: ['/user/transaction'],
              mainPath: '/user/transaction',
              message: messages.transactionHistory
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
            </div>
        );
    }
}

export default withStyles(s)(AccountSettingsSideMenu);