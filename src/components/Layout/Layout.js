import React from 'react';
import Aux from '../../hoc/aaux';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    <Aux>
        <SideDrawer></SideDrawer>
        <Toolbar></Toolbar>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;