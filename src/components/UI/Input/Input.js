import React from 'react';
import styles from './Input.module.css'

const input = (props) => {

    let inputElement = null;

    let inputClasses = [styles.Input];

    if(!props.valid && props.validationReq && props.touched){//MUST BE !VALID AND HAS A VALIDATION REQUIREMENT AND HAS BEEN TOUCHED
        inputClasses.push(styles.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.inputChange}></input>
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.inputChange} ></textarea>
            break;
        case ('select'):
            inputElement = <select className={inputClasses.join(' ')} value={props.value} onChange={props.inputChange} > {props.elementConfig.options.map(op => <option key={op.value} value={op.value}>{op.displayValue}</option>)} </select>
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.inputChange} ></input>
    }

    return (
        <div>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

}

export default input;

//{...props.elementConfig} we can do this because  -- type:'text',placeholder:'37540-000' -- are default html properties