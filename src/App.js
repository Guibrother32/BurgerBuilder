import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.BodyFrame}>
      <Layout>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
    </div>
  );
}

export default App;
