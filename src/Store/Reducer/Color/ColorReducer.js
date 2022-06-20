import {
    FETCH_COLOR_BEGIN,
    FETCH_COLOR_SUCCESS,
    FETCH_COLOR_FAILURE
} from "../../Action/Color/ColorAction";
  
const initialState = {
    getColor: [],
    loading: false,
    error: null,
    message:'',
    description:'',
    isInitialFetch:true,
    componentRefreshing:false,
    status: ""
};
  
 export default function colorReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COLOR_BEGIN:
            return {
                ...state,
                loading: true,
            };
    
        case FETCH_COLOR_SUCCESS:
            return {
                ...state,   
                loading: false,
                componentRefreshing:false,
                isInitialFetch:false,
                getColor: action.payload.FETCH_COLOR.status == 'success'  ? action.payload.FETCH_COLOR.color_list : [],
                message: action.payload.FETCH_COLOR.message,
                status: action.payload.FETCH_COLOR.status,
            };
 
        case FETCH_COLOR_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,   
                componentRefreshing:false,
                getColor: [],
                message: "something went wrong",
                status: "fail",
            };


        default:
            return state;
    }
 }
  