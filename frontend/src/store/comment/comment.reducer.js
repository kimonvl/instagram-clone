import COMMENT_ACTION_TYPES from "./comment.types";

const COMMENT_INITIAL_STATE = {
    commentCreated: false,
    error: null,
}

export const commentReducer = (state = COMMENT_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case COMMENT_ACTION_TYPES.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                commentCreated: true,
            }
        case COMMENT_ACTION_TYPES.CREATE_COMMENT_FAILED:
            return {
                ...state,
                error: payload
            }
        case COMMENT_ACTION_TYPES.DELETE_COMMENT_FAILED:
            return {
                ...state,
                error: payload
            }
            
    
        default:
            return state;
    }
}
