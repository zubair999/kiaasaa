export const LOCAL_TOKEN = "LOCAL_TOKEN";

export const getTokenFromLocal = (token, tokTime) => {

    return {
        type: LOCAL_TOKEN,
        payload: {
            'tokenVal' : token,
            'toknTime' : tokTime
        }
    }    
}
