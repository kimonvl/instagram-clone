import { createAction } from "@/utils/reducer/reducer.utils";
import { io } from "socket.io-client";
import SOCKET_ACTION_TYPES from "./socket.types";

const socketMiddleware = (store) => (next) => (action) => {

    const socket = store.getState().socket.socket;
    const user = store.getState().user.currentUser;

    switch (action.type) {
        case SOCKET_ACTION_TYPES.SOCKET_CONNECT:
            if(!socket) {
                const newSocket = io('http://localhost:8000', {
                    query: {
                        userId: user?._id
                    },
                    transports: ['websocket']
                });

                newSocket.on('connect', () => {
                    store.dispatch(createAction(SOCKET_ACTION_TYPES.SET_SOCKET, newSocket));
                    console.log("onconnect", newSocket.connected);
                })

                newSocket.on("disconnect", () => {
                    store.dispatch(createAction(SOCKET_ACTION_TYPES.SET_SOCKET, null));
                })

                newSocket.on("friendOnline", () => {
                    
                })

                newSocket.on("friendOffline", () => {

                })
            }
            break;
        case SOCKET_ACTION_TYPES.SOCKET_DISCONNECT:
            if(socket) {
                socket.disconnect();
                store.dispatch(createAction(SOCKET_ACTION_TYPES.SET_SOCKET, null));
            }
            break;
    
        default:
            break;
    }

    return next(action);
}

export default socketMiddleware;