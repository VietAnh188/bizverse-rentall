import { STOP_MAINTENANCE_ERROR, STOP_MAINTENANCE_START, STOP_MAINTENANCE_SUCCESS } from "../constants";

const stopMaintenance = (state = {}, action) => {
    switch (action.type) {
        case STOP_MAINTENANCE_START: {
            return {
                ...state,
            }
        }
        case STOP_MAINTENANCE_SUCCESS: {
            state.statusMaintenance = action.payload.statusMaintenance;
            return {
                ...state
            }
        }
        case STOP_MAINTENANCE_ERROR: {
            state.statusMaintenance = action.payload.statusMaintenance;
            return {
                ...state
            }
        }
        default:
            return state;
    }
}

export default stopMaintenance;