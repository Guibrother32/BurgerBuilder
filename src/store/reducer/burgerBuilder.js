import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    meat: 6,
    cheese: 1,
    salad: 2,
    bacon: 3
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            //[action.ingredient]: state.ingredients[action.ingredient] + 1 -> dynamic overwrite a property in a object
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
            }
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:{ //THIS IS THE SIMPLER WAY TO SET THE RIGHT SEQUENCE OF THE INGREDIENTS //when fetching to firebase if you set to fetch all and group inside of ingredients, firebase will set the properties inside of the object ingredients in aphabetical order
                    salad: action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                totalPrice:action.price,
                error:false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            };
        default:
            return state;

    }
}

export default reducer;