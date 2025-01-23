import POST_ACTION_TYPES from "../post/post.types";
import USER_ACTION_TYPES from "./user.types";

const USER_INITIAL_STATE = {
    currentUser: null,
    suggestedUsers: [],
    isLoading: false,
    navigateToHome: false,
    error: null
}

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;
    console.log("userReducer recieved action", action);

    switch (type) {
        case USER_ACTION_TYPES.LOGIN_START:
                return {
                    ...state,
                    isLoading: true
                }
        case USER_ACTION_TYPES.LOGIN_SUCCESS:
                return {
                    ...state,
                    currentUser: payload,
                    isLoading: false,
                    navigateToHome: true,
                }
        case USER_ACTION_TYPES.LOGIN_FAILED:
            return {
                ...state,
                error: payload.error,
                isLoading: false,
                navigateToHome: false,
            }
        case USER_ACTION_TYPES.SIGNUP_START:
            return {
                ...state,
                isLoading: true
            }
        case USER_ACTION_TYPES.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case USER_ACTION_TYPES.SIGNUP_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case USER_ACTION_TYPES.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                navigateToHome: false,
            }
        case USER_ACTION_TYPES.LOGOUT_FAILED:
            return {
                ...state,
                error: payload
            }
        case USER_ACTION_TYPES.FETCH_SUGGESTED_USERS_SUCCESS:
            return {
                ...state,
                suggestedUsers: payload
            }
        case USER_ACTION_TYPES.FETCH_SUGGESTED_USERS_FAILED:
            return {
                ...state,
                error: payload
            }
        case USER_ACTION_TYPES.SEND_FOLLOW_REQUEST_SUCCESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: Array.from(new Set([...state.currentUser.following, payload])),
                }
            }
        case USER_ACTION_TYPES.SEND_FOLLOW_REQUEST_FAILED:
            return {
                ...state,
                error: payload
            }
        case USER_ACTION_TYPES.SEND_UNFOLLOW_REQUEST_SUCCESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    following: Array.from(new Set([...state.currentUser.following])).filter((id) => {return id !== payload}),
                }
            }
        case USER_ACTION_TYPES.SEND_UNFOLLOW_REQUEST_FAILED:
            return {
                ...state,
                error: payload
            }
        case USER_ACTION_TYPES.ADD_POST_TO_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    posts: [...state.currentUser.posts, payload]
                }
            }
        case USER_ACTION_TYPES.REMOVE_POST_FROM_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    posts: posts.filter((post) => post._id !== payload)
                }
            }
        default:
            return state;
    }
}