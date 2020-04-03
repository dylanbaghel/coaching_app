import { combineReducers } from 'redux';

import authReducer from './authReducer';
import studentReducer from './studentReducer';
import imageReducer from './imageReducer';
import themeReducer from './themeReducer';

export default combineReducers({
    auth: authReducer,
    students: studentReducer,
    images: imageReducer,
    theme: themeReducer
});