import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* profileSaga() {
    yield takeLatest('FETCH_CHARACTER', fetchCharacter);
    yield takeLatest('UPDATE_HISTORY', updateHistory);
}

function* fetchCharacter() {
    try {
        // console.log('in FETCH CHARACTER');
        const response = yield axios.get('/api/userbase');
        // console.log(response.data);
        yield put({ type: 'SET_CHARACTER', payload: response.data });
    } catch (err) {
        console.log(err);
    }
}

function* updateHistory(action) {
    try {
        yield axios.post('/api/userbase', { history: action.payload.history, char_id: action.payload.char_id });

        yield put({ type:'FETCH_CHARACTER' });
    } catch (err) {
        console.log(err);
    }
}

export default profileSaga;