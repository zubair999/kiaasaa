export const FETCH_COLOR_BEGIN = "FETCH_COLOR_BEGIN";
export const FETCH_COLOR_SUCCESS = "FETCH_COLOR_SUCCESS";
export const FETCH_COLOR_FAILURE = "FETCH_COLOR_FAILURE";


// import { token } from "../token"

export const fetchColor = (token) => {

    const url = `https://devweb.kiaasa.com/api/pos/color/list`;

    return dispatch => {
        dispatch(fetchColorBegin());
        return fetch(url, {
                method: 'GET',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(json => {
                        dispatch(fetchColorSuccess(json)) 
                    }
                )
                .catch(error => {
                        dispatch(fetchColorFailure(error))
                    }
                );
    };
}

function fetchColorBegin () {
    return {
        type: FETCH_COLOR_BEGIN
    }
};

function fetchColorSuccess (FETCH_COLOR) {
    return {
        type: FETCH_COLOR_SUCCESS,
        payload: { FETCH_COLOR }       
    }
};

function fetchColorFailure (error) {
    return {
        type: FETCH_COLOR_FAILURE,
        payload: { error }
    }
};
