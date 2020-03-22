import { combineReducers } from 'redux';

import authReducer from './authReducer';
import studentReducer from './studentReducer';
import imageReducer from './imageReducer';

export default combineReducers({
    auth: authReducer,
    students: studentReducer,
    images: imageReducer
});