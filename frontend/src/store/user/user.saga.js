import { all, call, put, takeLatest } from "redux-saga/effects";
import USER_ACTION_TYPES from "./user.types";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/api-requests/axios.utils";
import { fetchSuggestedUsersFailed, fetchSuggestedUsersSuccess, loginUserFailed, loginUserSuccess, logoutUserFailed, logoutUserSuccess, sendFollowRequestFailed, sendFollowRequestSuccess, sendUnfollowRequestFailed, sendUnfollowRequestSuccess, signupUserFailed, signupUserSuccess } from "./user.action";
import { toast } from "sonner";
import { emptyFeedPosts } from "../post/post.action";
import { socketConnect } from "../socket/socket.action";

export function* signupUser(action) {
    const {username, email, password, navigate} = action.payload
    try {
        const res = yield call(sendAxiosPostJson, "user/register", {username, email, password}); 
        if(res && res.data.success) {
            yield put(signupUserSuccess());
            navigate("/login");
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(signupUserFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* loginUser(action) {
    try {
        const res = yield call(sendAxiosPostJson, "user/login", action.payload);
        if(res && res.data.success) {
            yield put(loginUserSuccess(res.data.user));
            yield put(socketConnect());
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

export function* followUser(action) {
    try {
        const targetUserId = action.payload;
        const res = yield call(sendAxiosPostJson, `user/followorunfollow/${targetUserId}`)
        if(res && res.data.success) {
            yield put(sendFollowRequestSuccess(targetUserId));
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(sendFollowRequestFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* unfollowUser(action) {
    try {
        const targetUserId = action.payload;
        const res = yield call(sendAxiosPostJson, `user/followorunfollow/${targetUserId}`)
        if(res && res.data.success) {
            yield put(sendUnfollowRequestSuccess(targetUserId));
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(sendUnfollowRequestFailed(error));
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

export function* onFollowUserStart() {
    yield takeLatest(USER_ACTION_TYPES.SEND_FOLLOW_REQUEST_START, followUser);
}

export function* onUnfollowUserStart() {
    yield takeLatest(USER_ACTION_TYPES.SEND_UNFOLLOW_REQUEST_START, unfollowUser);
}

export function* userSagas() {
    yield all([call(onSignupUserStart), call(onLoginUserStart), call(onLogoutUserStart), call(onFetchSuggestedUsersStart), call(onFollowUserStart), call(onUnfollowUserStart)]);
}