import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import styles from './App.module.css'
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from '../src/containers/Auth/Auth';

function App() {
  return (
    <div className={styles.BodyFrame}>

      <Layout>

        <Switch>
        <Route path='/login' component={Auth}/>
          <Route path='/orders' component={Orders}></Route>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>



      </Layout>

    </div>
  );
}

export default App;
