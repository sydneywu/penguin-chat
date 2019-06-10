const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
const SET_USER = "SET_USER"
const REGISTER_ROOM = "REGISTER_ROOM"

const initialState = {
    user: "default",
    messages: [],
    error: "",
    connectedRoom: "",
};

export const receiveMessage = (message)=>({type: RECEIVE_MESSAGE, payload: {message}})
export const setUser = (user)=>({type: SET_USER, payload: {user}})

export const registerRoom = (room)=>{
    console.log("action sent", room)
    return ({type: REGISTER_ROOM, payload: {room}})
}

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_MESSAGE:
            let clonedMessages = [].concat(state.messages);
            clonedMessages.push(action.payload.message);
            return {...state, messages: clonedMessages};

        case SET_USER:
            return {...state, user: action.payload.user};

        case REGISTER_ROOM:
            console.log("reducer", action.payload)
            return {...state, connectedRoom: action.payload.room};

        default:
            return state;
    }
}
