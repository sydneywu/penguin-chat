import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
    receiveMessage, registerRoom
} from '../Ducks/chatDuck';

function connect(room) {
    const socket = io('http://localhost:3033', {query: `room=${room}`});
    return new Promise(resolve => {
        socket.on('connect', () => {
            console.log('connected to: ' + room);
            resolve(socket);
        });
    });
}

function subscribe(socket) {
    return eventChannel(emit => {
        socket.on('MESSAGE', (message) => {
            emit(receiveMessage(message));
        });
        return () => {};
    });
}


function* read(socket) {
    const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);
        yield put(action);
    }
}

function* write(socket) {
    while (true) {
        console.log('waiting for message');
        const { payload: {message} } = yield take("SEND_MESSAGE");
        socket.emit('MESSAGE', {content: message, user: "default", time: new Date()});

    }
}

function* handleIO(socket) {
    yield fork(read, socket);
    yield fork(write, socket);
}

export function* chatWatcher() {
    while (true) {
        let { payload } = yield take("CONNECT");
        let {user, room } = payload
        const socket = yield call(connect, room);
        yield put(registerRoom(room))
        const task = yield fork(handleIO, socket);
    }
}
