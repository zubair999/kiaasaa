import {
    FETCH_ORDER_BEGIN,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAILURE
} from "../../Action/Order/GetOrderAction";

import {
    FETCH_ORDER_DETAIL_BEGIN,
    FETCH_ORDER_DETAIL_SUCCESS,
    FETCH_ORDER_DETAIL_FAILURE
} from "../../Action/Order/GetOrderDetailAction";

import {
    ADD_ORDER_BEGIN,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAILURE
} from "../../Action/Order/AddOrderAction";

import {
    CUSTOMER_LOGOUT
} from "../../Action/Auth/LogoutAction";
  
const initialState = {
    getOrder: [],
    loading: false,
    error: null,
    message:"",
    status:"",
    isInitialFetch:true,
    componentRefreshing:false,
};
  
 export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ORDER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                message:'',
                description:'',
                componentRefreshing:true
            };
    
        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                componentRefreshing:false,
                isInitialFetch:false,
                getOrder: action.payload.FETCH_ORDER.status == 'fail' ? [] : action.payload.FETCH_ORDER.orders_list,
                message: action.payload.FETCH_ORDER.message,
                status: action.payload.FETCH_ORDER.status
            };
 
        case FETCH_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                error: action.payload.error,
                getOrder: [],
            };


        case FETCH_ORDER_DETAIL_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                message:'',
                description:'',
                componentRefreshing:true
            };
    
        case FETCH_ORDER_DETAIL_SUCCESS:
            state.getOrder.find((item) => {
                if(item.order_id == action.payload.FETCH_ORDER_DETAIL.order_data.order_id){
                    item.order_detail = action.payload.FETCH_ORDER_DETAIL.order_data
                    item.order_products = action.payload.FETCH_ORDER_DETAIL.order_products
                }
            })

            return {
                ...state,
                loading: false,
                componentRefreshing:false,
                isInitialFetch:false,
                getOrder:state.getOrder,
                message: 'Order detail',
            };
    
        case FETCH_ORDER_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                error: action.payload.error,
                getOrder: [],
            };



        case ADD_ORDER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                message:'Creating Order',
                componentRefreshing:true
            };
    
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                componentRefreshing:false,
                isInitialFetch:false,
                message: action.payload.ADD_ORDER.message,
                status: action.payload.ADD_ORDER.status,
            };
    
        case ADD_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                message: action.payload.error.message,
                status: action.payload.error.status,
            };

        

        case CUSTOMER_LOGOUT:
            return {
                getOrder: [],
                loading: false,
                error: null,
                isInitialFetch:true,
                componentRefreshing:false,
                status:"",
                dateTime:"",
                message:"",
                isAuthorized:false
            };


        default:
            return state;
    }
 }
  