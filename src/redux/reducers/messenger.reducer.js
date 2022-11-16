import { combineReducers } from "redux";

const usernames = (state = [], action) => {
    switch(action.type) {
        case 'SET_USERNAMES': return [...state, action.payload];
        default: return state;
    }
}

const rooms = (state = [], action) => {
    switch(action.type) {
        case 'SET_ROOMS': return action.payload;
        default: return state;
    }
}

const history = (state = [], action) => {
    switch(action.type) {
        case 'SET_HISTORY': return action.payload;
        default: return state;
    }
}

export default combineReducers({
    usernames,
    rooms,
    history,
})