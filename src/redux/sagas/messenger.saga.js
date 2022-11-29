import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* messengerSaga() {
    yield takeLatest('FETCH_ROOMS', fetchRooms);
    yield takeLatest('JOIN_ROOM', joinRoom);
    yield takeLatest('FETCH_LIST_OF_NAMES', fetchListOfNames);
    yield takeLatest('FETCH_CHAT_HISTORY', fetchChatHistory);
    yield takeLatest('ADD_TO_HISTORY', addToHistory);
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

function* fetchChatHistory(action) {
    try {
        let res = yield axios.get(`/api/history/${action.payload}`);

        yield put({ type: 'SET_CHAT_HISTORY', payload: res.data });
    } catch (err) {
        console.log(err);
    }
}

function* addToHistory(action) {
    console.log('IN ADDTOHISTORY : ', action.payload);
    try {
        yield axios.post('/api/history', action.payload);

        yield put({ type: 'FETCH_CHAT_HISTORY', payload: action.payload.location_id })
    } catch (err) {
        console.log(err);
    }
}

export default messengerSaga;