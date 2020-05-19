import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';


import { createStore, combineReducers, applyMiddleware, compose } from 'redux'; 
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';
import thunk from 'redux-thunk'; //thunk is to be abble to interrupt the middleware

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; //middleware and devtools are types of enhancer //second part is to prevent people to use redux dev tools in your project and so hide the properties from them // to find config.js Check for the config folder under node_modules/react-scripts/config

const rootReducer = combineReducers({
  authR:authReducer,
  burgerBuilderR: burgerBuilderReducer,
  orderR: orderReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
