import {
    SET_THEME,
    RESET_THEME
} from '../actions/types';


const themeReducerDefaultState = {
    primaryColor: '#2f2fa2',
    secondaryColor: '#F64C72'
};

const themeReducer = (state = themeReducerDefaultState, action) => {
    switch(action.type) {
        case SET_THEME:
            return { ...state, ...action.payload };
        case RESET_THEME: {
            localStorage.setItem('theme', JSON.stringify(themeReducerDefaultState));
            return { primaryColor: '#2f2fa2', secondaryColor: '#F64C72' };
        }
        default:
            return state;
    }
};

export default themeReducer;