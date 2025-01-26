import { createAction } from "@/utils/reducer/reducer.utils"
import POST_ACTION_TYPES from "./post.types"

export const fetchFeedPostsStart = () => {
    return createAction(POST_ACTION_TYPES.FETCH_FEED_POSTS_START);
}

export const fetchFeedPostsSuccess = (posts) => {
    return createAction(POST_ACTION_TYPES.FETCH_FEED_POSTS_SUCCESS, posts);
}

export const fetchFeedPostsFailed = (error) => {
    return createAction(POST_ACTION_TYPES.FETCH_FEED_POSTS_SUCCESS, error);
}

export const emptyFeedPosts = () => {
    return createAction(POST_ACTION_TYPES.EMPTY_FEED_POSTS);
}

export const createPostStart = (formData, setOpen) => {
    return createAction(POST_ACTION_TYPES.CREATE_POST_START, { formData, setOpen });
}

export const createPostSuccess = () => {
    return createAction(POST_ACTION_TYPES.CREATE_POST_SUCCESS);
}

export const createPostFailed = (error) => {
    return createAction(POST_ACTION_TYPES.CREATE_POST_FAILED, error);
}

export const dislikePostStart = (postId) => {
    return createAction(POST_ACTION_TYPES.DISLIKE_POST_START, postId);
}

export const dislikePostSuccess = (postId, userId) => {
    return createAction(POST_ACTION_TYPES.DISLIKE_POST_SUCCESS, { postId, userId });
}

export const dislikePostFailed = (error) => {
    return createAction(POST_ACTION_TYPES.DISLIKE_POST_FAILED, error);
}

export const likePostStart = (postId) => {
    return createAction(POST_ACTION_TYPES.LIKE_POST_START, postId);
}

export const likePostSuccess = (postId, userId) => {
    return createAction(POST_ACTION_TYPES.LIKE_POST_SUCCESS, { postId, userId });
}

export const likePostFailed = (error) => {
    return createAction(POST_ACTION_TYPES.LIKE_POST_FAILED, error);
}

export const addCommentToPost = (postId, commentId) => {
    return createAction(POST_ACTION_TYPES.ADD_COMMENT_TO_POST, {postId, commentId});
}