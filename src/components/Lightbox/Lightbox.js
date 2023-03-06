import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Lightbox.css';
import Close from 'react-icons/lib/io/close'
import * as FontAwesome from 'react-icons/lib/fa';
import ImagePanorama from '../ImagePanorama/ImagePanorama';

class LightBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  componentDidMount() {
    const { isOpen = true } = this.props;
    const body = document.querySelector("body")

    if (isOpen) {
      if (!body.classList.contains("modal-open")) {
        body.classList.add("modal-open")
      }
    } else {
      body.classList.remove("modal-open")
    }
  }

  componentDidUpdate() {
    const { isOpen = true } = this.props;
    const body = document.querySelector("body")

    if (isOpen) {
      if (!body.classList.contains("modal-open")) {
        body.classList.add("modal-open")
      }
    } else {
      body.classList.remove("modal-open")
    }
  }
  
  render() {
    const { 
      images = [], 
      isOpen, 
      currentImage = 0, 
      onClickPrev, 
      onClickNext, 
      onClose, 
      onClickThumbnail = () => {}
    } = this.props;
    const { location } = this.state;
    const targetImage = images[currentImage];

    if (!isOpen || !targetImage) {
      return null;
    }

    console.log("targetImage.src", targetImage.src)

    return (
      <div className={s.lightbox}>
          <div className={s.lightboxBackdrop}></div>

          <div className={s.lightboxContent}>
            <button onClick={onClose} className={s.lightboxClose}>
              <Close />
            </button>
            {targetImage.isPanorama ? (
              <div className={s.panoramaWrapper}>
                <ImagePanorama 
                  key={targetImage.src}
                  height="100%" 
                  className={cx(s.lightboxImageWrapper)} 
                  width="100%"
                  container="listingCoverImage2"
                  panoramaProps={{
                    panorama: targetImage.src,
                    autorotateDelay: 0
                  }}
                />
              </div>
            ) : (
              <div className={s.lightboxImageWrapper}>
                <img className={s.lightboxImage} src={targetImage.src} />
              </div>
            )}
          </div>

          <div className={s.lightboxImagesList}>
            {images.map((item, index) => (
              <div 
                key={index} 
                className={cx(s.lightboxItemImageWrapper, { [s.lightboxItemActive]: currentImage === index})}
                onClick={() => onClickThumbnail(index)}
              >
                <img className={s.lightboxItemImage} src={item.src} />
              </div>
            ))}
          </div>

          {currentImage >= 1 && <button onClick={onClickPrev} className={cx(s.lightboxAction, s.lightboxActionBack)}>
              <FontAwesome.FaAngleLeft />
          </button>}
          {currentImage <= images.length - 2 && <button onClick={onClickNext} className={cx(s.lightboxAction, s.lightboxActionNext)}>
              <FontAwesome.FaAngleRight />
          </button>}
      </div>
    )
  }
}


export default withStyles(s)(LightBox);
