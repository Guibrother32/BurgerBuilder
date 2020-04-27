import React, { Component } from 'react';
import styles from './Modal.module.css'
import Aux from '../../../hoc/aaux/aaux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children;
    }

    componentDidUpdate() {
        console.log('[Modal] - Did Update');
    }

    render() {
        return (
            <Aux >
                <div className={styles.Modal}
                    style={{
                        transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.showModal ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
                <Backdrop showBackdrop={this.props.showModal} backdropClick={this.props.backdropClicked}></Backdrop>
            </Aux >
        );
    }
};

export default Modal;