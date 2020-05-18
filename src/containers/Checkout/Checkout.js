import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

// import * as orderAction from '../../store/actions/order';
class Checkout extends Component {

    // state = {
    //     ingredients: {
    //         salad: 1,
    //         meat: 1,
    //         cheese: 1,
    //         bacon: 1
    //     },
    //     totalPrice:0
    // }

    // componentDidMount() {

        // this.props.onInitPurchase();

        // let ingredientsSeq = this.props.location.search.split('=')[1]; //2344
        // ingredientsSeq = ingredientsSeq.split(''); // [2,3,4,4]
        // // for (let index = 0; index < ingredientsSeq.length; index++) {
        // //     this.setState({salad:0});

        // // }
        // const ingredients = [...Object.keys(this.state.ingredients)];
        // for(let ing in ingredients.keys()){
        //     this.setState({ing:ingredientsSeq[ing]});
        // }
        // console.log(this.state.ingredients);


        //**************************************EXTRACTING QUERY PARAMS**************************************

        // let query = new URLSearchParams(this.props.location.search);

        // const ingredients = {}
        // let price = 0;
        // for (const param of query.entries()) { //entries give you a value pair ['salad',2]
        //     if (param[0] === 'price') {
        //         price=param[1];
        //     } else {
        //         ingredients[param[0]] = +param[1];
        //     }
        // }
        // this.setState({totalPrice: price});
        // this.setState({ingredients: ingredients});
        // console.log(this.state.totalPrice);
    // }

    btnCancelHandler = () => {
        // this.props.history.goBack();
        this.props.history.push('/');

    }
    btnContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {

        let summary = <Redirect to='/'/> //IF THERES NOTHING JUST REDIRECT TO THE HOME
        
        if (this.props.ingredients) { 
            let purchasedRedirect = null;
            if(this.props.purchased){
                purchasedRedirect = <Redirect to='/'/>
            }
            summary = (   
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingredients} btnCancelClicked={this.btnCancelHandler} btnContinueClicked={this.btnContinueHandler}></CheckoutSummary>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}></Route>
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderR.ingredients,
        purchased: state.orderR.purchased
    };
};

// const mapDispatchToProps = dispatch =>{
//     return{
//         onInitPurchase: () => dispatch(orderAction.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);