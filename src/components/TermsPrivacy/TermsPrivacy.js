import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from '../../locale/messages';

import s from './TermsPrivacy.css';
import cx from 'classnames'
class TermsPrivacy extends Component {
    render() {
        return (
            <div>
                <p className={s.textOpen}><FormattedMessage {...messages.termsPrivacyHeaderContent}/></p>
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
                      {...messages.termsPrivacyTitle1}
                    />
                  }
                >
                    <div className={s.contentItem}>
                        <p>1. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem1Title1} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentHeaderItem1Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent1Item1Title1} /></b><FormattedMessage {...messages.termsPrivacyContent1ChildItem1Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent2Item1Title1} /></b><FormattedMessage {...messages.termsPrivacyContent2ChildItem1Title1} /></p>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>2. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem3Title1} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentHeaderItem2Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent1Item2Title1} /></b><FormattedMessage {...messages.termsPrivacyContent1ChildItem2Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent2Item2Title1} /></b><FormattedMessage {...messages.termsPrivacyContent2ChildItem2Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent3Item2Title1} /></b><FormattedMessage {...messages.termsPrivacyContent3ChildItem2Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent4Item2Title1} /></b><FormattedMessage {...messages.termsPrivacyContent4ChildItem2Title1} /></p>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>3. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem3Title1} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentHeaderItem3Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent1Item3Title1} /></b><FormattedMessage {...messages.termsPrivacyContent1ChildItem3Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent2Item3Title1} /></b><FormattedMessage {...messages.termsPrivacyContent2ChildItem3Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent3Item3Title1} /></b><FormattedMessage {...messages.termsPrivacyContent3ChildItem3Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent4Item3Title1} /></b><FormattedMessage {...messages.termsPrivacyContent4ChildItem3Title1} /></p>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>4. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem4Title1} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentHeaderItem4Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent1Item4Title1} /></b><FormattedMessage {...messages.termsPrivacyContent1ChildItem4Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent2Item4Title1} /></b><FormattedMessage {...messages.termsPrivacyContent2ChildItem4Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent3Item4Title1} /></b><FormattedMessage {...messages.termsPrivacyContent3ChildItem4Title1} /></p>
                            <p className={s.topicContent}><b><FormattedMessage {...messages.termsPrivacyContent4Item4Title1} /></b><FormattedMessage {...messages.termsPrivacyContent4ChildItem4Title1} /></p>
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
                      {...messages.termsPrivacyTitle2}
                    />
                  }
                >
                    <div className={s.contentItem}>
                        <p>1. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem1Title2} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentOpenItem1Title2} /></p>
                            <div className={s.textJustify}>
                              <p><FormattedMessage {...messages.termsPrivacyContent1Item1Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent2Item1Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent3Item1Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent4Item1Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent5Item1Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent6Item1Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent7Item1Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent8Item1Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent9Item1Title2} /></p>
                            </div>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>2. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem2Title2} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentOpenItem2Title2} /></p>
                            <div className={s.textJustify}>
                              <p><FormattedMessage {...messages.termsPrivacyContent1Item2Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent2Item2Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent3Item2Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent4Item2Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent5Item2Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent6Item2Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent7Item2Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent8Item2Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent9Item2Title2} /></p>
                            </div>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>3. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem3Title2} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentOpenItem3Title2} /></p>
                            <div className={s.textJustify}>
                              <p><FormattedMessage {...messages.termsPrivacyContent1Item3Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent2Item3Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent3Item3Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent4Item3Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent5Item3Title2} /></p>
                            </div>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>4. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem4Title2} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentOpenItem4Title2} /></p>
                            <div className={s.textJustify}>
                              <p><FormattedMessage {...messages.termsPrivacyContent1Item4Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent2Item4Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent3Item4Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent4Item4Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent5Item4Title2} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent6Item4Title2} /></p>
                            </div>
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
                      {...messages.termsPrivacyTitle3}
                    />
                  }
                >
                    <div className={s.contentItem}>
                        <p>1. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem1Title3} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContent1Item1Title3} /></p>
                            <p><FormattedMessage {...messages.termsPrivacyContent2Item1Title3} /></p>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>2. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem2Title3} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentOpenItem2Title3} /></p>
                            <div className={s.textJustify}>
                              <p><FormattedMessage {...messages.termsPrivacyContent1Item2Title3} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent2Item2Title3} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent3Item2Title3} /></p>
                            </div>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>3. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem3Title3} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentOpenItem3Title3} /></p>
                            <div className={s.textJustify}>
                              <p><FormattedMessage {...messages.termsPrivacyContent1Item3Title3} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent2Item3Title3} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent3Item3Title3} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent4Item3Title3} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContentFooter1Item3Title3} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContentFooter2Item3Title3} /></p>
                            </div>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>4. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem4Title3} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentItem4Title3} /></p>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>5. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem5Title3} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContent1Item5Title3} /></p>
                            <p><FormattedMessage {...messages.termsPrivacyContent2Item5Title3} /></p>
                            <p><FormattedMessage {...messages.termsPrivacyContent3Item5Title3} /></p>
                            <p><FormattedMessage {...messages.termsPrivacyContent4Item5Title3} /></p>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>6. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem6Title3} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentItem6Title3} /></p>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>7. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem7Title3} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentItem7Title3} /></p>
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
                      {...messages.termsPrivacyTitle4}
                    />
                  }
                >
                    <div className={s.contentItem}>
                        <p>1. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem1Title4} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentItem1Title4} /></p>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>2. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem2Title4} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentOpenItem2Title4} /></p>
                            <div className={s.textJustify}>
                              <p><FormattedMessage {...messages.termsPrivacyContent1Item2Title4} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent2Item2Title4} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent3Item2Title4} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent4Item2Title4} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent5Item2Title4} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent6Item2Title4} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent7Item2Title4} /></p>
                            </div>
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
                      {...messages.termsPrivacyTitle5}
                    />
                  }
                >
                    <p><FormattedMessage {...messages.termsPrivacyHeaderTitle5} /></p>
                    <div className={s.contentItem}>
                        <p>1. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem1Title5} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentItem1Title5} /></p>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>2. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem2Title5} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentItem2Title5} /></p>
                        </div>
                    </div>
                    <div className={s.contentItem}>
                        <p>3. <b className={s.topicContent}><FormattedMessage {...messages.termsPrivacyItem3Title5} /></b></p>
                        <div className={s.textJustify}>
                            <p><FormattedMessage {...messages.termsPrivacyContentOpenItem3Title5} /></p>
                            <div className={s.textJustify}>
                              <p><FormattedMessage {...messages.termsPrivacyContent1Item3Title5} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent2Item3Title5} /></p>
                              <p><FormattedMessage {...messages.termsPrivacyContent3Item3Title5} /></p>
                            </div>
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
                      {...messages.termsPrivacyTitle6}
                    />
                  }
                >
                    <p><FormattedMessage {...messages.termsPrivacyContentTitle6} /></p>
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
                      {...messages.termsPrivacyTitle7}
                    />
                  }
                >
                    <p><FormattedMessage {...messages.termsPrivacyContentTitle7} /></p>
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
                      {...messages.termsPrivacyTitle8}
                    />
                  }
                >
                    <p><FormattedMessage {...messages.termsPrivacyContentTitle8} /></p>
                </Collapsible>
              </div>
            </li>
          </ul>
            </div>
        );
    }
}

export default compose(injectIntl, withStyles(s))(TermsPrivacy);