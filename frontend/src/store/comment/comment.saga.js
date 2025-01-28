import { all, call, put, takeLatest } from "redux-saga/effects";
import COMMENT_ACTION_TYPES from "./comment.types";
import { sendAxiosPostJson } from "@/utils/api-requests/axios.utils";
import { createCommentFailed, editCommentFailed } from "./comment.action";
import { toast } from "sonner";
import { addCommentToFullPost, addCommentToPost, editCommentToPost } from "../post/post.action";

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

export function* editComment(action) {
    try {
        const {postId, commentId, text} = action.payload;
        const res = yield call(sendAxiosPostJson, `post/editcomment/${commentId}`, {text:text});
        if(res && res.data.success) {
            //action on success
            yield put(editCommentToPost(postId, commentId, text));
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(editCommentFailed(error));
        toast.error(error.response.message);
    }
}

export function* onCreateCommentStart() {
    yield takeLatest(COMMENT_ACTION_TYPES.CREATE_COMMENT_START, createComment);
}

export function* onEditCommentStart() {
    yield takeLatest(COMMENT_ACTION_TYPES.EDIT_COMMENT_START, editComment);
}

export function* commentSagas() {
    yield all([call(onCreateCommentStart), call(onEditCommentStart)]);
}