export const CUSTOMER_LOGIN_BEGIN = "CUSTOMER_LOGIN_BEGIN";
export const CUSTOMER_LOGIN_SUCCESS = "CUSTOMER_LOGIN_SUCCESS";
export const CUSTOMER_LOGIN_FAILURE = "CUSTOMER_LOGIN_FAILURE";

// import { token } from "../token"


export const customerLogin = (customerData, token) => {

 

    const url = `https://devweb.kiaasa.com/api/pos/customer/details`;

    return dispatch => {
        dispatch(customerLoginBegin());
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
                        dispatch(customerLoginSuccess(json)) 
                        console.log('Login Action Customer',json)
                    }
                )
                .catch(error => {
                        dispatch(customerLoginFailure(error))
                    }
                );
    };
}

function customerLoginBegin () {
    return {
        type: CUSTOMER_LOGIN_BEGIN
    }
};

function customerLoginSuccess (CUSTOMER_LOGIN) {
    return {
        type: CUSTOMER_LOGIN_SUCCESS,
        payload: { CUSTOMER_LOGIN }
    }
};

function customerLoginFailure (error) {
    return {
        type: CUSTOMER_LOGIN_FAILURE,
        payload: { error }
    }
};
