import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const buildControls = (props) => (

    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {Object.keys(props.ingredients).map((ig,i) =>{
            return <BuildControl key={ig+i} label={ig} moreClicked={() => props.ingredientAdded(ig)} lessClicked={()=>props.ingredientRemoved(ig)} disabled={props.disabled[ig]}></BuildControl>
        })}
        <button className={styles.OrderButton} disabled={!props.purchasable}>ORDER NOW!</button>
    </div>

);

export default buildControls;


//*********************************************************************************************** */


// const controls = [
//     {label:'Meat'},
//     {label:'Cheese'},
//     {label:'Salad'},
//     {label:'Bacon'}
// ];

// const controls = [
//     {label:'Meat'},
//     {label:'Cheese'},
//     {label:'Salad'},
//     {label:'Bacon'}
// ];

// const buildControls = (props) => (

//     <div className={styles.BuildControls}>
//         {controls.map(ctrl =>{
//             return <BuildControl label={ctrl.label}></BuildControl>
//         })}
        
//     </div>


// );