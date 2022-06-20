import {
    FETCH_PRODUCT_BY_STORE_BEGIN,
    FETCH_PRODUCT_BY_STORE_SUCCESS,
    FETCH_PRODUCT_BY_STORE_FAILURE
} from "../../Action/Product/getProductByStoreAction";

import {
    SELECTED_COLOR
} from "../../Action/Product/filterAction";
  
const initialState = {
    getProduct: [],
    loading: false,
    error: null,
    message:'',
    description:'',
    isInitialFetch:true,
    componentRefreshing:false,
    status:"",
    color: ""
};
  
 export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCT_BY_STORE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                componentRefreshing:true
            };
    
        case FETCH_PRODUCT_BY_STORE_SUCCESS:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                getProduct: action.payload.PRODUCT_BY_STORE.status == "success" ? action.payload.PRODUCT_BY_STORE.products_list.data : [],
                status: action.payload.PRODUCT_BY_STORE.status,
                message: action.payload.PRODUCT_BY_STORE.message
            };
 
        case FETCH_PRODUCT_BY_STORE_FAILURE:
            
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                getProduct:[]
            };



        case SELECTED_COLOR:
            return {
                ...state,
                color: action.payload
            };


        default:
            return state;
    }
 }
  