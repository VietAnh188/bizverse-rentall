import {
    SET_CURRENT_VIEW_LISTING
} from '../../constants';

export function setCurrentViewListing(data) {
    return dispatch => {
        dispatch({
            type: SET_CURRENT_VIEW_LISTING,
            payload: {
                data
            }
        });
    }
}