import { createAction } from "@/utils/reducer/reducer.utils"
import SOCKET_ACTION_TYPES from "./socket.types"

export const socketConnect = () => {
    return createAction(SOCKET_ACTION_TYPES.SOCKET_CONNECT);
}

export const socketDisconnect = () => {
    return createAction(SOCKET_ACTION_TYPES.SOCKET_DISCONNECT);
}

export const setSocket = (socket) => {
    return createAction(SOCKET_ACTION_TYPES.SET_SOCKET, socket);
}