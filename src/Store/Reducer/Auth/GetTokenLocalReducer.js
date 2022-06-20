import {
    LOCAL_TOKEN   
} from "../../Action/Auth/GetTokenLocalAction";
  
const initialState = {   
   localToken : '',
   loading : false,
   error : null,
   tokenTime : ''
};  
 export default function localTokenReducer(state = initialState, action) {
    switch (action.type) { 
        case LOCAL_TOKEN:
            return {
                localToken : action.payload.tokenVal,
                tokenTime : action.payload.toknTime,
                loading: false,
                error: null
            };        
        default:
            return state;
    }
 }
  