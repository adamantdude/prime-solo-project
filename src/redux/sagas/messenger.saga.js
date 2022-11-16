import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* messengerSaga() {
    yield takeLatest('ADD_TO_HISTORY', addHistory);
    yield takeLatest('FETCH_HISTORY', fetchHistory);
    yield takeLatest('FETCH_ROOMS', fetchRooms);
}

function* addHistory(action) {
    yield axios.post('/api/messenger', action.payload);

    put({ type: 'FETCH_HISTORY' });
}

// When a user connects to a room, get that room's history
function* fetchHistory(action) {
    const response = yield axios.get(`/api/messenger/${action.payload}`);

    put({ type: 'SET_HISTORY', payload: response.data });
}

// Get rooms upon app load to be displayed
// Rooms are hard-coded
function* fetchRooms() {
    const response = yield axios.get('/api/rooms');

    put({ type: 'SET_ROOMS', payload: response.data });
}

// Everytime a user connects, get their information via ID
// to be displayed in the room
function* fetchUser(action) {
    const response = yield axios.get(`/api/userbase/${action.payload}`);

    put({ type: 'SET_USERNAMES', payload: response.data });
}

export default messengerSaga;