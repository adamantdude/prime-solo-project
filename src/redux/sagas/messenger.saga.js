import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* messengerSaga() {
    yield takeLatest('FETCH_ROOMS', fetchRooms);
    yield takeLatest('JOIN_ROOM', joinRoom);
    yield takeLatest('FETCH_LIST_OF_NAMES', fetchListOfNames);
}

// Get rooms upon app load to be displayed
// Rooms are hard-coded
function* fetchRooms() {
    const response = yield axios.get('/api/messenger');

    yield put({ type: 'SET_ROOMS', payload: response.data });
}

function* joinRoom(action) {
    yield put({ type: 'SET_CHAT_ROOM', payload: action.payload })
}

function* fetchListOfNames(action) {
    yield put({ type: 'SET_LIST_OF_NAMES', payload: action.payload });
}

export default messengerSaga;