import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingPhotos.css';
import {
  Button,
  Carousel,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import * as config from '../../../config'
import ImagePanorama from '../../ImagePanorama/ImagePanorama';

//Icon
import IconImgPanorama from '../../../../public/SiteIcons/iconPanorama.svg';
import IconPayLater from '../../../../public/SiteIcons/iconPaylater.svg';

class ListingPhotos extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    size: PropTypes.string,
  };

  static defaultProps = {
    listPhotos: [],
    coverPhoto: 0,
    size: 'x_medium_',
  };

  render() {
    const { id, listPhotos, coverPhoto, size, isPayLater } = this.props;

    return (
      <div className={cx(s.listPhotoContainer, 'carousel')}>
        {
          isPayLater && <img className={s.iconPayLater} src={IconPayLater} />
        }
        <Carousel
          nextIcon={<FontAwesome.FaAngleRight />}
          prevIcon={<FontAwesome.FaAngleLeft />}
          indicators={false}
          interval={0}
          wrap={false}
          // className={cx('row')}
        >
          {
            listPhotos != null && listPhotos.length && listPhotos.map((item, itemIndex) => {
              const imagepath = `${config.AWS_SERVICE_URL}images/upload/${item.isPanorama ? '' : size}`;

              return (
                <Carousel.Item key={itemIndex}>
                  <div className={cx('col-md-12 col-sm-12 col-xs-12', s.imagePaddingTop, s.imagePadding)}>
                    <a href={`/rooms/${id}`} target={'_blank'}>
                      <div className={s.parent}>
                        <div className={cx(s.children)}>
                          <div className={s.content}>
                            {item.isPanorama ? (
                              <>
                                <img className={s.iconPanorama} src={IconImgPanorama} />
                                <ImagePanorama 
                                    height="100%" 
                                    className={cx(s.imageContent, 'imgPanorama')} 
                                    width="100%"
                                    container={item.name.split(".")[0]}
                                    panoramaProps={{
                                        panorama: imagepath + item.name,
                                        navbar: false,
                                        defaultZoomLvl: 1,
                                    }}
                                    isRotateOnHover={true}
                                    zoom={1}
                                    rotateSpeed = '2rpm'
                                />
                                <div
                                  className={cx(s.imageContent, 'imgPanoramaResponsive')}
                                  style={{ backgroundImage: `url(${imagepath}${item.name})` }}
                                />
                              </>
                            ) : (
                              <div
                                className={cx(s.imageContent)}
                                style={{ backgroundImage: `url(${imagepath}${item.name})` }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </Carousel.Item>
              )})
          }
        </Carousel>
       
      </div>
    );
  }
}

export default withStyles(s)(ListingPhotos);
