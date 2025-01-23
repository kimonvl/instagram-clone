import { createAction } from "@/utils/reducer/reducer.utils";
import { io } from "socket.io-client";
import SOCKET_ACTION_TYPES from "./socket.types";
import NOTIFICATION_ACTION_TYPES from "../notification/notification.types";

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
                    transports: ['websocket'],
                    reconnection: true, // Enable automatic reconnection
                    reconnectionAttempts: 10, // Number of reconnection attempts
                    reconnectionDelay: 1000,
                });

                newSocket.on('connect', () => {
                    store.dispatch(createAction(SOCKET_ACTION_TYPES.SET_SOCKET, newSocket));
                    console.log("onconnect", newSocket.connected);
                })

                newSocket.on("disconnect", () => {
                    store.dispatch(createAction(SOCKET_ACTION_TYPES.SET_SOCKET, null));
                })

                newSocket.on("newLikeNotification", (notification) => {
                    //create notification slice and dispatch the notifications
                    console.log("recieved: ", notification);
                    store.dispatch(createAction(NOTIFICATION_ACTION_TYPES.ADD_NEW_LIKE_NOTIFICATION, notification));
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