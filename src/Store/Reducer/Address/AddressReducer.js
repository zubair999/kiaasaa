import {
    FETCH_CUSTOMER_ADDRESS_BEGIN,
    FETCH_CUSTOMER_ADDRESS_SUCCESS,
    FETCH_CUSTOMER_ADDRESS_FAILURE
} from "../../Action/Customer/GetCustomerAddressAction";

import {
    ADD_ADDRESS_BEGIN,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAILURE
} from "../../Action/Customer/AddCustomerAddressAction";

import {
    CUSTOMER_LOGOUT
} from "../../Action/Auth/LogoutAction";
  
const initialState = {
    getAddress: [],
    loading: false,
    error: null,
    message:'',
    description:'',
    isInitialFetch:true,
    componentRefreshing:false,
    isNewAddressAdded:false
};
  
 export default function addressReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CUSTOMER_ADDRESS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                message:'Fetching customer address',
                componentRefreshing:false
            };
    
        case FETCH_CUSTOMER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                componentRefreshing:false,
                isInitialFetch:false,
                getAddress: action.payload.FETCH_CUSTOMER_ADDRESS.status == 'success' ? action.payload.FETCH_CUSTOMER_ADDRESS.address_list : [],
                message: action.payload.FETCH_CUSTOMER_ADDRESS.message,
                status: action.payload.FETCH_CUSTOMER_ADDRESS.status,
                isNewAddressAdded:false
            };
 
        case FETCH_CUSTOMER_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                error: action.payload.error,
                getAddress: [],
                isNewAddressAdded:false
            };


        case ADD_ADDRESS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                message:'',
                description:'',
                isNewAddressAdded:false
            };
        
        case ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                componentRefreshing:false,
                isInitialFetch:false,
                message: action.payload.ADD_ADDRESS.message,
                status: action.payload.ADD_ADDRESS.status,
                isNewAddressAdded:true
            };
     
        case ADD_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                error: action.payload.error,
                message: action.payload.ADD_ADDRESS.message,
                status: action.payload.ADD_ADDRESS.status,
                getAddress: [],
                isNewAddressAdded:false
            };


        case CUSTOMER_LOGOUT:
            return {
                getAddress: [],
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
  