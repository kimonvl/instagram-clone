import USER_ACTION_TYPES from "../user/user.types";
import POST_ACTION_TYPES from "./post.types";

const POST_INITIAL_STATE = {
    feedPosts: [],
    loadingCreatePost: false,
    loadingEditPost: false,
    loadingDeletePost: false,
    selectedPost: null,
    loadingSelectedPost: false,
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
        case POST_ACTION_TYPES.EDIT_POST_START:
            return {
                ...state,
                loadingEditPost: true
            }
        case POST_ACTION_TYPES.EDIT_POST_SUCCESS:
            return {
                ...state,
                loadingEditPost: false,
                selectedPost: state.selectedPost && state.selectedPost?._id == payload._id ? {
                    ...state.selectedPost,
                    image: payload.image,
                    caption: payload.caption,
                } : state.selectedPost,
            }
        case POST_ACTION_TYPES.EDIT_POST_FAILED:
            return {
                ...state,
                loadingEditPost: false,
                error: payload
            }
        case POST_ACTION_TYPES.DELETE_POST_START:
            return {
                ...state,
                loadingDeletePost: true
            }
        case POST_ACTION_TYPES.DELETE_POST_SUCCESS:
            return {
                ...state,
                loadingDeletePost: false,
                selectedPost: state.selectedPost && state.selectedPost?._id == payload ? null : state.selectedPost,
            }
        case POST_ACTION_TYPES.DELETE_POST_FAILED:
            return {
                ...state,
                loadingDeletePost: false,
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
        case POST_ACTION_TYPES.ADD_COMMENT_TO_FULL_POST:
            return {
                ...state,
                selectedPost: payload.postId == state.selectedPost?._id ?  {
                    ...state.selectedPost,
                    comments: [...state.selectedPost.comments, payload.comment]
                } :
                selectedPost,
            }
        case POST_ACTION_TYPES.EDIT_COMMENT_TO_POST:
            return {
                ...state,
                selectedPost: payload.postId == state.selectedPost?._id ?  {
                    ...state.selectedPost,
                    comments: state.selectedPost.comments.map((comment) => {
                        if(comment._id == payload.commentId){
                            return {
                                ...comment,
                                text: payload.text,
                            }
                        }else {
                            return comment;
                        }
                    })
                } :
                state.selectedPost,
            }
        case POST_ACTION_TYPES.REMOVE_COMENT_FROM_POST:
            return {
                ...state,
                selectedPost: payload.postId == state.selectedPost?._id ?  {
                    ...state.selectedPost,
                    comments: state.selectedPost.comments.filter(comment => comment._id != payload.commentId)
                } :
                state.selectedPost,
                feedPosts: state.feedPosts.map((post) => {
                    return post._id == payload.postId ? {
                        ...post,
                        comments: post.comments.filter(commentId => commentId != payload.commentId)
                    } : post
                })
            }
        case POST_ACTION_TYPES.FETCH_SELECTED_POST_START:
            return {
                ...state,
                loadingSelectedPost: true,
            };
        case POST_ACTION_TYPES.FETCH_SELECTED_POST_SUCCES:
            return {
                ...state,
                selectedPost: payload,
                loadingSelectedPost: false,
            };
        case POST_ACTION_TYPES.FETCH_SELECTED_POST_FAILED:
            return {
                ...state,
                loadingSelectedPost: false,
                selectedPost: null,
                error: payload,
            };
        case USER_ACTION_TYPES.LOGOUT_SUCCESS:
            return POST_INITIAL_STATE;

        default:
            return state;
    }
}