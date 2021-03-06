import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div onClick={props.menuBtnClick} className={styles.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <Logo></Logo>
        <nav className={styles.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
        </nav>
    </header>
);

export default toolbar;