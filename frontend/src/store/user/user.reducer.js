import USER_ACTION_TYPES from "./user.types";

const USER_INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    navigateToLogin: false,
    error: null
}

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.LOGIN_START:
                return {
                    ...state,
                    isLoading: true
                }
        case USER_ACTION_TYPES.LOGIN_SUCCESS:
                return {
                    ...state,
                    currentUser: payload.user,
                    isLoading: false
                }
        case USER_ACTION_TYPES.LOGIN_FAILED:
            return {
                ...state,
                error: payload.error,
                isLoading: false
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
                error: payload.error,
                isLoading: false
            }
    
        default:
            return state;
    }
}