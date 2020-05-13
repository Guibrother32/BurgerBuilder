import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component{

    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
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
        }
    }

    render(){

        const formElementsArray = [];
        for (const key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
                value: this.state.controls[key].value
            });
        }

        const form = formElementsArray.map(el =>(
            <Input elementType={el.config.elementType} elementConfig={el.config.elementConfig} key={el.id} inputChange={(event) => this.inputChangedHandler(event, el.id)} valid={el.config.valid} validationReq={el.config.validation} touched={el.config.touched} ></Input>
        ));

        return(
            <div>
                <h3>Welcome!</h3>
                <form>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
            </div>
        );
    };
};

export default Auth;