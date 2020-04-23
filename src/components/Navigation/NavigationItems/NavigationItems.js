import React from 'react';
import styles from './NavigationItems.module.css'

const navigationItems = () =>(
    <ul className={styles.NavigationItems}>
        <li className={styles.NavigationItem} onClick={()=>styles.active}><a href="/">Burger Builder</a></li>
        <li className={styles.NavigationItem} onClick={()=>styles.active}><a href="/">Checkout</a></li>
    </ul>
);

export default navigationItems;