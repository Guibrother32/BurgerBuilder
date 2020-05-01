import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';

const burger = (props) => {
    let transfIngredients = Object.keys(props.ingredients).map(igKey =>{//meat,salad,bacon,cheese
        console.log('[igKey] = ' +igKey);

        return [...Array(props.ingredients[igKey])].map((_, i)=>{//ex ...Array[1] -> Array[ _ ]
            console.log('[props.ingredients[igKey]] = ' +props.ingredients[igKey]);
            
            return <BurgerIngredient  key={igKey + i} type={igKey}></BurgerIngredient>
        });
    }).reduce((arr,el)=>{ //this is for the if statement transfIngredients.length === 0 // [ , , , ] => []
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

export default withRouter(burger);