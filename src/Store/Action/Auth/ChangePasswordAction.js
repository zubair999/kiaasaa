export const CHANGE_PASSWORD_BEGIN = "CHANGE_PASSWORD_BEGIN";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

// import { token } from "../token"

export const changeCustomerPassword = (passwordData,token) => {  

    const url = `https://devweb.kiaasa.com/api/pos/customer/password/update`;

    return dispatch => {
       
        dispatch(changePasswordBegin());
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Token':token,
                    'Content-Type': 'application/json'
                },
                body:passwordData
            })
                .then(res => res.json())
                .then(json => {
                        dispatch(changePasswordSuccess(json)) 
                    }
                )
                .catch(error => {
                        dispatch(changePasswordFailure(error))
                    }
                );
    };
}

function changePasswordBegin () {
    return {
        type: CHANGE_PASSWORD_BEGIN
    }
};

function changePasswordSuccess (CHANGE_PASSWORD) {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload: { CHANGE_PASSWORD }
    }
};

function changePasswordFailure (error) {
    return {
        type: CHANGE_PASSWORD_FAILURE,
        payload: { error }
    }
};
