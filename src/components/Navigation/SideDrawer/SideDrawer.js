import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/aaux';

const sideDrawer = (props) => {
    let showBackdrop = true;

    return (
        <Aux>
            <div className={styles.SideDrawer}>
                <div className={styles.LogoMobile}>
                    <Logo ></Logo>
                </div>
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
            <Backdrop ></Backdrop>
        </Aux>
    );
};

export default sideDrawer;