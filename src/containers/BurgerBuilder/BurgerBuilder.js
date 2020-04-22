import React, { Component } from 'react';
import Aux from '../../hoc/aaux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
    meat: 6,
    cheese: 1,
    salad: 2,
    bacon: 3
}

class BurgerBuilder extends Component {

    //this is also possible
    // constructor(props){
    //     super(props);
    //     this.state = { }
    // }

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 0,
        purchasable: false
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        let currentCount = this.state.ingredients[type];
        const currentIngredients = { ...this.state.ingredients }
        currentIngredients[type] = currentCount + 1;
        this.setState({ totalPrice: (this.state.totalPrice + INGREDIENT_PRICES[type]), ingredients: currentIngredients });
        this.updatePurchasable(currentIngredients);
    }

    removeIngredientHandler = (type) => {
        let currentAmout = this.state.ingredients[type];
        const ingredientsUpdate = { ...this.state.ingredients };
        if (ingredientsUpdate[type] > 0) {
            ingredientsUpdate[type] = currentAmout - 1;
        }
        this.setState({ totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type], ingredients: ingredientsUpdate });
        this.updatePurchasable(ingredientsUpdate);
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls ingredients={this.state.ingredients} ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable}></BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder