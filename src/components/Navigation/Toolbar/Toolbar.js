import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <button onClick={props.menuBtnClick} className={styles.MenuBtn}>MENU</button>
        <Logo></Logo>
        <nav className={styles.DesktopOnly}>
            <NavigationItems ></NavigationItems>
        </nav>
    </header>
);

export default toolbar;