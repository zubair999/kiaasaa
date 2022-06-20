import {
    FETCH_STATE_BEGIN,
    FETCH_STATE_SUCCESS,
    FETCH_STATE_FAILURE
} from "../../Action/State/GetStateAction";
  
const initialState = {
    getState: [],
    loading: false,
    error: null,
    message:'',
    description:'',
    isInitialFetch:true,
    componentRefreshing:false,
    status:""
};
  
 export default function stateReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STATE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                message:'',
                description:'',
                componentRefreshing:true
            };
    
        case FETCH_STATE_SUCCESS:
            return {
                ...state,
                loading: false,
                componentRefreshing: false,
                isInitialFetch: false,
                getState: action.payload.FETCH_STATE.status == 'success' ? action.payload.FETCH_STATE.state_list : [],
                message: action.payload.FETCH_STATE.message,
                status: action.payload.FETCH_STATE.status
            };
 
        case FETCH_STATE_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                error: action.payload.error,
                getState: [],
            };


        default:
            return state;
    }
 }
  