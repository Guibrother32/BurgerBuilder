import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
// import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrrorHandler';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Bill Waiden'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '4th Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '37540-000'
                },
                value: '',
                validation: {
                    required: true,
                    correctLength: 5,
                    isNumeric:true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Brazil'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'burger@builder.com'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        // alert('Thank you! \nTotal: $' + this.state.totalPrice);
        event.preventDefault();
        // this.setState({ loading: true });
        const formUserData = {}
        for (let key in this.state.orderForm) {
            formUserData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice, //In production price should be handled on the serverside
            orderData: formUserData
        };

        this.props.onOrderBurger(order,this.props.token);
        // axios.post('/orders.json', order).then(response => {//.json is firebase thing
        //     this.setState({ loading: false });
        //     this.props.history.push('/');
        // }).catch(error => {
        //     this.setState({ loading: false, error: true });
        //     this.props.err(true, error.message);
        // });
    }


    validationHandler = (value, validation) => {
        let isValid = false;

        if (validation.required) {
            isValid = (value.trim() !== '');
        } else { //this is for the selector which doesnt require a required property
            isValid = true;
        }

        if (validation.correctLength) {
            isValid = (+value.length === 5) && isValid;
        }
        if(validation.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //email regex
            isValid = pattern.test(value) && isValid;
        }
        if(validation.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, elementIdentifier) => {
        const updatedOrderForm = { //name street zipcode ..  are all spreaded
            ...this.state.orderForm
        }
        const updatedOrderFormInnerObjs = { //we need this line because the spread operation doesnt spread the inner objects of the objects
            ...updatedOrderForm[elementIdentifier]
        }
        updatedOrderFormInnerObjs.value = event.target.value;

        updatedOrderFormInnerObjs.valid = this.validationHandler(updatedOrderFormInnerObjs.value, updatedOrderFormInnerObjs.validation);
        updatedOrderFormInnerObjs.touched = true;

        updatedOrderForm[elementIdentifier] = updatedOrderFormInnerObjs;

        let formIsValid = true;

        for (let key in updatedOrderForm) {
            // if (!key.valid && key.validation) {
            //     formIsValid = false;
            // }

            formIsValid = updatedOrderForm[key].valid && formIsValid;
            

        }

        console.log(formIsValid);

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
        console.log(updatedOrderForm[elementIdentifier]);

    }

    render() {

        const formElementsArray = [];
        for (const key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
                value: this.state.orderForm[key].value
            });
        }

        let form = (
            <div>
                <h3>Enter your Contact Data</h3>
                <form onSubmit={this.orderHandler}>

                    {/*THIS IS AN ALTERNATIVE TO DYNAMIC OUTPUTING THE INPUT*/}
                    {formElementsArray.map(el => {
                        return (
                            <Input elementType={el.config.elementType} elementConfig={el.config.elementConfig} key={el.id} inputChange={(event) => this.inputChangedHandler(event, el.id)} valid={el.config.valid} validationReq={el.config.validation} touched={el.config.touched}></Input>
                        );
                    })}

                    <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER NOW!</Button>
                </form>
            </div>

        );

        if (this.props.loading) {
            form = <Spinner></Spinner>;
        }

        return (
            <div className={styles.ContactData}>
                {form}
            </div>
        );
    }


}

const mapStateToProps = state =>{
    return{
        ingredients: state.burgerBuilderR.ingredients,
        totalPrice: state.burgerBuilderR.totalPrice,
        loading: state.orderR.loading,
        token: state.authR.token
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withErrorHandler(ContactData))); //we wrap withRoute here because we need to access props in this.props.history.push