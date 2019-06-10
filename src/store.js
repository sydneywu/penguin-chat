import {reducer} from './reducers'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./redux/sagas/rootSagas";
import rootReducer from "./redux/rootReducer";
import {watcherSaga} from "./redux/sagas/rootSagas.js";
import { createStore, applyMiddleware, compose } from "redux";

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;