import {
    SELECTED_COLOR,
    SELECTED_MIN_MAX,
    SELECTED_SIZEID
} from "../../Action/Product/filterAction";
  
const initialState = {   
    color: "",
    minValue:"",
    maxValue:"",
    sizeId:""
};
  
 export default function filterReducer(state = initialState, action) {
    switch (action.type) { 
        case SELECTED_COLOR:
            return {   
                ...state,   
                color: action.payload
            };
        case SELECTED_MIN_MAX:
            return{
                ...state,
                minValue:action.payload.minVal,
                maxValue:action.payload.maxVal
            }
        case SELECTED_SIZEID:
            return{
                ...state,
                sizeId:action.payload
            }
        default:
            return state;
    }
 }
  