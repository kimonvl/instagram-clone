import { all, call, put, select, takeLatest } from "redux-saga/effects";
import POST_ACTION_TYPES from "./post.types";
import { sendAxiosPostFormData, sendAxiosPostJson } from "@/utils/api-requests/axios.utils";
import { createPostFailed, createPostSuccess, dislikePostFailed, dislikePostSuccess, fetchFeedPostsFailed, fetchFeedPostsSuccess, likePostFailed, likePostSuccess } from "./post.action";
import { toast } from "sonner";
import { addPostToUser } from "../user/user.action";
import { selectCurrentUser } from "../user/user.selector";

export function* fetchFeedPosts() {
    try {
        const res = yield call(sendAxiosPostJson, "post/getallposts");
        if(res && res.data.success) {
            yield put(fetchFeedPostsSuccess(res.data.posts));
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(fetchFeedPostsFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* createPost(action) {
    try {
        const res = yield call(sendAxiosPostFormData, "post/addnewpost", action.payload.formData);
        if(res && res.data.success) {
            yield put(addPostToUser(res.data.post));
            yield put(createPostSuccess());
            action.payload.setOpen(false);
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(createPostFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* dislikePost(action) {
    const currentUser = yield select(selectCurrentUser);
    const postId = action.payload
    try {
        const res = yield call(sendAxiosPostJson, `post/dislikepost/${postId}`);
        if(res && res.data.success) {
            yield put(dislikePostSuccess(postId, currentUser._id));
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(dislikePostFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* likePost(action) {
    const currentUser = yield select(selectCurrentUser);
    const postId = action.payload
    try {
        const res = yield call(sendAxiosPostJson, `post/likepost/${postId}`);
        if(res && res.data.success) {
            yield put(likePostSuccess(postId, currentUser._id));
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(likePostFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* onFetchFeedPostsStart() {
    yield takeLatest(POST_ACTION_TYPES.FETCH_FEED_POSTS_START, fetchFeedPosts);
}

export function* onCreatePostStart() {
    yield takeLatest(POST_ACTION_TYPES.CREATE_POST_START, createPost);
}

export function* onDislikePostStart() {
    yield takeLatest(POST_ACTION_TYPES.DISLIKE_POST_START, dislikePost);
}

export function* onLikePostStart() {
    yield takeLatest(POST_ACTION_TYPES.LIKE_POST_START, likePost);
}

export function* postSagas() {
    yield all([call(onFetchFeedPostsStart), call(onCreatePostStart), call(onDislikePostStart), call(onLikePostStart)]);
}