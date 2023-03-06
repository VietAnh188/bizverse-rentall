import React, { Component } from "react";

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { compose } from 'redux';

import s from './Help.css';
import cx from 'classnames';

import messages from '../../locale/messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import Collapsible from 'react-collapsible';

class HelpHost extends Component {
  render() {
    return (
      <div>
        <div className={s.helpContentHost}>
          <h1><FormattedMessage {...messages.helpPageHostTitle}/></h1>
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
                      {...messages.helpPageHostTopic1Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostHeaderTopic1} /></p>
                  <p><FormattedMessage {...messages.helpPageHostContent1Topic1} /></p>
                  <p><FormattedMessage {...messages.helpPageHostContent2Topic1} /></p>
                  <p><FormattedMessage {...messages.helpPageHostContent3Topic1} /></p>
                  <p><FormattedMessage {...messages.helpPageHostContent4Topic1} /></p>
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
                      {...messages.helpPageHostTopic2Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostHeaderTopic2} /></p>
                  <p><FormattedMessage {...messages.helpPageHostContent1Topic2} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageHostContent1Item1Topic2} /></p>
                    <p><FormattedMessage {...messages.helpPageHostContent1Item2Topic2} /></p>
                  </div>
                  <p><FormattedMessage {...messages.helpPageHostContent2Topic2} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageHostContent2Item1Topic2} /></p>
                    <p><FormattedMessage {...messages.helpPageHostContent2Item2Topic2} /></p>
                  </div>
                  <p><FormattedMessage {...messages.helpPageHostContent3Topic2} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageHostContent3Item1Topic2} /></p>
                    <p><FormattedMessage {...messages.helpPageHostContent3Item2Topic2} /></p>
                    <p><FormattedMessage {...messages.helpPageHostContent3Item3Topic2} /></p>
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
                      {...messages.helpPageHostTopic3Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostHeaderTopic3} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageHostContent1Topic3} /></p>
                    <p><FormattedMessage {...messages.helpPageHostContent2Topic3} /></p>
                    <p><FormattedMessage {...messages.helpPageHostContent3Topic3} /></p>
                    <p><FormattedMessage {...messages.helpPageHostContent4Topic3} /></p>
                    <div className={s.textJustify}>
                      <p><FormattedMessage {...messages.helpPageHostItem1Content4Topic3} /></p>
                      <p><FormattedMessage {...messages.helpPageHostItem2Content4Topic3} /></p>
                      <p><FormattedMessage {...messages.helpPageHostItem3Content4Topic3} /></p>
                      <p><FormattedMessage {...messages.helpPageHostItem4Content4Topic3} /></p>
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
                      {...messages.helpPageHostTopic4Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostContent1Topic4} /></p>
                  <p><FormattedMessage {...messages.helpPageHostContent2Topic4} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageHostItem1Content2Topic4} /></p>
                    <div className={s.textJustify}>
                      <p><FormattedMessage {...messages.helpPageHostItem1Child1Content2Topic4} /></p>
                      <p><FormattedMessage {...messages.helpPageHostItem1Child2Content2Topic4} /></p>
                      <p><FormattedMessage {...messages.helpPageHostItem1Child3Content2Topic4} /></p>
                      <p><FormattedMessage {...messages.helpPageHostItem1Child4Content2Topic4} /></p>
                    </div>
                    <p><FormattedMessage {...messages.helpPageHostContent3Topic4} /></p>
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
                      {...messages.helpPageHostTopic5Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostContent1Topic5} /></p>
                  <p><FormattedMessage {...messages.helpPageHostContent2Topic5} /></p>
                  <p><FormattedMessage {...messages.helpPageHostContent3Topic5} /></p>
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
                      {...messages.helpPageHostTopic6Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostContent1Topic6} /></p>
                  <p><FormattedMessage {...messages.helpPageHostContent2Topic6} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageHostItem1Content2Topic6} /></p>
                    <p><FormattedMessage {...messages.helpPageHostItem2Content2Topic6} /></p>
                    <p><FormattedMessage {...messages.helpPageHostItem3Content2Topic6} /></p>
                  </div>
                  <p><FormattedMessage {...messages.helpPageHostContent3Topic6} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageHostItem1Content3Topic6} /></p>
                    <p><FormattedMessage {...messages.helpPageHostItem2Content3Topic6} /></p>
                  </div>
                  <p><FormattedMessage {...messages.helpPageHostContent4Topic6} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageHostItem1Content4Topic6} /></p>
                    <p><FormattedMessage {...messages.helpPageHostItem2Content4Topic6} /></p>
                  </div>
                  <p><FormattedMessage {...messages.helpPageHostContent5Topic6} /></p>
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
                      {...messages.helpPageHostTopic7Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostContent1Topic7} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageHostItem1Content1Topic7} /></p>
                    <p><FormattedMessage {...messages.helpPageHostItem2Content1Topic7} /></p>
                    <p><FormattedMessage {...messages.helpPageHostItem3Content1Topic7} /></p>
                  </div>
                  <p><FormattedMessage {...messages.helpPageHostContent2Topic7} /></p>
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
                      {...messages.helpPageHostTopic8Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostContent1Topic8} /></p>
                  <p><FormattedMessage {...messages.helpPageHostContent2Topic8} /></p>
                  <div className={s.textJustify}>
                    <p><FormattedMessage {...messages.helpPageHostItem1Content2Topic8} /></p>
                    <p><FormattedMessage {...messages.helpPageHostItem2Content2Topic8} /></p>
                    <p><FormattedMessage {...messages.helpPageHostItem3Content2Topic8} /></p>
                    <p><FormattedMessage {...messages.helpPageHostItem4Content2Topic8} /></p>
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
                      {...messages.helpPageHostTopic9Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostContentTopic9} /></p>
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
                      {...messages.helpPageHostTopic10Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostContentTopic10} /></p>
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
                      {...messages.helpPageHostTopic11Title}
                    />
                  }
                >
                  <p><FormattedMessage {...messages.helpPageHostContentTopic11} /></p>
                </Collapsible>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default compose(injectIntl, withStyles(s))(HelpHost);
