import {
    FETCH_SIZE_BEGIN,
    FETCH_SIZE_SUCCESS,
    FETCH_SIZE_FAILURE
} from "../../Action/Size/getSizeListAction";
  
const initialState = {
    getSize: [],
    loading: false,
    error: null,
    message:'',
    description:'',
    isInitialFetch:true,
    componentRefreshing:false,
    status: ""
};
  
 export default function sizeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SIZE_BEGIN:
            return {
                ...state,
                loading: true,
            };
    
        case FETCH_SIZE_SUCCESS:
            return {
                ...state,   
                loading: false,
                componentRefreshing:false,
                isInitialFetch:false,
                getSize: action.payload.FETCH_SIZE.status == 'success'  ? action.payload.FETCH_SIZE.size_list : [],
                message: action.payload.FETCH_SIZE.message,
                status: action.payload.FETCH_SIZE.status,
            };
 
        case FETCH_SIZE_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,   
                componentRefreshing:false,
                getSize: [],
                message: "something went wrong",
                status: "fail",
            };


        default:
            return state;
    }
 }
  