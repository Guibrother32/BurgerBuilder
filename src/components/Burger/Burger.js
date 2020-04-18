import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    const transfIngredients = Object.keys(props.ingredients).map(igKey =>{
        console.log(igKey);
        return [...Array(props.ingredients[igKey])].map((_, i)=>{
            console.log(props.ingredients[igKey]);
            console.log(igKey + i);
            
            return <BurgerIngredient  key={igKey + i} type={igKey}></BurgerIngredient>
        });
    });

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transfIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
}

export default burger;