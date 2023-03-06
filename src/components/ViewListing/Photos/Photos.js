import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Photos.css';
import bt from '../../commonStyle.css';
import { Button } from 'react-bootstrap';
import cx from 'classnames';

// Component
import ListCoverPhoto from '../../ListCoverPhoto';
import ListGridCoverPhoto from '../../ListGridCoverPhoto';
import ImageSlider from '../ImageSlider';
import WishListIcon from '../../WishListIcon';
import BizverseWorld from './BizverseWorld';

// Redux Action
import { openImageLightBox, closeImageLightBox } from '../../../actions/ImageLightBox';
import { setStickyTop } from '../../../actions/Sticky/StrickyActions';
import { openSocialShareModal } from '../../../actions/modalActions';
import ListDefaultPhoto from '../../ListDefaultPhoto';
import SocialShareModal from '../SocialShareModal';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// config
import * as config from '../../../config'

// Icons
import iconPhotos from '../../../../public/SiteIcons/icon-photos.svg'

class Photos extends React.Component {
  static propTypes = {
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    openImageLightBox: PropTypes.any.isRequired,
    closeImageLightBox: PropTypes.any.isRequired,
    imageLightBox: PropTypes.bool.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    listPhotos: [],
    imageLightBox: false
  }

  constructor(props) {
    super(props);
    this.state = {
      sources: []
    }
  }

  componentDidMount() {
    const { data, setStickyTop } = this.props;
    //let listPhotos = data.listPhotos;
    let sources = [];
    let sourceObject = {};
    let coverPhoto;
    let sticky = document.querySelector('[data-sticky-top]'), stickyHeight = 412;

    //if (listPhotos != null && listPhotos.length > 0) {
    if (data.listPhotos != null && data.listPhotos.length > 0) {
      coverPhoto = data.listPhotos[0].name;

      if (data.coverPhoto != undefined && data.coverPhoto != null) {

        data.listPhotos.map((item, key) => {
          const isPanorama = item.isPanorama;

          if (item.id === data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = config.AWS_SERVICE_URL + `images/upload/${isPanorama ? '' : 'x_large_'}` + item.name;
            sourceObject['isPanorama'] = item.isPanorama;
            sources.push(sourceObject);
          }
        });

        data.listPhotos.map((item, key) => {
          const isPanorama = item.isPanorama;

          if (item.id != data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = config.AWS_SERVICE_URL + `images/upload/${isPanorama ? '' : 'x_large_'}` + item.name;
            sourceObject['isPanorama'] = item.isPanorama;
            sources.push(sourceObject);
          }
        });

      } else {
        data.listPhotos.map((item, key) => {
          const isPanorama = item.isPanorama;

          sourceObject = {};
          sourceObject['src'] = config.AWS_SERVICE_URL + `images/upload/${isPanorama ? '' : 'x_large_'}` + item.name;
          sourceObject['isPanorama'] = item.isPanorama;
          sources.push(sourceObject);
        });
      }
      // listPhotos.map((item, key) => {
      //   let sourceObject = {};
      //   sourceObject["src"] = config.AWS_SERVICE_URL + 'images/upload/x_large_' + item.name;
      //   //sourceObject["caption"] = 'Sydney, Australia - Photo by Jill Smith'
      //   sources.push(sourceObject);
      // });
      this.setState({ sources });
    }
    stickyHeight = (sticky.getBoundingClientRect().height + 10);
    setStickyTop(stickyHeight);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    //let listPhotos = data.listPhotos;
    let sources = [];
    let sourceObject = {};
    let coverPhoto;

    let sticky = document.querySelector('[data-sticky-top]'), stickyHeight = 412;

    // if (listPhotos != null && listPhotos.length > 0) {
    if (data.listPhotos != null && data.listPhotos.length > 0) {

      coverPhoto = data.listPhotos[0].name;

      if (data.coverPhoto != undefined && data.coverPhoto != null) {

        data.listPhotos.map((item, key) => {
          const isPanorama = item.isPanorama;

          if (item.id === data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = config.AWS_SERVICE_URL + `images/upload/${isPanorama ? '' : 'x_large_'}` + item.name;
            sourceObject['isPanorama'] = item.isPanorama;
            sources.push(sourceObject);
          }
        });

        data.listPhotos.map((item, key) => {
          const isPanorama = item.isPanorama;

          if (item.id != data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = config.AWS_SERVICE_URL + `images/upload/${isPanorama ? '' : 'x_large_'}` + item.name;
            sourceObject['isPanorama'] = item.isPanorama;
            sources.push(sourceObject);
          }
        });

      } else {
        data.listPhotos.map((item, key) => {
          const isPanorama = item.isPanorama;

          sourceObject = {};
          sourceObject['src'] = config.AWS_SERVICE_URL + `images/upload/${isPanorama ? '' : 'x_large_'}` + item.name;
          sourceObject['isPanorama'] = item.isPanorama;
          sources.push(sourceObject);
        });
      }
      // listPhotos.map((item, key) => {
      //   let sourceObject = {};
      //   sourceObject["src"] = config.AWS_SERVICE_URL + 'images/upload/x_large_' + item.name;
      //   //sourceObject["caption"] = 'Sydney, Australia - Photo by Jill Smith'
      //   sources.push(sourceObject);
      // });
      this.setState({ sources });
    }
    stickyHeight = (sticky.getBoundingClientRect().height + 10);
    setStickyTop(stickyHeight);
  }

  checkListPhotoPanorama(listPhotos) {
    const isPanorama = photo => photo.isPanorama;
    
    return listPhotos.some(isPanorama);
  }

  render() {
    const { sources } = this.state;
    const { data, openImageLightBox, closeImageLightBox, imageLightBox, openSocialShareModal, loading } = this.props;

    let coverPhoto = data.coverPhoto;
    let listPhotos = data.listPhotos;
    let wishListStatus = data.wishListStatus;
    let isListOwner = data.isListOwner;
    let havePanorama = this.checkListPhotoPanorama(listPhotos);
    return (
      <div className={s.bannerContainer} data-sticky-top>
        <SocialShareModal listId={data.id} title={data.title} city={data.city} state={data.state} country={data.country} />
        <ImageSlider
          imageLightBox={imageLightBox}
          closeImageLightBox={closeImageLightBox}
          sources={sources}
        />

        {
          listPhotos && listPhotos.length == 0 && <ListDefaultPhoto
            className={s.bannerImage}
            coverPhoto={coverPhoto}
            listPhotos={listPhotos}
            photoType={"xx_large"}
            bgImage
            openImageLightBox={openImageLightBox}
          >
          </ListDefaultPhoto>
        }

        {
          listPhotos && listPhotos.length > 0 && listPhotos.length < 4 && <ListCoverPhoto
            className={s.bannerImage}
            coverPhoto={coverPhoto}
            listPhotos={listPhotos}
            photoType={"xx_large"}
            bgImage
            openImageLightBox={openImageLightBox}
          >
          </ListCoverPhoto>
        }

        {
          sources && sources.length > 0 && sources.length > 3 &&
          <ListGridCoverPhoto
            className={s.bannerImage}
            coverPhoto={coverPhoto}
            listPhotos={sources}
            photoType={"xx_large"}
            bgImage
            openImageLightBox={openImageLightBox}
          >
          </ListGridCoverPhoto >
        }

        <div className={s.photosContainer}>
          <div className={cx(s.photosWrapper, {
            [s.overviewSpaceBottom]: listPhotos?.length < 4 && havePanorama,
            [s.justifyContentEnd]: listPhotos?.length === 1
          })}>
            <div>
              <BizverseWorld />
            </div>
            
            {
              sources && sources.length > 1 && 
              <div>
                <Button
                  className={cx(bt.btnPrimary, s.viewPhotosBtn, 'viewPhotosBtnRtl')}
                  onClick={openImageLightBox}
                >
                  <img className={s.iconPhotos} src={iconPhotos} alt="View Listing Photos" />
                  <FormattedMessage {...messages.viewPhotos} />
                </Button>
              </div>
            }
          </div>
        </div>


        <div className={cx(s.saveButtonPosition, 'saveButtonPositionRtl')}>
          {
            <div
              className={cx(s.buttonContainer, s.buttonShare)}
              onClick={openSocialShareModal}
            >
              <span className={(cx(s.vtrMiddle, s.shareIcon))}></span>
              <span className={cx(s.paddingleft10, s.vtrBottom)}><FormattedMessage {...messages.shareLabel} /></span>
            </div>
          }
          {

            !isListOwner && !loading && <div className={cx(s.displayInline, 'shareBtnRtl')}> <WishListIcon type="button" listId={data.id} key={data.id} isChecked={wishListStatus} />
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  imageLightBox: state.viewListing.imageLightBox
});

const mapDispatch = {
  openImageLightBox,
  closeImageLightBox,
  setStickyTop,
  openSocialShareModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(Photos));
