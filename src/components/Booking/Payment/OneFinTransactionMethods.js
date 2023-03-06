import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Panel,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';

// Components
import {
    Row,
    FormGroup,
    Col,
    FormControl,
    Radio
  } from 'react-bootstrap';

// Locale
import messages from '../../../locale/messages';

class OneFin extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Col className={cx(s.space4, s.spaceTop3)}>
                <FormGroup>
                    <Radio value={11} defaultChecked on name="oneFinTransactionMethod" className='oneFinTransactionMethod'>
                        <FormattedMessage {...messages.oneFinEWallet} />
                    </Radio>
                    <Radio value={10} name="oneFinTransactionMethod" className='oneFinTransactionMethod'>
                        <FormattedMessage {...messages.oneFinATMCard} />
                    </Radio>
                    <Radio value={5} name="oneFinTransactionMethod" className='oneFinTransactionMethod'>
                        <FormattedMessage {...messages.oneFinVisaMaster} />
                    </Radio>
                </FormGroup>
            </Col>
        )
    }
} 


export default withStyles(s)(OneFin);

