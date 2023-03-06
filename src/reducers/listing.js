import { 
    GET_LISTINGS_START,
    GET_LISTINGS_SUCCESS,
    GET_LISTINGS_ERROR
} from "../constants";
import { getOrderAndById } from '../helpers/list';

// Initial state
const INITIAL_STATE = {
  isProcessing: false,
  isLoading: false,
  order: [],
  byId: {},
  count: 0,
};

const listing = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LISTINGS_START: {
            return { 
                ...state,
                isProcessing: true,
                order: [],
                byId: {}
            };
        }
        
        case GET_LISTINGS_SUCCESS:
            const { order, byId } = getOrderAndById(action?.payload?.data?.rows || [])

            return {
                ...state,
                
                isProcessing: false,
                order,
                byId,
                count: action?.payload?.data?.count || 0
            }

        case GET_LISTINGS_ERROR: {
            return { 
                ...state,
                isProcessing: false
            };
        }
        
        default:
          return state;
    }

}

export default listing;