import React, { Component } from 'react';
import Aux from '../../hoc/aaux/aaux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrrorHandler';


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
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        onBtnOrderNowClick: false,
        loading: false,
        error:false
    }

    componentDidMount() {
        axios.get('/Ingredients.json').then(response => {
            this.setState({ ingredients: response.data });
        }).catch(error =>{
            this.setState({ error: true });
            this.props.err(true, error.message); //? -> reply: this is a props access passing arguments that will be accepted on its value where it have been called
          });
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

    purchaseHandler = () => {
        this.setState({ onBtnOrderNowClick: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ onBtnOrderNowClick: false });
    }
    purchaseContinue = () => {
        // alert('Thank you! \nTotal: $' + this.state.totalPrice);
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, //In production price should be handled on the serverside
            customer: {
                name: 'Guilherme Costa',
                address: {
                    street: 'Av das Flores',
                    zipCode: '37540-000',
                    country: 'Brazil'
                },
                email: 'gui@live.com'
            },
            deliveryMethod: 'Fastest'
        };
        axios.post('/orders.json', order).then(response => {//.json is firebase thing
            this.setState({ loading: false, onBtnOrderNowClick: false });

        }).catch(error => {
            this.setState({ loading: false, onBtnOrderNowClick: false , error:true });
            this.props.err(true, error.message);
        });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        let orderSummary = null;

        let burger = this.state.error? <p style={{textAlign:'center'}}>Ingredients can't be loaded</p> : <Spinner></Spinner>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls ingredients={this.state.ingredients} ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable} orderHandler={this.purchaseHandler}></BuildControls>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients} modalNoBtnClicked={this.purchaseCancelHandler} modalYesBtnClicked={this.purchaseContinue} totalPrice={this.state.totalPrice}></OrderSummary>;

        }
        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>;
        }
        return (
            <Aux>
                <Modal showModal={this.state.onBtnOrderNowClick} backdropClicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder);