import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import { analytics } from '../config';
import { isRTL } from '../helpers/formatLocale';

// config 
import * as config from "../config"
class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    styles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    state: PropTypes.object,
    lang: PropTypes.string,
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
    state: null,
    lang: 'en',
  };

  render() {
    const { title, description, styles, scripts, state, lang, children, image } = this.props;   
    let bodyClassName = isRTL(lang) ? 'rtl' : '';

    return (
      <html className="no-js" lang={lang}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta httpEquiv="Cache-control" content="no-cache"/>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="photo" />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          {/* <link href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" rel="stylesheet" /> */}
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/photo-sphere-viewer@4/dist/photo-sphere-viewer.min.css"/>
          <link rel="apple-touch-icon" href={config.AWS_SERVICE_URL+"images/favicon/apple-touch-icon.png"} />
          <link rel="apple-touch-icon" sizes="57x57" href={config.AWS_SERVICE_URL+"images/favicon/apple-icon-57x57.png"} />
          <link rel="apple-touch-icon" sizes="60x60" href={config.AWS_SERVICE_URL+"images/favicon/apple-icon-60x60.png"} />
          <link rel="apple-touch-icon" sizes="72x72" href={config.AWS_SERVICE_URL+"images/favicon/apple-icon-72x72.png"} />
          <link rel="apple-touch-icon" sizes="76x76" href={config.AWS_SERVICE_URL+"images/favicon/apple-icon-76x76.png"} />
          <link rel="apple-touch-icon" sizes="114x114" href={config.AWS_SERVICE_URL+"images/favicon/apple-icon-114x114.png"} />
          <link rel="apple-touch-icon" sizes="120x120" href={config.AWS_SERVICE_URL+"images/favicon/apple-icon-120x120.png"} />
          <link rel="apple-touch-icon" sizes="144x144" href={config.AWS_SERVICE_URL+"images/favicon/apple-icon-144x144.png"} />
          <link rel="apple-touch-icon" sizes="152x152" href={config.AWS_SERVICE_URL+"images/favicon/apple-icon-152x152.png"} />
          <link rel="apple-touch-icon" sizes="180x180" href={config.AWS_SERVICE_URL+"images/favicon/apple-icon-180x180.png"} />
          <link rel="icon" type="image/png" sizes="192x192"  href={config.AWS_SERVICE_URL+"images/favicon/android-icon-192x192.png"} />
          <link rel="icon" type="image/png" sizes="32x32" href={config.AWS_SERVICE_URL+"images/favicon/favicon-32x32.png" }/>
          <link rel="icon" type="image/png" sizes="96x96" href={config.AWS_SERVICE_URL+"images/favicon/favicon-96x96.png" }/>
          <link rel="icon" type="image/png" sizes="16x16" href={config.AWS_SERVICE_URL+"images/favicon/favicon-16x16.png" }/>
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content={config.AWS_SERVICE_URL+"images/favicon/ms-icon-144x144.png"} />
          <meta name="theme-color" content="#ffffff"></meta>
	        <link rel="stylesheet" href="/css/bootstrap.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/react-slick/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/react-slick/slick-theme.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/react-swiper/swiper.css" />
          <link rel="stylesheet" type="text/css" href="/css/react-swiper/swiper.min.css" />
          <link rel="stylesheet" href="/css/app-common.css" />
          <link rel="stylesheet" href="/css/app-custom.css" />
          <link rel="stylesheet" href="/css/min/dropzone.min.css" />
          <link rel="stylesheet" media="print" href="/css/print.css" />
          <link rel="stylesheet" type="text/css" href="/css/quill-snow.css" />
          <link rel="stylesheet" href="/css/rtl.css" />
          {
            isRTL(lang) && <link rel="stylesheet" id="rtl-style" href={'/css/app-rtl.min.css'} />
          }
          {styles.map(style =>
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />,
          )}
         
         
        </head>
        <body className={bodyClassName}>
          <div
            id="app"
            dangerouslySetInnerHTML={{ __html: children }}
          />
          {state && (
            <script
              dangerouslySetInnerHTML={{ __html:
              `window.APP_STATE=${serialize(state, { isJSON: true })}` }}
              async defer
            />
          )}
          {scripts.map(script => <script key={script} src={script} async defer />)}
          {analytics.google.trackingId &&
            <script
              dangerouslySetInnerHTML={{ __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
              async defer
            />
          }
          {analytics.google.trackingId &&
            <script src="https://www.google-analytics.com/analytics.js" async defer />
          }
          <script id="stripe-js" src="https://js.stripe.com/v3/" async defer></script>
          {/* <script src="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js"></script> */}
        </body>
      </html>
    );
  }
}

export default Html;
