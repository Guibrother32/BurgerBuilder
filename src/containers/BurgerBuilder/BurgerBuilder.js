import React, { Component } from 'react';
import Aux from '../../hoc/aaux/aaux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrrorHandler';

import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

// const INGREDIENT_PRICES = {
//     meat: 6,
//     cheese: 1,
//     salad: 2,
//     bacon: 3
// }

export class BurgerBuilder extends Component {

    //this is also possible
    // constructor(props){
    //     super(props);
    //     this.state = { }
    // }

    state = {
        purchasable: false,
        onBtnOrderNowClick: false,
        // loading: false,
        // error: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum;
    }

    // addIngredientHandler = (type) => {
    //     let currentCount = this.props.ingredients[type];
    //     const currentIngredients = { ...this.props.ingredients }
    //     currentIngredients[type] = currentCount + 1;
    //     this.props.onAddIngredient(currentIngredients[type]);
    //     this.updatePurchasable(currentIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     let currentAmout = this.state.ingredients[type];
    //     const ingredientsUpdate = { ...this.state.ingredients };
    //     if (ingredientsUpdate[type] > 0) {
    //         ingredientsUpdate[type] = currentAmout - 1;
    //     }
    //     this.setState({ totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type], ingredients: ingredientsUpdate });
    //     this.updatePurchasable(ingredientsUpdate);
    // }

    purchaseHandler = () => {
        if (!this.props.isAuth) { //NOT AUTHENTICATED
            this.props.onSetRedirectPath('/checkout');//we dont need to check if theres anything in the burger because the button only becomes available after adding something
            this.props.history.push('/login');
            //     //return this.variableRedirect=<Redirect to="/login"/>
        } else {
            this.setState({ onBtnOrderNowClick: true }); //shows the modal  
        }
    }
    purchaseCancelHandler = () => {
        this.setState({ onBtnOrderNowClick: false });
    }
    purchaseContinue = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        // alert('Thank you! \nTotal: $' + this.state.totalPrice);
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice, //In production price should be handled on the serverside
        //     customer: {
        //         name: 'Guilherme Costa',
        //         address: {
        //             street: 'Av das Flores',
        //             zipCode: '37540-000',
        //             country: 'Brazil'
        //         },
        //         email: 'gui@live.com'
        //     },
        //     deliveryMethod: 'Fastest'
        // };
        // axios.post('/orders.json', order).then(response => {//.json is firebase thing
        //     this.setState({ loading: false, onBtnOrderNowClick: false });

        // }).catch(error => {
        //     this.setState({ loading: false, onBtnOrderNowClick: false , error:true });
        //     this.props.err(true, error.message);
        // });


        //***************************************QUERY PARAMS**************************************** */

        // const queryParams = [];
        // for (const ing in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing])); //[salad=1,bacon=2,meat=3,cheese=2]
        // }//we use encode to encode string in URL, for example Rock&Roll -> Rock%26Roll

        //const priceInQueryParam = ['price=' , this.state.totalPrice]; //temporary
        // queryParams.push('price=' + this.props.totalPrice);//temporary

        // const queryParamsString = queryParams.join('&'); //bacon=1&cheese=1&meat=2&salad=2
        // this.props.history.push({ pathname: '/checkout', search: '?' + queryParamsString });

        //******************************************************************************************** */
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        let orderSummary = null;

        let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded</p> : <Spinner></Spinner>;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}></Burger>
                    <BuildControls isAuthenticated={this.props.isAuth} ingredients={this.props.ingredients} ingredientAdded={this.props.onAddIngredient} ingredientRemoved={this.props.onDeleteIngredient} disabled={disabledInfo} price={this.props.totalPrice} purchasable={this.updatePurchasable(this.props.ingredients)} orderHandler={this.purchaseHandler}></BuildControls>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ingredients} modalNoBtnClicked={this.purchaseCancelHandler} modalYesBtnClicked={this.purchaseContinue} totalPrice={this.props.totalPrice}></OrderSummary>;

        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner></Spinner>;
        // }
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderR.ingredients,
        totalPrice: state.burgerBuilderR.totalPrice,
        error: state.burgerBuilderR.error,
        isAuth: state.authR.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ing) => dispatch(actions.addIngredient(ing)),
        onDeleteIngredient: (ing) => dispatch(actions.removeIngredient(ing)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder));