import { SET_IMAGES, REMOVE_IMAGE, ADD_IMAGE } from '../actions/types';

const imageReducerDefaultState = {
    data: []
};

const imageReducer = (state = imageReducerDefaultState, action) => {
    switch(action.type) {
        case SET_IMAGES:
            return {
                ...state,
                data: action.payload
            }
        case ADD_IMAGE:
            return {
                ...state,
                data: [
                    ...state.data,
                    action.payload.image
                ]
            }
        case REMOVE_IMAGE:
            return {
                ...state,
                data: state.data.filter(image => image._id !== action.payload.id)
            };
        default:
            return state;
    };
};

export default imageReducer;