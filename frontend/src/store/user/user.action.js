import { createAction } from "../../utils/reducer/reducer.utils";
import USER_ACTION_TYPES from "./user.types"

export const signupUserStart = (username, email, password) => {
    return createAction(USER_ACTION_TYPES.SIGNUP_START, {username, email, password});
}

export const signupUserSuccess = () => {
    return createAction(USER_ACTION_TYPES.SIGNUP_SUCCESS);
}

export const signupUserFailed = (error) => {
    return createAction(USER_ACTION_TYPES.SIGNUP_FAILED, error);
}

export const loginUserStart = (email, password) => {
    return createAction(USER_ACTION_TYPES.LOGIN_START, {email, password});
}

export const loginUserSuccess = (user) => {
    return createAction(USER_ACTION_TYPES.LOGIN_SUCCESS, user);
}

export const loginUserFailed = (error) => {
    return createAction(USER_ACTION_TYPES.LOGIN_FAILED, error);
}