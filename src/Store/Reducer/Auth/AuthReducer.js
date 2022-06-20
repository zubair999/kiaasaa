import {
    CUSTOMER_LOGIN_BEGIN,
    CUSTOMER_LOGIN_SUCCESS,
    CUSTOMER_LOGIN_FAILURE
} from "../../Action/Auth/LoginAction";

import {
    CUSTOMER_REGISTER_BEGIN,
    CUSTOMER_REGISTER_SUCCESS,
    CUSTOMER_REGISTER_FAILURE
} from "../../Action/Auth/RegisterAction";

import {
    CUSTOMER_PROFILE_UPDATE_BEGIN,
    CUSTOMER_PROFILE_UPDATE_SUCCESS,
    CUSTOMER_PROFILE_UPDATE_FAILURE
} from "../../Action/Customer/ProfileUpdateAction";

import {
    CHANGE_PASSWORD_BEGIN,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from "../../Action/Auth/ChangePasswordAction";

import {
    CUSTOMER_LOGOUT
} from "../../Action/Auth/LogoutAction";

import {
    FETCH_TOKEN_BEGIN,
    FETCH_TOKEN_SUCCESS,
    FETCH_TOKEN_FAILURE
} from "../../Action/Auth/FetchTokenAction";

  
const initialState = {
    getCustomer: {},
    loading: false,
    error: null,
    isInitialFetch:true,
    componentRefreshing:false,
    status:"",
    dateTime:"",
    message:"",
    isAuthorized:false,
    getToken:{}
};
  
 export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_LOGIN_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
    
        case CUSTOMER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                getCustomer: action.payload.CUSTOMER_LOGIN.status == 'success' ? action.payload.CUSTOMER_LOGIN.customer_detail : {},
                message:action.payload.CUSTOMER_LOGIN.message,
                status: action.payload.CUSTOMER_LOGIN.status,
                dateTime:action.payload.CUSTOMER_LOGIN.dateTime,
                isAuthorized: action.payload.CUSTOMER_LOGIN.status == 'success' ? true : false 
            };
 
        case CUSTOMER_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                error: 'error',
                getCustomer: {},
                message:action.payload.CUSTOMER_LOGIN.message,
                status:action.payload.CUSTOMER_LOGIN.status,
                dateTime:action.payload.CUSTOMER_LOGIN.dateTime,
                isAuthorized:false
            };

        case CUSTOMER_REGISTER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
    
        case CUSTOMER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                getCustomer: action.payload.CUSTOMER_REGISTER.status == 'success' ? action.payload.CUSTOMER_REGISTER.customer_data : {},
                message:action.payload.CUSTOMER_REGISTER.message,
                status: action.payload.CUSTOMER_REGISTER.status,
                dateTime:action.payload.CUSTOMER_REGISTER.dateTime,
                isAuthorized: action.payload.CUSTOMER_REGISTER.status == 'success' ? true : false 
            };
    
        case CUSTOMER_REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                error: 'error',
                getCustomer: {},
                message:action.payload.CUSTOMER_REGISTER.message,
                status:action.payload.CUSTOMER_REGISTER.status,
                dateTime:action.payload.CUSTOMER_REGISTER.dateTime,
                isAuthorized:false
            };


        case CUSTOMER_LOGOUT:
            return {
                getCustomer: {},
                loading: false,
                error: null,
                isInitialFetch:true,
                componentRefreshing:false,
                status:"",
                dateTime:"",
                message:"",
                isAuthorized:false
            };

        case CUSTOMER_PROFILE_UPDATE_BEGIN:
            return {
                ...state,
                loading: true,
                isInitialFetch:false,
                error: null
            };
    
        case CUSTOMER_PROFILE_UPDATE_SUCCESS:
            if(action.payload.CUSTOMER_PROFILE_UPDATE.status == "success"){
                const customerUpdatedData = JSON.parse(action.payload.CUSTOMER_DATA)
                state.getCustomer.customer_name = customerUpdatedData.name
                state.getCustomer.phone = customerUpdatedData.phone_no

                return {
                    ...state,
                    loading: false,
                    isInitialFetch:false,
                    getCustomer: state.getCustomer,
                    message: "Customer updated successfully.",
                    status: action.payload.CUSTOMER_PROFILE_UPDATE.status,
                };
            }
            else{
                return {
                    ...state,
                    loading: false,
                    isInitialFetch:false,
                    message:action.payload.CUSTOMER_PROFILE_UPDATE.message,
                    status: action.payload.CUSTOMER_PROFILE_UPDATE.status,
                };
            }


            
 
        case CUSTOMER_PROFILE_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                componentRefreshing:false,
                error: 'error',
                getCustomer: {},
                message:action.payload.CUSTOMER_LOGIN.message,
                status:action.payload.CUSTOMER_LOGIN.status,
                dateTime:action.payload.CUSTOMER_LOGIN.dateTime,
                isAuthorized:false
            };

        case CHANGE_PASSWORD_BEGIN:
            return {
                ...state,
                loading: true,
                isInitialFetch:false,
                error: null
            };
    
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                message:action.payload.CHANGE_PASSWORD.message,
                status: action.payload.CHANGE_PASSWORD.status
            };

        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                message:action.payload.CHANGE_PASSWORD.message,
                status:action.payload.CHANGE_PASSWORD.status,
            };

        case FETCH_TOKEN_BEGIN:
            return {
                ...state,
                loading: true,
                isInitialFetch:false,
                error: null
            };
    
        case FETCH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                isInitialFetch:false,
                message:action.payload.TOKEN_DATA.message,
                status: action.payload.TOKEN_DATA.status,
                getToken: action.payload.TOKEN_DATA.user_data
            };

        case FETCH_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                message:action.payload.error.message,
                status:action.payload.error.status,
            };

        default:
            return state;
    }
 }
  