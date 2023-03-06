import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { compose } from 'redux';

import ImageTopic1 from '../../../public/SiteImages/image-topic1.jpg';
import ImageTopic2 from '../../../public/SiteImages/image-topic2.gif';
import ImageTopic3 from '../../../public/SiteImages/image-topic3.jpg';
import IconClock from '../../../public/SiteIcons/icon-clock.svg';

import s from './Travel.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../locale/messages';

class Travel extends Component {
    render() {
        return (
            <div>
                <div className={s.content}>
                    <div className={s.title}>
                        <p><FormattedMessage {...messages.travelPageTitle1}/></p>
                    </div>
                    
                    <div className={s.imgContent}>
                        <img src={ImageTopic1}/>
                    </div>
                    <div className={s.timeline}>
                        <span className={s.iconTime}><img src={IconClock}/></span>
                        <span className={s.time}>26 August 2022</span>
                    </div>
                    <p className={s.description}><FormattedMessage {...messages.travelPageContentTitle1}/></p>
                    <Button className={s.buttonMore}><a target='_blank' href='https://www.breakingtravelnews.com/focus/article/vietnams-planned-hotel-openings/'><FormattedMessage {...messages.readMore}/></a></Button>
                </div>
                <div className={s.content}>
                    <div className={s.title}>
                        <p><FormattedMessage {...messages.travelPageTitle2}/></p>
                    </div>
                    
                    <div className={s.imgContent}>
                        <img src={ImageTopic2}/>
                    </div>
                    <div className={s.timeline}>
                        <span className={s.iconTime}><img src={IconClock}/></span>
                        <span className={s.time}>23 August 2022</span>
                    </div>
                    <p className={s.description}><FormattedMessage {...messages.travelPageContent1Title2}/><br/><br/>
                    <FormattedMessage {...messages.travelPageContent2Title2}/></p>
                    <Button className={s.buttonMore}><a target='_blank' href='https://www.breakingtravelnews.com/focus/article/how-soneva-jani-stays-at-the-top-of-travel-bucket-lists/'><FormattedMessage {...messages.readMore}/></a></Button>
                </div>
                <div className={s.content}>
                    <div className={s.title}>
                        <p><FormattedMessage {...messages.travelPageTitle3}/></p>
                    </div>
                    
                    <div className={s.imgContent}>
                        <img src={ImageTopic3}/>
                    </div>
                    <div className={s.timeline}>
                        <span className={s.iconTime}><img src={IconClock}/></span>
                        <span className={s.time}>18 August 2022</span>
                    </div>
                    <p className={s.description}><FormattedMessage {...messages.travelPageContentTitle3}/></p>
                    <Button className={s.buttonMore}><a target='_blank' href='https://www.breakingtravelnews.com/focus/article/four-seasons-private-jet-journeys-unveils-new-16-day-asia-adventure/'><FormattedMessage {...messages.readMore}/></a></Button>
                </div>
            </div>
        );
    }
}

export default compose(injectIntl, withStyles(s))(Travel);