import React, { Component } from "react";

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { compose } from 'redux';

import s from './Help.css';
import cx from 'classnames';

import messages from '../../locale/messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import Collapsible from 'react-collapsible';

class HelpGuest extends Component {
  render() {
    return (
      <div>
        <div className={s.helpContent1}>
          <h1><FormattedMessage {...messages.helpPageGuestTitle1}/></h1>
          <ul className={s.tabsContent}>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic1Title1}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestContent1Topic1Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Topic1Title1} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageGuestContent2Topic1Child1Title1} /></p>
                    <p><FormattedMessage {...messages.helpPageGuestContent2Topic1Child2Title1} /></p>
                    <p><FormattedMessage {...messages.helpPageGuestContent2Topic1Child3Title1} /></p>
                  </div>
                  <p><FormattedMessage {...messages.helpPageGuestContent3Topic1Title1} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic2Title1}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestContent1Topic2Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Topic2Title1} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic3Title1}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestContent1Topic3Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Topic3Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent3Topic3Title1} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic4Title1}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestContent1Topic4Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Topic4Title1} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic5Title1}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestHeaderTopic5Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent1Topic5Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Topic5Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent3Topic5Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent4Topic5Title1} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageGuestContent4Item1Topic5Title1} /></p>
                    <p><FormattedMessage {...messages.helpPageGuestContent4Item2Topic5Title1} /></p>
                    <p><FormattedMessage {...messages.helpPageGuestContent4Item3Topic5Title1} /></p>
                    <p><FormattedMessage {...messages.helpPageGuestContent4Item4Topic5Title1} /></p>
                    <p><FormattedMessage {...messages.helpPageGuestContent4Item5Topic5Title1} /></p>
                    <p><FormattedMessage {...messages.helpPageGuestContent4Item6Topic5Title1} /></p>
                  </div>
                  <p><FormattedMessage {...messages.helpPageGuestContent5Topic5Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent6Topic5Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent7Topic5Title1} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent8Topic5Title1} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic6Title1}
                    />
                  }
                >
                 <p><FormattedMessage {...messages.helpPageGuestContentTopic6Title1} /></p>
                </Collapsible>
              </div>
            </li>
          </ul>
        </div>
        <div className={s.helpContent2}>
          <h1><FormattedMessage {...messages.helpPageGuestTitle2} /></h1>
          <ul className={s.tabsContent}>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic1Title2}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestHeader1Topic1Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestHeader2Topic1Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContentTopic1Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestHeader3Topic1Title2} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic2Title2}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestContent1Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent1Item1Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent1Item2Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Item1Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Item2Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent3Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent3Item1Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent3Item2Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent3Item3Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent3Item4Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent4Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent4Item1Topic2Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent4Item2Topic2Title2} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic3Title2}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestContentIf1Topic3Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContentIf2Topic3Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContentTopic3Title2} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic4Title2}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestContentHeaderTopic4Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContentTopic4Title2} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic5Title2}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestHeaderTopic5Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent1Topic5Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Topic5Title2} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic6Title2}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestHeaderTopic6Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent1Topic6Title2} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageGuestContent1Item1Topic6Title2} /></p>
                    <p><FormattedMessage {...messages.helpPageGuestContent1Item2Topic6Title2} /></p>
                    <div className={s.textJustify}>
                      <p><FormattedMessage {...messages.helpPageGuestContent1Item2Child1Topic6Title2} /></p>
                      <p><FormattedMessage {...messages.helpPageGuestContent1Item2Child2Topic6Title2} /></p>
                      <p><FormattedMessage {...messages.helpPageGuestContent1Item2Child3Topic6Title2} /></p>
                      <p><FormattedMessage {...messages.helpPageGuestContent1Item2Child4Topic6Title2} /></p>
                      <p><FormattedMessage {...messages.helpPageGuestContent1Item2Child5Topic6Title2} /></p>
                    </div>
                  </div>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Topic6Title2} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageGuestContent2Item1Topic6Title2} /></p>
                    <p><FormattedMessage {...messages.helpPageGuestContent2Item2Topic6Title2} /></p>
                    <div className={s.textJustify}>
                      <p><FormattedMessage {...messages.helpPageGuestContent2Item2Child1Topic6Title2} /></p>
                      <p><FormattedMessage {...messages.helpPageGuestContent2Item2Child2Topic6Title2} /></p>
                      <p><FormattedMessage {...messages.helpPageGuestContent2Item2Child3Topic6Title2} /></p>
                      <p><FormattedMessage {...messages.helpPageGuestContent2Item2Child4Topic6Title2} /></p>
                    </div>
                  </div>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic7Title2}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestHeaderTopic7Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent1Topic7Title2} /></p>
                  <p><FormattedMessage {...messages.helpPageGuestContent2Topic7Title2} /></p>
                </Collapsible>
              </div>
            </li>
            <li>
              <div className={s.circle}>
                <span>?</span>
              </div>
              <div className={cx('help-collap', s.contentItem)}>
                <Collapsible
                  transitionTime={200}
                  triggerClassName={s.mainContent}
                  triggerOpenedClassName={s.openMainContent}
                  trigger={
                    <FormattedMessage
                      {...messages.helpPageGuestTopic8Title2}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageGuestContentTopic8Title2} /></p>
                </Collapsible>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default compose(injectIntl, withStyles(s))(HelpGuest);
