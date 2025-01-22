import { all, call, put, takeLatest } from "redux-saga/effects";
import USER_ACTION_TYPES from "./user.types";
import { sendAxiosGet, sendAxiosPost } from "@/utils/api-requests/axios.utils";
import { fetchSuggestedUsersFailed, fetchSuggestedUsersSuccess, loginUserFailed, loginUserSuccess, logoutUserFailed, logoutUserSuccess, signupUserFailed, signupUserSuccess } from "./user.action";
import { toast } from "sonner";
import { emptyFeedPosts, fetchFeedPostsSuccess } from "../post/post.action";

export function* signupUser(action) {
    try {
        const res = yield call(sendAxiosPost, "user/register", action.payload); 
        if(res && res.data.success) {
            yield put(signupUserSuccess());
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(signupUserFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* loginUser(action) {
    try {
        const res = yield call(sendAxiosPost, "user/login", action.payload);
        if(res && res.data.success) {
            yield put(loginUserSuccess(res.data.user));
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(loginUserFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* logoutUser() {
    try {
        const res = yield call(sendAxiosGet, "user/logout");
        if(res && res.data.success) {
            yield put(logoutUserSuccess());
            yield put(emptyFeedPosts());
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(logoutUserFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* fetchSuggestedUsers(action) {
    try {
        const res = yield call(sendAxiosGet, "user/suggested", {id: action.payload});
        if(res && res.data.success) {
            yield put(fetchSuggestedUsersSuccess(res.data.users));
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(fetchSuggestedUsersFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* onSignupUserStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGNUP_START, signupUser);
}

export function* onLoginUserStart() {
    yield takeLatest(USER_ACTION_TYPES.LOGIN_START, loginUser);
}

export function* onLogoutUserStart() {
    yield takeLatest(USER_ACTION_TYPES.LOGOUT_START, logoutUser);
}

export function* onFetchSuggestedUsersStart() {
    yield takeLatest(USER_ACTION_TYPES.FETCH_SUGGESTED_USERS_START, fetchSuggestedUsers);
}

export function* userSagas() {
    yield all([call(onSignupUserStart), call(onLoginUserStart), call(onLogoutUserStart), call(onFetchSuggestedUsersStart)]);
}