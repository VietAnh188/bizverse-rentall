import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LocationMap.css';
import {
  Row,
} from 'react-bootstrap';
import cx from 'classnames';
// Redux
import { connect } from 'react-redux';

import ReactGoogleMapLoader from "react-google-maps-loader";
import {
  withGoogleMap,
  GoogleMap,
  Circle
} from "react-google-maps";

// Constants
import { googleMapAPI } from '../../../config';

// Locale
import messages from '../../../locale/messages';

const GoogleMapPlace =
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      center={props.center}
      defaultOptions={{
        backgroundColor: '',
        scrollwheel: false,
        maxZoom: 16,
        minZoom: 11,
        streetViewControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        mapTypeControl: false,
      }}
    >
      <Circle
        center={props.center}
        radius={800}
        options={{
          fillColor: 'rgba(168, 38, 138, 0.4)',
          strokeColor: '#A8268A',
        }}
      />
      {/* <Marker
      position={props.markers.position}
      draggable={false}
      icon={{
        url: mapPinIcon
      }}
    /> */}
    </GoogleMap>
  ));


class LocationMap extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: {},
      markers: null,
    }
  }

  componentWillMount() {
    const { data } = this.props;
    let lat = data.lat;
    let lng = data.lng;
    this.setState({
      center: {
        lat: Number(lat),
        lng: Number(lng),
      },
      smallDevice: false
    });
    // this.handleResize = this.handleResize.bind(this);

  }

  render() {
    const { center } = this.state;
    const { data } = this.props;
    let displayName = data.user.profile.displayName;
    let city = data.city;
    let country = data.country;

    return (
      <Row className={cx(s.pageContent)} >
        <div className={cx(s.space2, s.horizontalLineThrough)}>
          <h1 className={cx(s.sectionTitleText, s.space2)}><FormattedMessage {...messages.neighborhood} /></h1>
        </div>
        <div className={cx(s.space2)}>
          <p><span className={cx(s.text)}>{displayName}{' '}<FormattedMessage {...messages.propertyLocated} />{' '}{city}, {country}</span></p>
          <div style={{ height: 350 }}>
            <ReactGoogleMapLoader
              params={{
                key: googleMapAPI, // Define your api key here
                libraries: "places,geometry"// To request multiple libraries, separate them with a comma
              }}
              render={googleMaps =>
                googleMaps && (
                  <GoogleMapPlace
                    containerElement={
                      <div style={{ width: '100%', height: `100%` }} />
                    }
                    mapElement={
                      <div style={{ width: '100%', height: `100%` }} />
                    }
                    center={center}
                    markers={{
                      position: new google.maps.LatLng(center.lat, center.lng)
                    }}
                  />
                )}
            />
          </div>
          <p className={s.spaceTop1}>
            <span className={cx(s.text)}><FormattedMessage {...messages.neighborhoodInfo} /></span>
          </p>
        </div>
      </Row>
    );
  }
}

//export default withStyles(s)(LocationMap);

const mapState = (state) => ({

});

const mapDispatch = {
  // setStickyBottom
};

// export default GoogleMapLoader(withStyles(s)(connect(mapState, mapDispatch)(LocationMap)), {
//   libraries: ["places", "geometry"],
//   region: "US",
//   language: "en",
//   key: googleMapAPI,
// });

export default withStyles(s)(connect(mapState, mapDispatch)(LocationMap));
