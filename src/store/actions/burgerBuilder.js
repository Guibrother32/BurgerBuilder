import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (ing) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ing
    }
};

export const removeIngredient = (ing) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ing
    }
};

export const setIngredients = (ings) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ings,
        price:4
    };
};

export const initIngredients = () => {
    return dispatch => { //available due to redux thunk
        axios.get('/Ingredients.json').then(response => {
            // this.setState({ ingredients: response.data });
            dispatch(setIngredients(response.data));
        }).catch(error => {
           dispatch(fetchIngredientsFailed());
        });
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};