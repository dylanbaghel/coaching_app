import {
    SET_THEME,
    RESET_THEME
} from './types';

export const setTheme = (themeObj = {}) => {
    return {
        type: SET_THEME,
        payload: themeObj
    }
};

export const resetTheme = () => {
    return {
        type: RESET_THEME
    };
};