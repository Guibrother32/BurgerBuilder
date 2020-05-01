import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{

    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    btnCancelHandler = () =>{
        // this.props.history.goBack();
        this.props.history.push('/');
        
    }
    btnContinueHandler = () =>{
       this.props.history.replace('/checkout/contact-data'); 
    }


    render(){
        return(
            <CheckoutSummary ingredients={this.state.ingredients} btnCancelClicked={this.btnCancelHandler} btnContinueClicked={this.btnContinueHandler}></CheckoutSummary>
        );
    }
}

export default Checkout;