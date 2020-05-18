import React, { Component } from 'react';
import Aux from '../aaux/aaux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';

class Layout extends Component {

    state={
        showSideDrawer:false
    }

    // showSideDrawerHandler = () =>{
    //     this.setState({showSideDrawer:!this.state.showSideDrawer})
    // }

    showSideDrawerHandler = () =>{
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    } //this is the cleaner method to setState when youre accessing an old state***

    render() {
        return (
            <Aux>
                <SideDrawer isAuth={this.props.isAuthenticated} backdropClick={this.showSideDrawerHandler} sideDrawerDisplay={this.state.showSideDrawer} navigationItemClicked={this.showSideDrawerHandler}></SideDrawer>
                <Toolbar isAuth={this.props.isAuthenticated} menuBtnClick={this.showSideDrawerHandler}></Toolbar>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>);
    };
};

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.authR.token !== null
    }
}

export default connect(mapStateToProps)(Layout);