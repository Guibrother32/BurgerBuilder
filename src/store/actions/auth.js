import axios from 'axios';

import * as actionTypes from './actionTypes';

export const checkOutTime = () =>{//BECAUSE FIREBASE HAS A EXPIRATION TIME OF 3600s AND WE WILL LOGOUT THE USER AFTER THAT, SO THAT WE CAN GIVE THE USER A FEEDBACK WHENEVER ITS LOGGED IN/OUT
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        },3600*1000);
    };
};

export const logout = () =>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken,userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error:error
    }
}

export const auth = (email,password, isSignUp) =>{
    return dispatch =>{ //this is thnaks to redux-thunk
        dispatch(authStart());
        const authData ={
            email:email,
            password:password,
            returnSecureToken:true //this is a firebase auth pattern !!!THIS IS A MUST!!!
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSrDEqfeHgMD-v69ypz3YtIBSgMnrcp1g';
       
        if(!isSignUp){
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSrDEqfeHgMD-v69ypz3YtIBSgMnrcp1g';
        }
        axios.post(url, authData)
            .then(response =>{
                console.log(response);
                dispatch(checkOutTime());
                dispatch(authSuccess(response.data.idToken,response.data.localId));
            })
            .catch(err =>{
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };   
};