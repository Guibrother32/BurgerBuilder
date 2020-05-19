import React, { Component, lazy, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import styles from './App.module.css'
// import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Auth from '../src/containers/Auth/Auth';
import withErrorHandler from './hoc/withErrorHandler/withErrrorHandler';
import Logout from '../src/containers/Auth/Logout/Logout';
import Spinner from '../src/components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

/*******************************************LAZY LOADING******************************************/
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('../src/containers/Auth/Auth'));

/*************************************************************************************************/
class App extends Component {

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    /******************************THIS IS GUARDING ROUTES IN REACT *******************************/
    let routes = (
      <Suspense fallback={<Spinner></Spinner>}>
        <Switch>
          <Route path='/login' component={Auth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/'/>
        </Switch>
      </Suspense>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<Spinner></Spinner>}>
          <Switch>
            <Route path='/logout' component={Logout} />
            <Route path='/orders' component={Orders} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/login' component={Auth} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
        </Suspense>
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

