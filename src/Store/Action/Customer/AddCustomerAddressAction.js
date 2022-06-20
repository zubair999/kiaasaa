export const ADD_ADDRESS_BEGIN = "ADD_ADDRESS_BEGIN";
export const ADD_ADDRESS_SUCCESS = "ADD_ADDRESS_SUCCESS";
export const ADD_ADDRESS_FAILURE = "ADD_ADDRESS_FAILURE";

// import { token } from "../token"

export const addAddress = (addressData, token) => {
    const url = `https://devweb.kiaasa.com/api/pos/customer/address/create`;

    return dispatch => {
        dispatch(addAddressBegin());
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                },
                body:addressData
            })
                .then(res => res.json())
                .then(json => {
                        dispatch(addAddressSuccess(json)) 
                    }
                )
                .catch(error => {
                        dispatch(addAddressFailure(error))
                    }
                );
    };
}

function addAddressBegin () {
    return {
        type: ADD_ADDRESS_BEGIN
    }
};

function addAddressSuccess (ADD_ADDRESS) {
    return {
        type: ADD_ADDRESS_SUCCESS,
        payload: { ADD_ADDRESS }
    }
};

function addAddressFailure (error) {
    return {
        type: ADD_ADDRESS_FAILURE,
        payload: { error }
    }
};
