export const FETCH_CUSTOMER_ADDRESS_BEGIN = "FETCH_CUSTOMER_ADDRESS_BEGIN";
export const FETCH_CUSTOMER_ADDRESS_SUCCESS = "FETCH_CUSTOMER_ADDRESS_SUCCESS";
export const FETCH_CUSTOMER_ADDRESS_FAILURE = "FETCH_CUSTOMER_ADDRESS_FAILURE";

// import { token } from "../token"

export const fetchCustomerAddress = (customer_id, token) => {
    const url = `https://devweb.kiaasa.com/api/pos/customer/address/list/${customer_id}`;

    return dispatch => {
        dispatch(fetchCustomerAddressBegin());
        return fetch(url, {
                method: 'GET',
                headers: {
                    'Access-Token':token,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                        dispatch(fetchCustomerAddressSuccess(json)) 
                    }
                )
                .catch(error => {
                        dispatch(fetchCustomerAddressFailure(error))
                    }
                );
    };
}

function fetchCustomerAddressBegin () {
    return {
        type: FETCH_CUSTOMER_ADDRESS_BEGIN
    }
};

function fetchCustomerAddressSuccess (FETCH_CUSTOMER_ADDRESS) {
    return {
        type: FETCH_CUSTOMER_ADDRESS_SUCCESS,
        payload: { FETCH_CUSTOMER_ADDRESS }
    }
};

function fetchCustomerAddressFailure (error) {
    return {
        type: FETCH_CUSTOMER_ADDRESS_FAILURE,
        payload: { error }
    }
};
