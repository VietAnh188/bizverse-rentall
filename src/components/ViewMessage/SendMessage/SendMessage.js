import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Field, reduxForm } from 'redux-form';

import {
  Button,
  FormControl,
  Panel,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import bt from '../../../components/commonStyle.css';

// Helpers
import submit from './submit';
import validate from './validate';

// Component
import Avatar from '../../Avatar';

//Locale
import messages from '../../../locale/messages';

//icon
import IconBtnSend from "../../../../public/SiteIcons/iconBtnSend.png"

class SendMessage extends Component {
  static propTypes = {
    threadId: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  submitOnEnter(e) {
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault();
      document.getElementById('submitText').click()
    }
  }
  
  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={placeholder}
          onKeyDown={(e)=>{this.submitOnEnter(e)}}
        >
          {children}
        </FormControl>
        {/* {touched && error && <span className={cx(s.errorMessage, 'errorMessageFieldRTL')}>{formatMessage(error)}</span>} */}
      </div>
    );
  }

  render() {
    const { profileId, picture, displayName } = this.props;
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div >
        <div className={cx(s.areaSend)}>
          <div className={s.displayTable}>
            <div className={s.displayTableRow}>
              <div className={cx(s.displayTableCell, s.displayTableWidth)}>
                <Panel className={cx(s.panelBubble, s.bgAreaChat, "messageTextArea")}>
                  <form onSubmit={handleSubmit(submit)}>
                    <div className={s.textBody}>
                      <Field
                        name="content"
                        className={s.textBox}
                        component={this.renderFormControlTextArea}
                        placeholder={formatMessage(messages.writeMessage)}
                      />
                      <button id="submitText" className={s.btnSend} color="primary" type="submit" disabled={submitting || error} >
                        <img src={IconBtnSend} />
                      </button>
                    </div>
                  </form>
                </Panel>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

SendMessage = reduxForm({
  form: 'SendMessage', // a unique name for this form
  validate
})(SendMessage);

export default injectIntl(withStyles(s, bt)(SendMessage));