import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart()); //I want to execute it wrapped in a dispatch so that the action returned by purchaseBurgerStart is dispatched to the store                 //triggers the spinner
        axios.post('/orders.json', orderData).then(response => {//.json is firebase thing
            console.log(response.data.name)
            dispatch(purchaseBurgerSuccess(response.data, orderData));                                                                                                              //proccess succeeded
        }).catch(error => {
            dispatch(purchaseBurgerFail(error));                                                                                                                                    //proccess error
        });
    }
}

export const purchaseInit = () =>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
};


export const fetchOrderSuccess = (orders) =>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrderError = (err) =>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    };
};

export const fetchOrderStart = () =>{
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
};


export const fetchOrder = () =>{
    return dispatch =>{
        dispatch(fetchOrderStart())
        axios.get('/orders.json').then(res => {
            const fetchedOrders = [];
            for (let key in res.data) { //key is the obj of all data for ex its M6GwI06boVVQrJav9B and A6GwsdgboVVQrJav9B
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
           dispatch(fetchOrderSuccess(fetchedOrders));
        }).catch(err => {
          dispatch(fetchOrderError(err));
        });
    }
}