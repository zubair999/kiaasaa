export const CUSTOMER_PROFILE_UPDATE_BEGIN = "CUSTOMER_PROFILE_UPDATE_BEGIN";
export const CUSTOMER_PROFILE_UPDATE_SUCCESS = "CUSTOMER_PROFILE_UPDATE_SUCCESS";
export const CUSTOMER_PROFILE_UPDATE_FAILURE = "CUSTOMER_PROFILE_UPDATE_FAILURE";

// import { token } from "../token"

export const customerProfileUpdate = (customerData, token) => {
    const url = `https://devweb.kiaasa.com/api/pos/customer/profile/update`;

    return dispatch => {
        dispatch(customerProfileUpdateBegin());
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                },
                body:customerData
            })
                .then(res => res.json())
                .then(json => {
                        dispatch(customerProfileUpdateSuccess(json, customerData)) 
                    }
                )
                .catch(error => {
                        dispatch(customerProfileUpdateFailure(error))
                    }
                );
    };
}

function customerProfileUpdateBegin () {
    return {
        type: CUSTOMER_PROFILE_UPDATE_BEGIN
    }
};

function customerProfileUpdateSuccess (CUSTOMER_PROFILE_UPDATE, CUSTOMER_DATA) {
    return {
        type: CUSTOMER_PROFILE_UPDATE_SUCCESS,
        payload: { CUSTOMER_PROFILE_UPDATE, CUSTOMER_DATA }
    }
};

function customerProfileUpdateFailure (error) {
    return {
        type: CUSTOMER_PROFILE_UPDATE_FAILURE,
        payload: { error }
    }
};
