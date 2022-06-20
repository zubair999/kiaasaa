export const FETCH_TOKEN_BEGIN = "FETCH_TOKEN_BEGIN";
export const FETCH_TOKEN_SUCCESS = "FETCH_TOKEN_SUCCESS";
export const FETCH_TOKEN_FAILURE = "FETCH_TOKEN_FAILURE";


export const fetchToken = () => {
    const url = `https://devweb.kiaasa.com/api/pos/login`;

    return dispatch => {
        dispatch(fetchTokenBegin());
        var myHeaders = new Headers();
        var loginData = JSON.stringify({
            "email": "websiteapi@kiaasaretail.com",
            "password": "QwertyZ0#"
          });
        myHeaders.append("Content-Type", "application/json");
        return fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body:loginData
            })
                .then(res => res.json())
                .then(json => {
                        dispatch(fetchTokenSuccess(json))
                        localStorage.setItem('Token', json.user_data.api_token);
                        localStorage.setItem('Time', json.user_data.api_token_created_at); 
                        console.log('fetch Token Data',json)
                    }
                )
                .catch(error => {
                        dispatch(fetchTokenFailure(error))
                        console.log('fetch Token Data',json)
                    }
                );
    };
}

function fetchTokenBegin () {
    return {
        type: FETCH_TOKEN_BEGIN
    }
};

function fetchTokenSuccess (TOKEN_DATA) {
    return {
        type: FETCH_TOKEN_SUCCESS,
        payload: { TOKEN_DATA }
    }
};

function fetchTokenFailure (error) {
    return {
        type: FETCH_TOKEN_FAILURE,
        payload: { error }
    }
};
