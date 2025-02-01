import { createAction } from "@/utils/reducer/reducer.utils";
import { io } from "socket.io-client";
import SOCKET_ACTION_TYPES from "./socket.types";
import NOTIFICATION_ACTION_TYPES from "../notification/notification.types";
import CHAT_ACTION_TYPES from "../chat/chat.types";
import { markAsSeenMessagesStart, recieveMessage } from "../chat/chat.action";

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

                newSocket.on("newNotification", (notification) => {
                    //create notification slice and dispatch the notifications
                    console.log("recieved: ", notification);
                    store.dispatch(createAction(NOTIFICATION_ACTION_TYPES.ADD_NEW_NOTIFICATION, notification));
                })
                
                newSocket.on("newMessage", (message) => {
                    console.log("new message ", message);
                    const selectedConversation = store.getState().chat.selectedConversation;
                    const selectedConversationOpen = store.getState().chat.selectedConversationOpen;
                    store.dispatch(recieveMessage(message));
                    if(selectedConversation && selectedConversationOpen && selectedConversation._id == message.conversation) {
                        store.dispatch(markAsSeenMessagesStart(message.conversation));
                    }
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