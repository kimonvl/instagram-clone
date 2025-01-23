import SOCKET_ACTION_TYPES from "./socket.types";

const SOCKET_INITIAL_STATE = {
    socket: null,
}

export const socketReducer = (state = SOCKET_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case SOCKET_ACTION_TYPES.SET_SOCKET:
            return {
                ...state,
                socket: payload
            }
    
        default:
            return state;
    }
}