import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';

import messages from '../../locale/messages';

import cx from 'classnames';
import s from './Safety.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Collapsible from 'react-collapsible';

class Safety extends Component {
    state = {
        type: "title1",
    }
    changeType(threadType) {
        this.setState({type: threadType})
    }
    render() {
        const {type} = this.state;
        return (
            <div>
                 <ul className={s.tabs}>
                    <li className={cx(s.tab, {[s.bizverseTabActiveBorderContainer] : type==='title1'})}>
                        <a className={cx(s.bizverseTab,  {[s.bizverseTabActive]: type==='title1'})} onClick={() => this.changeType('title1') }>
                            <FormattedMessage {...messages.safetyPageShortTitle1}/>
                        </a>
                    </li>
                    <li className={cx(s.tab, {[s.bizverseTabActiveBorderContainer] : type==='title2'})}>
                        <a className={cx(s.bizverseTab,  {[s.bizverseTabActive]: type==='title2'})} onClick={() => this.changeType('title2') }>
                            <FormattedMessage {...messages.safetyPageShortTitle2}/>
                        </a>
                    </li>
                    <li className={cx(s.tab, {[s.bizverseTabActiveBorderContainer] : type==='title3'})}>
                        <a className={cx(s.bizverseTab,  {[s.bizverseTabActive]: type==='title3'})} onClick={() => this.changeType('title3') }>
                            <FormattedMessage {...messages.safetyPageTitle3}/>
                        </a>
                    </li>
                </ul>
                <div className={s.content}>
                    {
                        type === 'title1' && <div>
                            <h1><b><FormattedMessage {...messages.safetyPageTitle1} /></b></h1>
                            <p><FormattedMessage {...messages.safetyPageNote1} /></p>
                            <ul className={s.tabsContent}>
                                <li>
                                    <div className={s.circle}>
                                        <span>1</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent1TopicTitle1} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent1Title1}/>
                                    </div>
                                    
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>2</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent2TopicTitle1} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent2Title1}/>
                                    </div>
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>3</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent3TopicTitle1} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent3Title1}/>
                                    </div>
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>4</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent4TopicTitle1} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent4Title1} /><br/>
                                        <FormattedMessage {...messages.safetyPageContentIf1Title1} />
                                    </div>
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>5</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent5TopicTitle1} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent5Title1}/>
                                    </div>
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>6</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent6TopicTitle1} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent6Title1}/>
                                    </div>
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>7</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent7Title1} /></b>
                                        <p><FormattedMessage {...messages.safetyPageContentIf2Title1} /></p>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    }
                    {
                        type === 'title2' && <div>
                            <h1><b><FormattedMessage {...messages.safetyPageTitle2} /></b></h1>
                            <p><FormattedMessage {...messages.safetyPageNote2} /></p>
                            <ul className={s.tabsContent}>
                                <li>
                                    <div className={s.circle}>
                                        <span>1</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent1TopicTitle2} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent1Title2}/>
                                    </div>
                                    
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>2</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent2TopicTitle2} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent2Title2}/><br/>
                                        <FormattedMessage {...messages.safetyPageContentIfTitle2} />
                                    </div>
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>3</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent3TopicTitle2} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent3Title2}/>
                                    </div>
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>4</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent4TopicTitle2} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent4Title2} />
                                    </div>
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>5</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent5TopicTitle2} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent5Title2}/>
                                    </div>
                                </li>
                                <li>
                                    <div className={s.circle}>
                                        <span>6</span>
                                    </div>
                                    <div className={s.contentItem}>
                                        <b><FormattedMessage {...messages.safetyPageContent6TopicTitle2} /></b> <br/>
                                        <FormattedMessage {...messages.safetyPageContent6Title2}/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    }
                    {
                        type === 'title3' && <div>
                            <h1><b><FormattedMessage {...messages.safetyPageTitle3} /></b></h1>
                            <p><FormattedMessage {...messages.safetyPageNote3a} /></p>
                            <p><FormattedMessage {...messages.safetyPageNote3b} /></p>
                            <Collapsible transitionTime={200} triggerClassName={s.mainContent} triggerOpenedClassName={s.openMainContent} trigger={<FormattedMessage {...messages.safetyPageMainContent1Title3}/>}>
                                <p><FormattedMessage {...messages.safetyPageMainContent1NoteTitle3} /></p>
                                <ul className={s.tabsContent}>
                                    <li>
                                        <div className={s.circle}>
                                            <span>1</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent1TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent1Title3}/>
                                        </div>
                                        
                                    </li>
                                    <li>
                                        <div className={s.circle}>
                                            <span>2</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent2TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent2Title3}/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={s.circle}>
                                            <span>3</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent3TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent3Title3}/>
                                        </div>
                                    </li>
                                </ul>
                            </Collapsible>
                            <Collapsible transitionTime={200} triggerClassName={s.mainContent} triggerOpenedClassName={s.openMainContent} trigger={<FormattedMessage {...messages.safetyPageMainContent2Title3}/>}>
                                <p><FormattedMessage {...messages.safetyPageMainContent2NoteTitle3} /></p>
                                <ul className={s.tabsContent}>
                                    <li>
                                        <div className={s.circle}>
                                            <span>1</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent2Child1TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent2Child1Title3}/>
                                        </div>
                                        
                                    </li>
                                    <li>
                                        <div className={s.circle}>
                                            <span>2</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent2Child2TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent2Child2Title3}/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={s.circle}>
                                            <span>3</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent2Child3TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent2Child3Title3}/>
                                        </div>
                                    </li>
                                </ul>
                            </Collapsible>
                            <Collapsible transitionTime={200} triggerClassName={s.mainContent} triggerOpenedClassName={s.openMainContent} trigger={<FormattedMessage {...messages.safetyPageMainContent3Title3}/>}>
                                <p><FormattedMessage {...messages.safetyPageMainContent3NoteTitle3} /></p>
                                <ul className={s.tabsContent}>
                                    <li>
                                        <div className={s.circle}>
                                            <span>1</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent3Child1TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent3Child1Title3}/>
                                        </div>
                                        
                                    </li>
                                    <li>
                                        <div className={s.circle}>
                                            <span>2</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent3Child2TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent3Child2Title3}/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={s.circle}>
                                            <span>3</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent3Child3TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent3Child3Title3}/>
                                        </div>
                                    </li>
                                </ul>
                            </Collapsible>
                            <Collapsible transitionTime={200} triggerClassName={s.mainContent} triggerOpenedClassName={s.openMainContent} trigger={<FormattedMessage {...messages.safetyPageMainContent4Title3}/>}>
                                <p><FormattedMessage {...messages.safetyPageMainContent4NoteTitle3} /></p>
                                <ul className={s.tabsContent}>
                                    <li>
                                        <div className={s.circle}>
                                            <span>1</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent4Child1TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent4Child1Title3}/>
                                        </div>
                                        
                                    </li>
                                    <li>
                                        <div className={s.circle}>
                                            <span>2</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent4Child2TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent4Child2Title3}/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={s.circle}>
                                            <span>3</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent4Child3TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent4Child3Title3}/>
                                        </div>
                                    </li>
                                </ul>
                            </Collapsible>
                            <Collapsible transitionTime={200} triggerClassName={s.mainContent} triggerOpenedClassName={s.openMainContent} trigger={<FormattedMessage {...messages.safetyPageMainContent5Title3}/>}>
                                <p><FormattedMessage {...messages.safetyPageMainContent5NoteTitle3} /></p>
                                <ul className={s.tabsContent}>
                                    <li>
                                        <div className={s.circle}>
                                            <span>1</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent5Child1TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent5Child1Title3}/>
                                        </div>
                                        
                                    </li>
                                    <li>
                                        <div className={s.circle}>
                                            <span>2</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent5Child2TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent5Child2Title3}/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={s.circle}>
                                            <span>3</span>
                                        </div>
                                        <div className={s.contentItem}>
                                            <b><FormattedMessage {...messages.safetyPageContent5Child3TopicTitle3} /></b> <br/>
                                            <FormattedMessage {...messages.safetyPageContent5Child3Title3}/>
                                        </div>
                                    </li>
                                </ul>
                            </Collapsible>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default compose(injectIntl, withStyles(s))(Safety);