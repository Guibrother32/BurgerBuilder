import React from 'react';
import styles from './Backdrop.module.css';


const backdrop = (props) => (
    props.showBackdrop ? <div className={styles.Backdrop} onClick={props.backdropClick}></div> : null
);

export default backdrop;