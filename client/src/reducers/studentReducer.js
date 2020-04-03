import {
    SET_STUDENTS, SET_CURRENT_STUDENT
} from '../actions/types';

const studentReducerDefaultState = {
    currentStudent: null
};

const studentReducer = (state = studentReducerDefaultState, action) => {
    switch(action.type) {
        case SET_STUDENTS:
            return {...state, ...action.payload};
        case SET_CURRENT_STUDENT:
            return { ...state , currentStudent: action.payload.student }
        default:
            return state;
    }
};

export default studentReducer;