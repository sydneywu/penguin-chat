import { all } from "redux-saga/effects";
import {chatWatcher} from "./chatSaga"

export default function* rootSaga() {
    yield all([
        chatWatcher()
    ])
}