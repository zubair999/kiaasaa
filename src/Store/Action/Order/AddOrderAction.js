export const ADD_ORDER_BEGIN = "ADD_ORDER_BEGIN";
export const ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS";
export const ADD_ORDER_FAILURE = "ADD_ORDER_FAILURE";

import axios from "axios";
// import { token } from "../token"


export const addOrder = (orderData, token) => {

    const url = `https://devweb.kiaasa.com/api/pos/order/create`;

    // const url = `https://kiaasa.revopions.com/v1/createorder`;

    // const url = `https://jsonplaceholder.typicode.com/todos`;
    

    const formdata = new FormData();

    // const formdata = {
    //     address_id:[5,55],
    //     color:[2,6]
    // }

    console.log('orderData',orderData);

    for (var i in orderData.cart) {
        formdata.append(`product[${i}]`, orderData.cart[i].product_id);
        formdata.append(`quantity[${i}]`, orderData.cart[i].quantity);
        formdata.append(`color[${i}]`, orderData.cart[i].color);
        formdata.append(`size[${i}]`, orderData.cart[i].size);
    }  

    formdata.append('customer_id', orderData.customerId);
    formdata.append('store_id', orderData.storeId);
    formdata.append('net_price', orderData.netPrice);
    formdata.append('address_id', 1);   

    
    return dispatch => {
        dispatch(addOrderBegin());
        return  axios({
            method: "post",
            url: url,
            data: formdata,
            headers: { 
            'Access-Token': token,            
            'Content-Type': 'application/json'
          },
          }).then(json => {
            console.log("order action");
            console.log('json',json)
            dispatch(addOrderSuccess(json)) 
        }).catch(error => {
            console.log("error")
            dispatch(addOrderFailure(error))
            console.log(error);
        });
    };
}

function addOrderBegin () {
    return {
        type: ADD_ORDER_BEGIN
    }
};

function addOrderSuccess (ADD_ORDER) {
    return {
        type: ADD_ORDER_SUCCESS,
        payload: { ADD_ORDER }
    }
};

function addOrderFailure (error) {
    return {
        type: ADD_ORDER_FAILURE,
        payload: { error }
    }
};
