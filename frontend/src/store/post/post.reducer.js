import USER_ACTION_TYPES from "../user/user.types";
import POST_ACTION_TYPES from "./post.types";

const POST_INITIAL_STATE = {
    feedPosts: [],
    loadingCreatePost: false,
    error: null,
}

export const postReducer = (state = POST_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

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
        case POST_ACTION_TYPES.DISLIKE_POST_SUCCESS:
            return {
                ...state,
                feedPosts: state.feedPosts.map(post =>
                    post._id === payload.postId
                        ? {
                            ...post,
                            likes: post.likes.filter(userId => userId !== payload.userId)
                        }
                        : post
                ),
            };
        case POST_ACTION_TYPES.LIKE_POST_SUCCESS:
            return {
                ...state,
                feedPosts: state.feedPosts.map(post =>
                    post._id === payload.postId
                        ? {
                            ...post,
                            likes: post.likes.includes(payload.userId)
                                ? post.likes
                                : [...post.likes, payload.userId]
                        }
                        : post
                ),
            };
        case POST_ACTION_TYPES.LIKE_POST_FAILED:
        case POST_ACTION_TYPES.DISLIKE_POST_FAILED:
            return {
                ...state,
                error: payload
            }
        case POST_ACTION_TYPES.ADD_COMMENT_TO_POST:
            return {
                ...state,
                feedPosts: state.feedPosts.map(post => {
                    return post._id === payload.postId ?
                        {
                            ...post,
                            comments: post.comments.includes(payload.commentId) ?
                                post.comments :
                                [...post.comments, payload.commentId]
                        } :
                        post
                })
            }
        case USER_ACTION_TYPES.LOGOUT_SUCCESS:
            return POST_INITIAL_STATE;

        default:
            return state;
    }
}