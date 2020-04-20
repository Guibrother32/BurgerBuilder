import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    let transfIngredients = Object.keys(props.ingredients).map(igKey =>{
        console.log('[igKey] = ' +igKey);
        console.log('[Array(x)] = '+ props.ingredients[igKey]);
        console.log('[Array(xx)] = ' +props.ingredients.igKey);
        return [...Array(props.ingredients[igKey])].map((_, i)=>{
            console.log('[props.ingredients[igKey]] = ' +props.ingredients[igKey]);
            console.log(igKey + i);
            
            return <BurgerIngredient  key={igKey + i} type={igKey}></BurgerIngredient>
        });
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]); // transfIngredients = [obj, obj],[obj,obj], , , => transfIngredients = [obj, obj], [obj,obj]
    console.log('[transfIngredients] = ' + transfIngredients);

    if(transfIngredients.length === 0){
        transfIngredients = <p>Start adding ingredients!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transfIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
}

export default burger;