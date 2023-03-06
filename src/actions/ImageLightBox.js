import {
    IMAGE_LIGHTBOX_OPEN,
    IMAGE_LIGHTBOX_CLOSE,
} from '../constants';

export function openImageLightBox() {
    return async (dispatch) => {
        dispatch({
            type: IMAGE_LIGHTBOX_OPEN,
            imageLightBox: true
        });

        return true;
    };
}

export function closeImageLightBox() {
    return async (dispatch) => {
        dispatch({
            type: IMAGE_LIGHTBOX_CLOSE,
            imageLightBox: false
        });

        return true;
    };
}

export function openExactImageLightBox(currentIndex) {
    return async (dispatch) => {
        dispatch({
            type: IMAGE_LIGHTBOX_OPEN,
            imageLightBox: true,
            currentIndex: currentIndex
        });

        return true;
    };
}

