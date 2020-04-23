import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/aaux';

const sideDrawer = (props) => {

    return (
        <Aux>
            <div className={styles.SideDrawer} style={{
                transform: props.sideDrawerDisplay ? 'translateX(0)' : 'translateX(-100vw)',
                opacity: props.sideDrawerDisplay ? '1' : '0'
            }}
            >
                <div className={styles.LogoMobile} >
                    <Logo ></Logo>
                </div>
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
            <Backdrop showBackdrop={props.sideDrawerDisplay} backdropClick={props.backdropClick}></Backdrop>
        </Aux>
    );
};

export default sideDrawer;