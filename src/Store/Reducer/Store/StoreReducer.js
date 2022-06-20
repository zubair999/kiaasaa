import {
    FETCH_STORE_BEGIN,
    FETCH_STORE_SUCCESS,
    FETCH_STORE_FAILURE
} from "../../Action/Store/StoreAction";
  
const initialState = {
    getStore: [],
    loading: false,
    error: null,
    message:'',
    description:'',
    isInitialFetch:true,
    componentRefreshing:false,
    status: ""
};
  
 export default function storeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STORE_BEGIN:
            return {
                ...state,
                loading: true,
            };
    
        case FETCH_STORE_SUCCESS:

        
            return {
                ...state,   
                loading: false,
                componentRefreshing:false,
                isInitialFetch:false,
                getStore: action.payload.FETCH_STORE.status == 'success'  ? action.payload.FETCH_STORE.store_list : [],
                message: action.payload.FETCH_STORE.message,
                status: action.payload.FETCH_STORE.status,
            };
 
        case FETCH_STORE_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,   
                componentRefreshing:false,
                getStore: [],
                message: "something went wrong",
                status: "fail",
            };


        default:
            return state;
    }
 }
  