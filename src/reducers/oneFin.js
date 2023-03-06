import { 
    ONE_FIN_PAYMENT_REQUEST_SUCCESS, 
    GET_ONE_FIN_PAYMENT_STATUS_SUCCESS,
    GET_ONE_FIN_PAYMENT_STATUS_ERROR,
    GET_ONE_FIN_PAYMENT_STATUS_START
} from "../constants";

// Initial state
const INITIAL_STATE = {
  paymentURL: '',
  reservationState: '',
  isLoading: false
};

const oneFin = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ONE_FIN_PAYMENT_REQUEST_SUCCESS: {
            state.paymentURL = action.payload.paymentURL;

            return { 
                ...state 
            };
        }

        case GET_ONE_FIN_PAYMENT_STATUS_START: {
            state.isLoading = true;

            return { 
                ...state 
            };
        }

        case GET_ONE_FIN_PAYMENT_STATUS_SUCCESS: {
            state.reservationState = action.payload.reservationState;
            state.isLoading = false;

            return { 
                ...state 
            };
        }

        case GET_ONE_FIN_PAYMENT_STATUS_ERROR: {
            state.isLoading = false;

            return { 
                ...state 
            };
        }


        default:
          return state;
    }

}

export default oneFin;