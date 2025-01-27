import { all, call, put, takeLatest } from "redux-saga/effects";
import COMMENT_ACTION_TYPES from "./comment.types";
import { sendAxiosPostJson } from "@/utils/api-requests/axios.utils";
import { createCommentFailed } from "./comment.action";
import { toast } from "sonner";
import { addCommentToFullPost, addCommentToPost } from "../post/post.action";

export function* createComment(action) {
    try {
        const res = yield call(sendAxiosPostJson, `post/createcomment/${action.payload.postId}`, {text: action.payload.text});
        if(res && res.data.success) {
            //action on success
            yield put(addCommentToPost(res.data.postId, res.data.comment._id));
            if(action.payload.fullPostOpen) {
                yield put(addCommentToFullPost(res.data.postId, res.data.comment));
            }
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(createCommentFailed(error));
        toast.error(error.response.message);
    }
}

export function* onCreateCommentStart() {
    yield takeLatest(COMMENT_ACTION_TYPES.CREATE_COMMENT_START, createComment);
}

export function* commentSagas() {
    yield all([call(onCreateCommentStart)]);
}