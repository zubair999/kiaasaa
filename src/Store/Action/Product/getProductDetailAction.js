export const FETCH_PRODUCT_DETAIL_BEGIN = "FETCH_PRODUCT_DETAIL_BEGIN";
export const FETCH_PRODUCT_DETAIL_SUCCESS = "FETCH_PRODUCT_DETAIL_SUCCESS";
export const FETCH_PRODUCT_DETAIL_FAILURE = "FETCH_PRODUCT_DETAIL_FAILURE";

import { token } from "../token"

export const fetchProductDetail = (product_id, store_id) => {

    const url = `https://devweb.kiaasa.com/api/pos/details/${product_id}/${store_id}`;

    return dispatch => {
        dispatch(fetchProductDetailBegin());
        return fetch(url, {
                method: 'GET',
                headers: {
                    'Access-Token':token,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                        dispatch(fetchProductDetailSuccess(json)) 
                    }
                )
                .catch(error => {
                        dispatch(fetchProductDetailFailure(error))
                    }
                );
    };
}

function fetchProductDetailBegin () {
    return {
        type: FETCH_PRODUCT_DETAIL_BEGIN
    }
};

function fetchProductDetailSuccess (PRODUCT_DETAIL) {
    return {
        type: FETCH_PRODUCT_DETAIL_SUCCESS,
        payload: { PRODUCT_DETAIL }
    }
};

function fetchProductDetailFailure (error) {
    return {
        type: FETCH_PRODUCT_DETAIL_FAILURE,
        payload: { error }
    }
};
