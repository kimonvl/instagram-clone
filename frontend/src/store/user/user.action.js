import { createAction } from "../../utils/reducer/reducer.utils";
import USER_ACTION_TYPES from "./user.types"

export const signupUserStart = (username, email, password, navigate) => {
    return createAction(USER_ACTION_TYPES.SIGNUP_START, {username, email, password, navigate});
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

export const logoutUserStart = (navigate) => {
    return createAction(USER_ACTION_TYPES.LOGOUT_START, navigate);
}

export const logoutUserSuccess = () => {
    return createAction(USER_ACTION_TYPES.LOGOUT_SUCCESS);
}

export const logoutUserFailed = (error) => {
    return createAction(USER_ACTION_TYPES.LOGOUT_FAILED, error);
}

export const fetchSuggestedUsersStart = (id) => {
    return createAction(USER_ACTION_TYPES.FETCH_SUGGESTED_USERS_START, id);
}

export const fetchSuggestedUsersSuccess = (suggestedUsers) => {
    return createAction(USER_ACTION_TYPES.FETCH_SUGGESTED_USERS_SUCCESS, suggestedUsers);
}

export const fetchSuggestedUsersFailed = (error) => {
    return createAction(USER_ACTION_TYPES.FETCH_SUGGESTED_USERS_FAILED, error);
}

export const sendFollowRequestStart = (targetUser) => {
    return createAction(USER_ACTION_TYPES.SEND_FOLLOW_REQUEST_START, targetUser);
}

export const sendFollowRequestSuccess = (targetUser) => {
    return createAction(USER_ACTION_TYPES.SEND_FOLLOW_REQUEST_SUCCESS, targetUser);
}
export const sendFollowRequestFailed = (error) => {
    return createAction(USER_ACTION_TYPES.SEND_FOLLOW_REQUEST_FAILED, error);
}

export const sendUnfollowRequestStart = (targetUser) => {
    return createAction(USER_ACTION_TYPES.SEND_UNFOLLOW_REQUEST_START, targetUser);
}

export const sendUnfollowRequestSuccess = (targetUser) => {
    return createAction(USER_ACTION_TYPES.SEND_UNFOLLOW_REQUEST_SUCCESS, targetUser);
}

export const sendUnfollowRequestFailed = (error) => {
    return createAction(USER_ACTION_TYPES.SEND_UNFOLLOW_REQUEST_FAILED, error);
}

export const addPostToUser = (post) => {
    return createAction(USER_ACTION_TYPES.ADD_POST_TO_USER, post);
}

export const removePostFromUser = (postId) => {
    return createAction(USER_ACTION_TYPES.REMOVE_POST_FROM_USER, postId);
}