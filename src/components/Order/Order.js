import React from 'react';
import styles from './Order.module.css';

const order = (props) => {

    const ingredients = [];
    for (let ingName in props.orderIng) {
        ingredients.push({ name: ingName, amount: props.orderIng[ingName] });
    }


    // let ingredients = null;
    // this.props.orderIng.map(ig => {
    //     return ingredients.push(ig);
    // });

    
    const ingredientOutput = ingredients.map(ing => {
        return <span style={{textTransform:'capitalize', display:'inline-block', border:'1px solid #ccc', padding:'5px', margin:'0 5px'}} key={ing.name}>{ing.name} ({ing.amount})</span>;
    })

    return (
        <div className={styles.Order}>
            <p>Ingredients: </p>
            <p>{ingredientOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.orderPrice).toFixed(2)}</strong> </p>
        </div>
    );

}

export default order;

//Number.parseFloat PARSE A STRING TO A NUMBER TYPE  // toFixed(2) FIXES IN 2 DECIMAL PLACES