import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Assets
import mediumNoImage from '../../../public/SiteImages/medium_no_image.png';
import largeNoImage from '../../../public/SiteImages/large_no_image.jpeg';

// components
import LazyLoadImage from '../LazyLoadImage';
import ImagePanorama from '../ImagePanorama';

// config
import * as config from '../../config'

class ListCoverPhoto extends React.Component {
    static propTypes = {
        coverPhoto: PropTypes.number,
        listPhotos: PropTypes.array,
        className: PropTypes.string,
        bgImage: PropTypes.bool
    };

    static defaultProps = {
        bgImage: false,
        lazyLoad: false
    }

    constructor(props) {
        super(props);
        this.state = {
            photo: null
        };
    }

    componentWillMount() {
        const { coverPhoto, listPhotos } = this.props;
        let activePhoto;
        if (listPhotos != undefined && listPhotos.length > 0) {
            activePhoto = listPhotos[0].name;
            if (coverPhoto != undefined && coverPhoto != null) {
                listPhotos.map((item) => {
                    if (item.id === coverPhoto) {
                        activePhoto = item.name;
                    }
                })
            }
            this.setState({ photo: activePhoto });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { coverPhoto, listPhotos } = nextProps;
        let activePhoto;
        if (listPhotos != undefined && listPhotos.length > 0) {
            activePhoto = listPhotos[0].name;
            if (coverPhoto != undefined && coverPhoto != null) {
                listPhotos.map((item) => {
                    if (item.id === coverPhoto) {
                        activePhoto = item.name;
                    }
                })
            }
            this.setState({ photo: activePhoto });
        }
    }

    render() {
        const { className, photoType, listPhotos, bgImage, lazyLoad } = this.props;
        const { photo } = this.state;
        
        let path = '', source;
        if (photo != null) {
            source = photo;
            if (photoType != undefined) {
                path = config.AWS_SERVICE_URL + 'images/upload/' + photoType + '_';
            }
        } else {
            if (photoType != undefined) {
                if (photoType === "x_medium") {
                    source = largeNoImage;
                } else if (photoType === "x_small") {
                    source = mediumNoImage;
                }
            } else {
                source = mediumNoImage
            }
        }

        if (lazyLoad && bgImage) {
            if (listPhotos[0].isPanorama) {
                return (
                    <>
                        <ImagePanorama 
                            height="100%" 
                            className={cx(className, 'imgPanorama')} 
                            width="100%"
                            container={source.split(".")[0]}
                            panoramaProps={{
                                panorama: config.AWS_SERVICE_URL + 'images/upload/' + source,
                                navbar: false,
                                defaultZoomLvl: 1,
                            }}
                            isRotateOnHover={true}
                            zoom={1}
                            rotateSpeed = '2rpm'
                        />
                        <div className='imgPanoramaResponsive'>
                            <LazyLoadImage 
                                src={`${path}${source}`}
                                placeholderSrc={config.AWS_SERVICE_URL+ 'images/upload/placeholder_' + source}
                                className={className}
                            />
                        </div>
                    </>
                )
            }

            return (
                <LazyLoadImage 
                    src={`${path}${source}`}
                    placeholderSrc={config.AWS_SERVICE_URL+ 'images/upload/placeholder_' + source}
                    className={className}
                />
            );
        } else if (bgImage) {
            if (listPhotos[0].isPanorama) {
                return (
                    <>
                        <ImagePanorama 
                            height="100%" 
                            className={cx(className, 'imgPanorama')}  
                            width="100%"
                            container="listingCoverImage"
                            panoramaProps={{
                                panorama: config.AWS_SERVICE_URL + 'images/upload/' + source,
                                autorotateDelay: 0
                            }}
                        />
                        <div className={cx(className, 'imgPanoramaResponsive')} style={{ backgroundImage: `url(${path}${source})` }}>
                            {this.props.children}
                        </div>
                    </>
                )
            }

            return (

                <div className={className} style={{ backgroundImage: `url(${path}${source})` }}>
                    {this.props.children}
                </div>
            );
        } else {
            return (
                <div className={className} style={{ backgroundImage: `url(${path + source})` }} />
            );
        }
    }
}

export default ListCoverPhoto;