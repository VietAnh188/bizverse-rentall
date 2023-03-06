import { 
    CREATE_NFT_START,
    CREATE_NFT_SUCCESS,
    CREATE_NFT_ERROR,
    GET_NFTs_START,
    GET_NFTs_SUCCESS,
    GET_NFTs_ERROR,
    GET_NFT_START,
    GET_NFT_SUCCESS,
    GET_NFT_ERROR,
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

const nft = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_NFTs_START: {
            return { 
                ...state,
                isProcessing: true,
                order: [],
                byId: {},
            };
        }

        case CREATE_NFT_START: {
            return { 
                ...state,
                isProcessing: true
            };
        }

        case CREATE_NFT_SUCCESS: {
            return { 
                ...state,
                isProcessing: false
            };
        }
        
        case GET_NFTs_SUCCESS:
            const { order, byId } = getOrderAndById(action?.payload?.data?.rows || [])

            return {
                ...state,
                
                isProcessing: false,
                order,
                byId,
                count: action?.payload?.data?.count || 0
            }

        case GET_NFTs_ERROR:
        case CREATE_NFT_ERROR: {
            return { 
                ...state,
                isProcessing: false
            };
        }
        case GET_NFT_START: {
            return {
                ...state,
                isLoading: true,
                order: [],
                byId: {}
            };
        }
        
        case GET_NFT_SUCCESS: {
            const { order, byId } = getOrderAndById([action?.payload?.data] || [])
            return {
                ...state,
                isLoading: false,
                order: order,
                byId: byId
            };
        }

        case GET_NFT_ERROR: {
            return {
                ...state,
                isLoading: false,
            };
        }
        default:
          return state;
    }

}

export default nft;