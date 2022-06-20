import {
    CURRENT_POSITION
} from "../Action/currentLang&Long";

const initialState = {
        latitude: null,
        longitude: null  
}

export default function getcurrentpos(state=initialState, action){ 
    switch (action.type) { 
        case CURRENT_POSITION:
            return {                    
                latitude: action.payload.langi,
                longitude : action.payload.longi
            };        
        default:
            return state;
    }
}