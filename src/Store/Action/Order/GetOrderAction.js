export const FETCH_ORDER_BEGIN = "FETCH_ORDER_BEGIN";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAILURE = "FETCH_ORDER_FAILURE";

// import { token } from "../token"

export const fetchOrder = (customer_id,token) => {
    const url = `https://devweb.kiaasa.com/api/pos/order/list/${customer_id}`;

    return dispatch => {
        dispatch(fetchOrderBegin());
        return fetch(url, {
                method: 'GET',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                        console.log("action is going")
                        console.log(json)
                        dispatch(fetchOrderSuccess(json)) 
                    }
                )
                .catch(error => {
                        console.log("error")
                        dispatch(fetchOrderFailure(error))
                    }
                );
    };
}

function fetchOrderBegin () {
    return {
        type: FETCH_ORDER_BEGIN
    }
};

function fetchOrderSuccess (FETCH_ORDER) {
    return {
        type: FETCH_ORDER_SUCCESS,
        payload: { FETCH_ORDER }
    }
};

function fetchOrderFailure (error) {
    return {
        type: FETCH_ORDER_FAILURE,
        payload: { error }
    }
};
