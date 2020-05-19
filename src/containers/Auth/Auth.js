import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import styles from './Auth.module.css';

import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';

import {Redirect} from 'react-router-dom';

import {validationHandler} from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger){
            this.props.onSetAuthRedirectPath();
        }
    }


    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: { //remember in this synthax we are reaching each property of controls to edit it thats why we are wrapping with []
                ...this.state.controls[controlName],
                value: event.target.value, //change the value
                valid: validationHandler(event.target.value, this.state.controls[controlName].validation), //check the validity
                touched: true //set touched
            }
        }
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault(); //this is to prevent reload. As this is a form default behaviour
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchSignHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        });
    }

    render() {

        const formElementsArray = [];
        for (const key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
                value: this.state.controls[key].value
            });
        }

        let form = formElementsArray.map(el => (
            <Input elementType={el.config.elementType} elementConfig={el.config.elementConfig} key={el.id} inputChange={(event) => this.inputChangedHandler(event, el.id)} valid={el.config.valid} validationReq={el.config.validation} touched={el.config.touched} ></Input>
        ));

        let switchOptions = (
            <div>
                <h4>Have you already sign up?</h4>
                <Button btnType='Danger' clicked={this.switchSignHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )

        if (!this.state.isSignUp) {
            switchOptions = (
                <div>
                    <h4>Are you not Sign In?</h4>
                    <Button btnType='Danger' clicked={this.switchSignHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
                </div>
            )
        }

        if(this.props.loading){
            form = <Spinner></Spinner>;
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p className={styles.form__ErrorMessage}>{this.props.error.message}</p>
            )
        }
        let redirectVariable = null;
        if(this.props.isAuthenticated){
            redirectVariable = <Redirect to={this.props.authRedirecPath}/>;
        }
        return (
            <div className={styles.AuthData}>
                {redirectVariable}
                <h3>{this.state.isSignUp ? "Welcome!" : "Welcome back!"}</h3>
                <form onSubmit={this.submitHandler}>
                    <div className={styles.form__authInputDiv}>
                        {form}
                        {errorMessage}
                    </div>
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                {switchOptions}
            </div>
        );
    };
};


const mapStateToProps = state =>{
    return{
        loading: state.authR.loading,
        error: state.authR.error,
        isAuthenticated: state.authR.token !== null,
        authRedirecPath: state.authR.authRedirectPath,
        buildingBurger: state.burgerBuilderR.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);