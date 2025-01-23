import POST_ACTION_TYPES from "./post.types";

const POST_INITIAL_STATE = {
    feedPosts: [],
    loadingCreatePost: false,
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
        case POST_ACTION_TYPES.CREATE_POST_START:
            return {
                ...state,
                loadingCreatePost: true
            }
        case POST_ACTION_TYPES.CREATE_POST_SUCCESS:
            return {
                ...state,
                loadingCreatePost: false
            }
        case POST_ACTION_TYPES.CREATE_POST_FAILED:
            return {
                ...state,
                loadingCreatePost: false,
                error: payload
            }
            case POST_ACTION_TYPES.DISLIKE_POST:
                return {
                    ...state,
                    feedPosts: state.feedPosts.map(post => 
                        post.id === payload.postId 
                            ? {
                                ...post,
                                likes: post.likes.filter(userId => userId !== payload.userId)
                            }
                            : post
                    ),
                };
    
        default:
            return state;
    }
}