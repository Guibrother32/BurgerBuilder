import React, { Component } from 'react';
import Aux from '../../hoc/aaux';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state={
        showSideDrawer:false
    }

    showSideDrawerHandler = () =>{
        this.setState({showSideDrawer:!this.state.showSideDrawer})
    }

    render() {
        return (
            <Aux>
                <SideDrawer backdropClick={this.showSideDrawerHandler} sideDrawerDisplay={this.state.showSideDrawer}></SideDrawer>
                <Toolbar menuBtnClick={this.showSideDrawerHandler}></Toolbar>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>);
    };
};

export default Layout;