import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/aaux/aaux';

const sideDrawer = (props) => {

    let attachedClasses = [styles.SideDrawer, styles.Close];
    
    if(props.sideDrawerDisplay){
        attachedClasses = [styles.SideDrawer,styles.Open];
    }

    return (
        <Aux>
            <div className={attachedClasses.join(' ')}>
                <div className={styles.LogoMobile} >
                    <Logo ></Logo>
                </div>
                <nav>
                    <NavigationItems navigationItemClick={props.navigationItemClicked}></NavigationItems>
                </nav>
            </div>
            <Backdrop showBackdrop={props.sideDrawerDisplay} backdropClick={props.backdropClick}></Backdrop>
        </Aux>
    );
};

export default sideDrawer;