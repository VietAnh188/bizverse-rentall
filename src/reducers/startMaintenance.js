import { MAINTENANCE_START, START_MAINTENANCE_ERROR, START_MAINTENANCE_SUCCESS } from "../constants";


const startMaintenance = (state = {}, action) => {
    switch (action.type) {
        case MAINTENANCE_START: {
            return {
                ...state,
            }
        }
        case START_MAINTENANCE_SUCCESS: {
            state.statusMaintenance = action.payload.statusMaintenance;
            return {
                ...state
            }
        }
        case START_MAINTENANCE_ERROR: {
            state.statusMaintenance = action.payload.statusMaintenance;
            return {
                ...state
            }
        }
        default:
            return state;
    }
}

export default startMaintenance;