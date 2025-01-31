import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.saga";
import { postSagas } from "./post/post.saga";
import { notificationSagas } from "./notification/notification.saga";
import { commentSagas } from "./comment/comment.saga";
import { chatSagas } from "./chat/chat.saga";

export function* rootSaga() {
    yield all([call(userSagas), call(postSagas), call(notificationSagas), call(commentSagas), call(chatSagas)]);
}