import {combineReducers} from 'redux'
import {chatReducer} from './Ducks/chatDuck.js'

const rootReducer = combineReducers({
    chatReducer: chatReducer,
});

export default rootReducer