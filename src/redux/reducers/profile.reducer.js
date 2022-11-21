import { combineReducers } from "redux";

const character = (state = {
    full_name: '',
    level: 0,
    exp: 0,
    history: '',
}, action) => {
    switch(action.type) {
        case 'SET_CHARACTER':
            return {...state, ...action.payload};
        default:
            return state;
    }
}



export default character