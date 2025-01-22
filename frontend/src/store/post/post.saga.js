import { all, call, put, takeLatest } from "redux-saga/effects";
import POST_ACTION_TYPES from "./post.types";
import { sendAxiosPost } from "@/utils/api-requests/axios.utils";
import { fetchFeedPostsFailed, fetchFeedPostsSuccess } from "./post.action";
import { toast } from "sonner";

export function* fetchFeedPosts() {
    try {
        const res = yield call(sendAxiosPost, "post/getallposts");
        if(res && res.data.success) {
            yield put(fetchFeedPostsSuccess(res.data.posts));
            toast.success("Feed loaded");
        }
    } catch (error) {
        yield put(fetchFeedPostsFailed(error.response.data.message));
        toast.error("Feed failed to load");
    }
}

export function* onFetchFeedPostsStart() {
    yield takeLatest(POST_ACTION_TYPES.FETCH_FEED_POSTS_START, fetchFeedPosts);
}

export function* postSagas() {
    yield all([call(onFetchFeedPostsStart)]);
}