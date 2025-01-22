import POST_ACTION_TYPES from "./post.types";

const POST_INITIAL_STATE = {
    feedPosts: [],
    error: null,
}

export const postReducer = (state = POST_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case POST_ACTION_TYPES.FETCH_FEED_POSTS_SUCCESS:
            return {
                ...state,
                feedPosts: payload
            }
        case POST_ACTION_TYPES.FETCH_FEED_POSTS_FAILED:
            return {
                ...state,
                error: payload
            }
        case POST_ACTION_TYPES.EMPTY_FEED_POSTS:
            return {
                ...state,
                feedPosts: []
            }
    
        default:
            return state;
    }
}