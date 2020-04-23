import React from 'react';
import styles from './Modal.module.css'
import Aux from '../../../hoc/aaux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (

    < Aux >
        <div className={styles.Modal}
            style={{
                transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.showModal ? '1' : '0'
            }}>
            {props.children}
        </div>
        <Backdrop showBackdrop={props.showModal} backdropClick={props.backdropClicked}></Backdrop>
    </Aux >

);

export default modal;