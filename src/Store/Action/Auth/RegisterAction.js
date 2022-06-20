export const CUSTOMER_REGISTER_BEGIN = "CUSTOMER_REGISTER_BEGIN";
export const CUSTOMER_REGISTER_SUCCESS = "CUSTOMER_REGISTER_SUCCESS";
export const CUSTOMER_REGISTER_FAILURE = "CUSTOMER_REGISTER_FAILURE";

// import { token } from "../token"
export const customerRegister = (customerData, token) => {
    const url = `https://devweb.kiaasa.com/api/pos/customer/create`;
    return dispatch => {
        dispatch(customerRegisterBegin());
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                },
                body: customerData
            })
                .then(res => res.json())
                .then(json => {
                        console.log("register action");
                        console.log(json);
                        dispatch(customerRegisterSuccess(json)) 
                    }
                )
                .catch(error => {
                        dispatch(customerRegisterFailure(error))
                    }
                );
    };
}

function customerRegisterBegin () {
    return {
        type: CUSTOMER_REGISTER_BEGIN
    }
};

function customerRegisterSuccess (CUSTOMER_REGISTER) {
    return {
        type: CUSTOMER_REGISTER_SUCCESS,
        payload: { CUSTOMER_REGISTER }
    }
};

function customerRegisterFailure (error) {
    return {
        type: CUSTOMER_REGISTER_FAILURE,
        payload: { error }
    }
};
