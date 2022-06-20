export const FETCH_STORE_BEGIN = "FETCH_STORE_BEGIN";
export const FETCH_STORE_SUCCESS = "FETCH_STORE_SUCCESS";
export const FETCH_STORE_FAILURE = "FETCH_STORE_FAILURE";


// import { token } from "../token";

export const fetchStore = (token) => {

    const url = `https://devweb.kiaasa.com/api/pos/store/list`;
   
    return dispatch => {
   
        dispatch(fetchStoreBegin());
        return fetch(url, {
                method: 'GET',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                    console.log('succes')
                    console.log(json)
                        dispatch(fetchStoreSuccess(json)) 
                    }
                )
                .catch(error => {
                    console.log('fail')
                    console.log(error)
                        dispatch(fetchStoreFailure(error))
                    }
                );
    };
}

function fetchStoreBegin () {
    return {
        type: FETCH_STORE_BEGIN
    }
};

function fetchStoreSuccess (FETCH_STORE) {
    return {
        type: FETCH_STORE_SUCCESS,
        payload: { FETCH_STORE }       
    }
};

function fetchStoreFailure (error) {
    return {
        type: FETCH_STORE_FAILURE,
        payload: { error }
    }
};
