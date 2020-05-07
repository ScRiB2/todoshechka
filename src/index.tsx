import * as React from 'react';
import {render} from 'react-dom';
import App from "./pages/index";
import {BrowserRouter, Router} from "react-router-dom";
// @ts-ignore
import {createStore, compose, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
// @ts-ignore
import thunk from 'redux-thunk'
import rootReducer from "./store/index";
import {createBrowserHistory} from 'history'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export const customHistory = createBrowserHistory();

render(
    <Provider store={store}>
        <Router history={customHistory}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app')
);