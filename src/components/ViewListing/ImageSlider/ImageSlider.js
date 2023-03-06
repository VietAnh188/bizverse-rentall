import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { isRTL } from '../../../helpers/formatLocale';
import { openExactImageLightBox} from '../../../actions/ImageLightBox';
import Lightbox from '../../Lightbox'

class ImageSlider extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      sources: []
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { imageLightBox, sources, currentIndex } = nextProps;
    if (imageLightBox != undefined) {
      this.setState({ lightboxIsOpen: imageLightBox });
    }
    if(currentIndex >= 0){
      this.setState({
        currentImage: currentIndex,
      });
    }
    if (sources != undefined) {
      this.setState({ sources });
    }

  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    const { closeImageLightBox, openExactImageLightBox } = this.props;
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
    openExactImageLightBox(0);
    closeImageLightBox();
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  }
  render() {
    const { lightboxIsOpen, currentImage, sources } = this.state;
    const { locale } = this.props.intl;
    return (
      <div>
        <Lightbox
          images={sources}
          isOpen={lightboxIsOpen}
          currentImage={currentImage}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          onClickThumbnail={this.gotoImage}
          // showThumbnails={true}
          // showImageCount={true}
          // showCloseButton={true}
          // enableKeyboardInput={true}
          // showImageCount={!isRTL(locale)}
        />
      </div>
    );
  }

}

const mapState = (state) => ({
  currentIndex: state.viewListing.currentIndex
});

const mapDispatch = {
  openExactImageLightBox
};


export default injectIntl(connect(mapState, mapDispatch)(ImageSlider));
