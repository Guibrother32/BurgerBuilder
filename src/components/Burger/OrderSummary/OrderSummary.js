import React from 'react';
import Aux from '../../../hoc/aaux';
import Button from '../../UI/Button/Button';
import styles from './OrderSummary.module.css';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map((igKey, i) => {
        return <li key={igKey + i} className={styles.Li__Receipt}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>:  {props.ingredients[igKey]}</li>;
    });
    //<li>Salad:0</li>
    return (
        <Aux>
            <h3 className={styles.Centered}>Your Order</h3>
            <hr className={styles.Receip__Separator}></hr>
            <p className={styles.Centered}>Your burger ingredients:</p>
            <ul className={styles.Ul__Receipt}>
                {ingredientSummary}
            </ul>
            <hr className={styles.Receip__Separator}></hr>
            <p className={styles.Centered}><strong>Total price: ${props.totalPrice.toFixed(2)}</strong></p>
            <p className={styles.Centered}>Do you want proceed to Checkout?</p>
            <div className={styles.Centered}>
                <Button btnType='Danger' clicked={props.modalNoBtnClicked}>No</Button>
                <Button btnType='Success' clicked={props.modalYesBtnClicked}>Yes</Button>
            </div>
        </Aux>
    );
};

export default orderSummary;
