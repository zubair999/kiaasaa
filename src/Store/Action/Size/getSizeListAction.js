export const FETCH_SIZE_BEGIN = "FETCH_SIZE_BEGIN";
export const FETCH_SIZE_SUCCESS = "FETCH_SIZE_SUCCESS";
export const FETCH_SIZE_FAILURE = "FETCH_SIZE_FAILURE";

// import { token } from "../token"

export const fetchSize = (token) => {

    const url = `https://devweb.kiaasa.com/api/pos/size/list`;

    return dispatch => {
        dispatch(fetchSizeBegin());
        return fetch(url, {
                method: 'GET',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(json => {
                        dispatch(fetchSizeSuccess(json)) 
                    }
                )
                .catch(error => {
                        dispatch(fetchSizeFailure(error))
                    }
                );
    };
}

function fetchSizeBegin () {
    return {
        type: FETCH_SIZE_BEGIN
    }
};

function fetchSizeSuccess (FETCH_SIZE) {
    return {
        type: FETCH_SIZE_SUCCESS,
        payload: { FETCH_SIZE }       
    }
};

function fetchSizeFailure (error) {
    return {
        type: FETCH_SIZE_FAILURE,
        payload: { error }
    }
};
