import {
    SET_USER,
    REMOVE_USER
} from '../actions/types';

const authReducerDefaultState = {
    id: null,
    name: null,
    email: null,
    role: null
};

const authReducer = (state = authReducerDefaultState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...action.payload
            }
        case REMOVE_USER:
            return {
                id: null,
                name: null,
                email: null,
                role: null
            }
        default:
            return state;
    }
}

export default authReducer;