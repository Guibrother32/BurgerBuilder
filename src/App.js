import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import styles from './App.module.css'
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from '../src/containers/Auth/Auth';
import withErrorHandler from './hoc/withErrorHandler/withErrrorHandler';
import Logout from '../src/containers/Auth/Logout/Logout';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

//implement lazy loading 216

class App extends Component {

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    /******************************THIS IS GUARDING ROUTES IN REACT *******************************/
    let routes = (
      <Switch>
        <Route path='/login' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/logout' component={Logout} />
          <Route path='/orders' component={Orders} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/login' component={Auth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }
    /*************************************************************************************************/
    return (
      <div className={styles.BodyFrame}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authR.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => dispatch(actions.authCheckState())
  }
}
//withRouter wrap in this case is used if your app crashes using connect with Route in it, as we use here in app.js, although it was running normaly before. Notice that withRouter is used on the component that needs the react-router-dom props
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(App)));

