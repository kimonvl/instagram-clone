import USER_ACTION_TYPES from "./user.types";

const USER_INITIAL_STATE = {
    currentUser: null,
    suggestedUsers: [],
    isLoading: false,
    navigateToLogin: false,
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
                navigateToLogin: true,
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
    
        default:
            return state;
    }
}