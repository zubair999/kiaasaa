export const FETCH_STATE_BEGIN = "FETCH_STATE_BEGIN";
export const FETCH_STATE_SUCCESS = "FETCH_STATE_SUCCESS";
export const FETCH_STATE_FAILURE = "FETCH_STATE_FAILURE";

// import { token } from "../token"


export const fetchState = (token) => {
    const url = `https://devweb.kiaasa.com/api/pos/state/list`;

    return dispatch => {
        dispatch(fetchStateBegin());
        return fetch(url, {
                method: 'GET',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                        dispatch(fetchStateSuccess(json)) 
                    }
                )
                .catch(error => {
                        dispatch(fetchStateFailure(error))
                    }
                );
    };
}

function fetchStateBegin () {
    return {
        type: FETCH_STATE_BEGIN
    }
};

function fetchStateSuccess (FETCH_STATE) {
    return {
        type: FETCH_STATE_SUCCESS,
        payload: { FETCH_STATE }
    }
};

function fetchStateFailure (error) {
    return {
        type: FETCH_STATE_FAILURE,
        payload: { error }
    }
};
