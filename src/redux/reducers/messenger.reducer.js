import { combineReducers } from "redux";

const rooms = (state = [], action) => {
    switch(action.type) {
        case 'SET_ROOMS': return action.payload;
        default: return state;
    }
}

const currentRoom = (state = {}, action) => {
    switch(action.type) {
        case 'SET_CHAT_ROOM': return action.payload;
        default: return state;
    }
}

const usersInRoom = (state = [], action) => {
    switch(action.type) {
        case 'SET_LIST_OF_NAMES': return action.payload;
        default: return state;
    }
}

const chatHistory = (state = [], action) => {
    switch(action.type) {
        case 'SET_CHAT_HISTORY': return action.payload;
        default: return state;
    }
}

export default combineReducers({
    rooms,
    currentRoom,
    usersInRoom,
    chatHistory,
})