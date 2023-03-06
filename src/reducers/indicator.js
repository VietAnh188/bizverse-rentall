import { 
    SHOW_GLOBAL_INDICATOR,
    HIDE_GLOBAL_INDICATOR
} from "../constants";

// Initial state
const INITIAL_STATE = {
  showGlobalIndicator: false
};

const indicator = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_GLOBAL_INDICATOR: {
            return { 
                ...state,
                showGlobalIndicator: true
            };
        }

        case HIDE_GLOBAL_INDICATOR: {
            return { 
                ...state,
                showGlobalIndicator: false
            };
        }

        default:
          return state;
    }
}

export default indicator;