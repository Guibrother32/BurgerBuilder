import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart()); //I want to execute it wrapped in a dispatch so that the action returned by purchaseBurgerStart is dispatched to the store                 //triggers the spinner
        axios.post('/orders.json?auth=' + token, orderData).then(response => {//.json is firebase thing
            console.log(response.data.name)
            dispatch(purchaseBurgerSuccess(response.data, orderData));                                                                                                              //proccess succeeded
        }).catch(error => {
            dispatch(purchaseBurgerFail(error));                                                                                                                                    //proccess error
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersError = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};


export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token).then(res => {
            const fetchedOrders = [];
            for (let key in res.data) { //key is the obj of all data for ex its M6GwI06boVVQrJav9B and A6GwsdgboVVQrJav9B
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err => {
            console.log('/orders.json?auth=' + token);
            dispatch(fetchOrdersError(err));
        });
    }
}