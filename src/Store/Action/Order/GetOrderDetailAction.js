export const FETCH_ORDER_DETAIL_BEGIN = "FETCH_ORDER_DETAIL_BEGIN";
export const FETCH_ORDER_DETAIL_SUCCESS = "FETCH_ORDER_DETAIL_SUCCESS";
export const FETCH_ORDER_DETAIL_FAILURE = "FETCH_ORDER_DETAIL_FAILURE";

// import { token } from "../token"

export const fetchOrderDetail = (order_id, token) => {
    const url = `https://devweb.kiaasa.com/api/pos/order/detail/${order_id}`;

    return dispatch => {
        dispatch(fetchOrderDetailBegin());
        return fetch(url, {
                method: 'GET',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                        dispatch(fetchOrderDetailSuccess(json)) 
                    }
                )
                .catch(error => {
                        dispatch(fetchOrderDetailFailure(error))
                    }
                );
    };
}

function fetchOrderDetailBegin () {
    return {
        type: FETCH_ORDER_DETAIL_BEGIN
    }
};

function fetchOrderDetailSuccess (FETCH_ORDER_DETAIL) {
    return {
        type: FETCH_ORDER_DETAIL_SUCCESS,
        payload: { FETCH_ORDER_DETAIL }
    }
};

function fetchOrderDetailFailure (error) {
    return {
        type: FETCH_ORDER_DETAIL_FAILURE,
        payload: { error }
    }
};
