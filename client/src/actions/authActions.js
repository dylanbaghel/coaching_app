import {
    BASE_URL,
    SET_USER,
    REMOVE_USER
} from './types';

import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';

// Async Action Generators
export const startLogin = (email, password) => dispatch => {
    return axios.post(`${BASE_URL}/admin/login`, { email, password })
        .then(res => {
            const { token } = res.data.data;
            localStorage.setItem('toka', token);
            setAuthToken(token);
            const user = {
                id: res.data.data.user._id,
                name: res.data.data.user.name,
                email: res.data.data.user.email,
                role: res.data.data.user.role
            };
            dispatch(setUser(user));
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        });
}

// Sync Action Generators
export const startLogout = () => dispatch => {
    localStorage.removeItem('toka');
    setAuthToken(null);
    dispatch(removeUser());
};
export const setUser = (userData) => {
    return {
        type: SET_USER,
        payload: userData
    };
};

export const removeUser = () => {
    return  { type: REMOVE_USER };
};