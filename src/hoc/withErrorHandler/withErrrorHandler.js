import React, { Component } from 'react';
import Aux from '../aaux/aaux';
import Modal from '../../components/UI/Modal/Modal';

//we are creating this file with a low cap in the first letter because we're using as a hoc wrapping it


const withErrorHandler = (WrappedComponent) => {
    return class extends Component { //anonimous class

        state = {
            error: null,
            msg: null
        }

        // constructor(props){
        //     super(props);
        //     axios.interceptors.request.use(req =>{
        //         this.state.error='null'; //whenever a new req goes on, you dont have de prev error message anymore
        //         return req; //we need to foward the req to the burgerbuilder for example
        //     })
        //     axios.interceptors.response.use(res=>res,err =>{ //res=>res just foward the response
        //         this.state.error=err; //we could set to error.message directly and we would not need the if statement in the curlybraces dynamic output 
        //     });
        // }


        updateWrapperState = (e, msg) => {
            this.setState({ error:e, msg:msg });
        };


        errorConfirmedHandler = () => { //obs. listener of a backdrop click
            this.setState({ error: null });
        }


        render() {
            return (
                <Aux>
                    <Modal showModal={this.state.error} backdropClicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.msg : null}
                    </Modal>
                    <WrappedComponent {...this.props} err={this.updateWrapperState}></WrappedComponent>
                </Aux>
            );
            //<WrappedComponent.. we will return the wrapped component and distribuilt any props that it may have
        }
    }
}

export default withErrorHandler;  