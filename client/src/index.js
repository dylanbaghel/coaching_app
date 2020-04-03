import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import jwt_decode from 'jwt-decode';

import configureStore from './store/store';
import setAuthToken from './utils/setAuthToken';

import { setUser, removeUser } from './actions/authActions';
import { setTheme } from './actions/themeActions';

const store = configureStore();
const token = localStorage.getItem('toka');
const theme = localStorage.getItem('theme');


if (theme) {
    store.dispatch(setTheme(JSON.parse(theme)));
}

if (token) {
    const decoded = jwt_decode(token);
    setAuthToken(token);
    store.dispatch(setUser({
        id: decoded._id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
    }));
} else {
    setAuthToken(null);
    store.dispatch(removeUser());
}


const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);
ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
