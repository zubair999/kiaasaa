export const FETCH_PRODUCT_BY_STORE_BEGIN = "FETCH_PRODUCT_BY_STORE_BEGIN";
export const FETCH_PRODUCT_BY_STORE_SUCCESS = "FETCH_PRODUCT_BY_STORE_SUCCESS";
export const FETCH_PRODUCT_BY_STORE_FAILURE = "FETCH_PRODUCT_BY_STORE_FAILURE";

// import { token } from "../token"


export const fetchProductByStore = (store_id, min_price, max_price, color, size, page, token) => {
    const url = `https://devweb.kiaasa.com/api/pos/product/list?
                                        store_id=${store_id}&
                                        min_price=${min_price}&
                                        max_price=${max_price}&
                                        size_id=${size}&
                                        color_id=${color}&
                                        page=${page}`; 

    return dispatch => {
        dispatch(fetchProductByStoreBegin());
        return fetch(url, {
                method: 'GET',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {                     
                        dispatch(fetchProductByStoreSuccess(json)) 
                    }
                )
                .catch(error => {
                        dispatch(fetchProductByStoreFailure(error))
                    }
                );
    };
}

function fetchProductByStoreBegin () {
    return {
        type: FETCH_PRODUCT_BY_STORE_BEGIN
    }
};

function fetchProductByStoreSuccess (PRODUCT_BY_STORE) {
    return {
        type: FETCH_PRODUCT_BY_STORE_SUCCESS,
        payload: { PRODUCT_BY_STORE }
    }
};

function fetchProductByStoreFailure (error) {
    return {
        type: FETCH_PRODUCT_BY_STORE_FAILURE,
        payload: { error }
    }
};
