import { all, call, put, takeLatest } from "redux-saga/effects";
import POST_ACTION_TYPES from "./post.types";
import { sendAxiosPostFormData, sendAxiosPostJson } from "@/utils/api-requests/axios.utils";
import { createPostFailed, createPostSuccess, fetchFeedPostsFailed, fetchFeedPostsSuccess } from "./post.action";
import { toast } from "sonner";
import { addPostToUser } from "../user/user.action";

export function* fetchFeedPosts() {
    try {
        const res = yield call(sendAxiosPostJson, "post/getallposts");
        if(res && res.data.success) {
            yield put(fetchFeedPostsSuccess(res.data.posts));
            toast.success("Feed loaded");
        }
    } catch (error) {
        yield put(fetchFeedPostsFailed(error.response.data.message));
        toast.error("Feed failed to load");
    }
}

export function* createPost(action) {
    try {
        const res = yield call(sendAxiosPostFormData, "post/addnewpost", action.payload.formData);
        if(res && res.data.success) {
            yield put(addPostToUser(res.data.post));
            yield put(createPostSuccess());
            action.payload.setOpen(false);
            toast.success("Post created");
        }
    } catch (error) {
        yield put(createPostFailed(error.response.data.message));
        toast.error("Failed to create post");
    }
}

export function* onFetchFeedPostsStart() {
    yield takeLatest(POST_ACTION_TYPES.FETCH_FEED_POSTS_START, fetchFeedPosts);
}

export function* onCreatePostStart() {
    yield takeLatest(POST_ACTION_TYPES.CREATE_POST_START, createPost);
}

export function* postSagas() {
    yield all([call(onFetchFeedPostsStart), call(onCreatePostStart)]);
}