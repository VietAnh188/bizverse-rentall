import {
  BOOKING_PROCESS_START,
  BOOKING_PROCESS_SUCCESS,
  BOOKING_PROCESS_ERROR,
  GET_SERVICE_FEES_SUCCESS,
  BOOKING_PAYMENT_START,
  BOOKING_PAYMENT_SUCCESS,
  BOOKING_PAYMENT_ERROR,
  BOOKING_PAYMENT_FOR_CANCEL_START,
  BOOKING_PAYMENT_FOR_CANCEL_ERROR,
  ONE_FIN_PAYMENT_REQUEST_ERROR,
  ONE_FIN_PAYMENT_REQUEST_SUCCESS,
  ONE_FIN_PAYMENT_REQUEST_START
} from '../constants';

export default function book(state = {}, action) {
  switch (action.type) {

    case BOOKING_PROCESS_START:
      return {
        ...state,
        data: null,
        bookDetails: null,
        bookingLoading: true,
      };

    case BOOKING_PROCESS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        bookDetails: action.payload.bookDetails,
        bookingLoading: false,
      };

    case BOOKING_PROCESS_ERROR:
      return {
        ...state,
        bookingLoading: false,
      };

    case BOOKING_PAYMENT_START:
      return {
        ...state,
        paymentLoading: true,
      };

    case BOOKING_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentLoading: false,
      };

    case BOOKING_PAYMENT_ERROR:
      return {
        ...state,
        paymentLoading: false,
      };

    case BOOKING_PAYMENT_FOR_CANCEL_START:
      return {
        ...state,
        paymentLoading: true,
      };

    case BOOKING_PAYMENT_FOR_CANCEL_ERROR:
      return {
        ...state,
        paymentLoading: false,
      };

    case GET_SERVICE_FEES_SUCCESS:
      return {
        ...state,
        serviceFees: action.payload.serviceFees,
      };

    case ONE_FIN_PAYMENT_REQUEST_START:
      return {
        ...state,
        paymentLoading: true
      }

    case ONE_FIN_PAYMENT_REQUEST_SUCCESS:
    case ONE_FIN_PAYMENT_REQUEST_ERROR:
      return {
        ...state,
        paymentLoading: false
      }

    default:
      return state;
  }
}