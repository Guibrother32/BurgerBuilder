import axios from 'axios';

import * as actionTypes from './actionTypes';

export const checkOutTime = (expTime) => {//BECAUSE FIREBASE HAS A EXPIRATION TIME OF 3600s AND WE WILL LOGOUT THE USER AFTER THAT, SO THAT WE CAN GIVE THE USER A FEEDBACK WHENEVER ITS LOGGED IN/OUT
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expTime * 1000);
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => { //this is thnaks to redux-thunk
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true //this is a firebase auth pattern !!!THIS IS A MUST!!!
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSrDEqfeHgMD-v69ypz3YtIBSgMnrcp1g';

        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSrDEqfeHgMD-v69ypz3YtIBSgMnrcp1g';
        }
        axios.post(url, authData)
            .then(response => {
                const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); //explanatiom: when it doesnt have an argument it gives us the current date, if it does it transform the ms or s in date(get the current date.pass it to millisecons + expiration time*1000 => to transform to ms because JS works with ms)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expDate', expDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(checkOutTime(response.data.expiresIn));
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token) {
            dispatch(logout());
        } else {
            const expDate = new Date(localStorage.getItem('expDate'));//this is because localStorage will return a string we need a date
            if (expDate > new Date()) {
                dispatch(authSuccess(token, userId));
                dispatch(checkOutTime((expDate.getTime() - new Date().getTime())/1000 )); //getTime() results in ms
            } else {
                dispatch(logout());
            }
        }
    }
}