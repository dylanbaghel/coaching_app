import {
    SET_IMAGES, BASE_URL, REMOVE_IMAGE, ADD_IMAGE
} from './types';
import axios from 'axios';


// Async Actions
export const startSetImages = () => dispatch => {
    const url = `${BASE_URL}/upload`;
    return axios.get(url)
        .then(res => {
            dispatch(setImages(res.data.data));
            return Promise.resolve(res.data.data);
        })
        .catch(err => {
            return Promise.reject(err);
        })
};

export const startAddImage = (imageData) => dispatch => {
    const url = `${BASE_URL}/upload`;
    return axios.post(url, imageData, {
        'Conntent-Type': 'multiplart/form-data'
    })
    .then(res => {
        dispatch(addImage(res.data.image));
        console.log(res.data);
    })
    .catch(err => {
        console.log(err.response);
        return Promise.reject(err.response);
    })
};

export const startRemoveImage = (id) => dispatch => {
    const url = `${BASE_URL}/upload/${id}`;
    return axios.delete(url)
        .then(res => {
            dispatch(removeImage(id));
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

// Sync Actions
export const setImages = (imagesData) => {
    return {
        type: SET_IMAGES,
        payload: imagesData
    }
};

export const addImage = (imageData) => {
    return {
        type: ADD_IMAGE,
        payload: {
            image: imageData
        }
    };
};

export const removeImage = (id) => {
    return {
        type: REMOVE_IMAGE,
        payload: {
            id
        }
    };
};