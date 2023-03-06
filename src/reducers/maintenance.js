import { GET_MAINTENANCE_STATUS_ERROR, GET_MAINTENANCE_STATUS_START, GET_MAINTENANCE_STATUS_SUCCESS, SET_MAINTENANCE } from "../constants";

const initialState = {
    maintenanceList: {}
}

const maintenance = (state = initialState, action) => {
    switch (action.type) {
        case GET_MAINTENANCE_STATUS_START: {
            return {
                ...state,
            }
        }
        case GET_MAINTENANCE_STATUS_SUCCESS: {
            state.maintenanceList = action.payload;
            return {
                ...state
            }
        }
        case GET_MAINTENANCE_STATUS_ERROR: {
            return {
                ...state
            }
        }
        case SET_MAINTENANCE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        default:
            return state;
    }
}

export default maintenance;