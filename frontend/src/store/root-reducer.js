import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { postReducer } from "./post/post.reducer";
import { socketReducer } from "./socket/socket.reducer";
import notificationReducer from "./notification/notification.reducer";
import { commentReducer } from "./comment/comment.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    socket: socketReducer,
    notification: notificationReducer,
    comment: commentReducer,
})