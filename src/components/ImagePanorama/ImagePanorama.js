import React from 'react';
import { Viewer } from "photo-sphere-viewer";
import uuid from 'uuid';

class ImagePanorama extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            viewer: null,
            container: uuid()
        }
    }

    componentDidMount() {
        const { height, width = 400, panoramaProps } = this.props;
        const { container } = this.state;

        const viewer = new Viewer({
            loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
            touchmoveTwoFingers: true,
            mousewheelCtrlKey: true,
            size: {
                width,
                height
            },
            navbar: [
                'autorotate',
                'zoom',
                'fullscreen'
            ],
            container,
            autorotateSpeed: '1rpm',
            lang: {
                ctrlZoom: ''
            },
            ...panoramaProps
        });

        this.setState({ viewer })
    }

    componentWillUnmount() {
        const { viewer } = this.state;

        viewer.destroy();
    }

    handleRotateOnHover = () => {
        const { isRotateOnHover, zoom = 50, rotateLatitude = '0deg', rotateSpeed = '1rpm' } = this.props;
        const { viewer } = this.state;

        if (isRotateOnHover) {
            viewer.animate({
                longitude: Math.PI / 2,
                latitude: rotateLatitude,
                zoom,
                speed: rotateSpeed,
            })
        }
    }

    handleStopRotate = () => {
        const { zoom = 50} = this.props; 
        const { viewer } = this.state;

        viewer.animate({
            longitude: 0,
            latitude: 0,
            zoom,
            speed: '10rpm',
        })
    }

    handleOnMouseOut = () => {
        const { isRotateOnHover } = this.props;

        if (isRotateOnHover) {
            this.handleStopRotate();
        }
    }

    render() {
        const { container } = this.state;
        const { className } = this.props;

        return (
            <div 
                className={className} 
                onMouseOut={this.handleOnMouseOut} 
                onMouseEnter={this.handleRotateOnHover} 
                id={container}>
            </div>
        )
    }
}

export default ImagePanorama;