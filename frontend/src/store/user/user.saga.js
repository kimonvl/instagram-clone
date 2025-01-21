import { all, call, put, takeLatest } from "redux-saga/effects";
import USER_ACTION_TYPES from "./user.types";
import { sendAxiosPost } from "@/utils/api-requests/axios.utils";
import { loginUserFailed, loginUserSuccess, signupUserFailed, signupUserSuccess } from "./user.action";
import { toast } from "sonner";

export function* signupUser(action) {
    console.log("user saga signupUser:", action.payload);
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
    console.log("user saga loginUser:", action.payload);
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

export function* onSignupUserStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGNUP_START, signupUser);
}

export function* onLoginUserStart() {
    yield takeLatest(USER_ACTION_TYPES.LOGIN_START, loginUser);
}

export function* userSagas() {
    yield all([call(onSignupUserStart), call(onLoginUserStart)]);
}