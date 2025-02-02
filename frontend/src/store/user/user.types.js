const USER_ACTION_TYPES = {
    LOGIN_START: "user/LOGIN_START",
    LOGIN_SUCCESS: "user/LOGIN_SUCCESS",
    LOGIN_FAILED: "user/LOGIN_FAILED",
    SIGNUP_START: "user/SIGNUP_START",
    SIGNUP_SUCCESS: "user/SIGNUP_SUCCESS",
    SIGNUP_FAILED: "user/SIGNUP_FAILED",
    LOGOUT_START: "user/LOGOUT_START",
    LOGOUT_SUCCESS: "user/LOGOUT_SUCCESS",
    LOGOUT_FAILED: "user/LOGOUT_FAILED",
    FETCH_SUGGESTED_USERS_START: "user/FETCH_SUGGESTED_USERS_START",
    FETCH_SUGGESTED_USERS_SUCCESS: "user/FETCH_SUGGESTED_USERS_SUCCESS",
    FETCH_SUGGESTED_USERS_FAILED: "user/FETCH_SUGGESTED_USERS_FAILED",
    SEND_FOLLOW_REQUEST_START: "user/SEND_FOLLOW_REQUEST_START",
    SEND_FOLLOW_REQUEST_SUCCESS: "user/SEND_FOLLOW_REQUEST_SUCCESS",
    SEND_FOLLOW_REQUEST_FAILED: "user/SEND_FOLLOW_REQUEST_FAILED",
    SEND_UNFOLLOW_REQUEST_START: "user/SEND_UNFOLLOW_REQUEST_START",
    SEND_UNFOLLOW_REQUEST_SUCCESS: "user/SEND_UNFOLLOW_REQUEST_SUCCESS",
    SEND_UNFOLLOW_REQUEST_FAILED: "user/SEND_UNFOLLOW_REQUEST_FAILED",
    FETCH_SELECTED_PROFILE_START: "user/FETCH_SELECTED_PROFILE_START",
    FETCH_SELECTED_PROFILE_SUCCESS: "user/FETCH_SELECTED_PROFILE_SUCCESS",
    FETCH_SELECTED_PROFILE_FAILED: "user/FETCH_SELECTED_PROFILE_FAILED",

    ADD_POST_TO_USER: "user/ADD_POST_TO_USER",
    REMOVE_POST_FROM_USER: "user/REMOVE_POST_FROM_USER",
    EDIT_POST_TO_USER: "user/EDIT_POST_TO_USER",
}

export default USER_ACTION_TYPES;