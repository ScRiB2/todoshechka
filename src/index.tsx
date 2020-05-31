import * as React from 'react';
import {render} from 'react-dom';
import App from "./pages/index";
import {BrowserRouter} from "react-router-dom";
// @ts-ignore
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
// @ts-ignore
import thunk from 'redux-thunk'
import rootReducer from "./store/index";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export const getDispatch = () => store.dispatch;

render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);