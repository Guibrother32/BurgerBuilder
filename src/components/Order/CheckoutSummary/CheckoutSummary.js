import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {

    return (
        <div className={styles.CheckoutSummary}>
            <h1>Your final order:</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button btnType='Danger' clicked={props.btnCancelClicked}>CANCEL</Button>
            <Button btnType='Success' clicked={props.btnContinueClicked}>CONTINUE</Button>
        </div>

    );
}

export default CheckoutSummary;