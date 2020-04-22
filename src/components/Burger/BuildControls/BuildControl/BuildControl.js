import React from 'react';
import style from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={style.BuildControl}>
        <div className={style.Label}>{props.label}</div>
        <button className={style.Less} onClick={props.lessClicked} disabled={props.disabled}>Less</button>
        <button className={style.More} onClick={props.moreClicked}>More</button>
    </div>
);

export default buildControl;