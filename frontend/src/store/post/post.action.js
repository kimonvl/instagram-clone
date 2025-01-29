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

export const createPostStart = (formData, setOpen, setCaption, setImagePreview, setFile) => {
    return createAction(POST_ACTION_TYPES.CREATE_POST_START, { formData, setOpen, setCaption, setImagePreview, setFile });
}

export const createPostSuccess = () => {
    return createAction(POST_ACTION_TYPES.CREATE_POST_SUCCESS);
}

export const createPostFailed = (error) => {
    return createAction(POST_ACTION_TYPES.CREATE_POST_FAILED, error);
}

export const editPostStart = (postId, formData, setOpen) => {
    return createAction(POST_ACTION_TYPES.EDIT_POST_START, { postId, formData, setOpen });
}

export const editPostSuccess = (post) => {
    return createAction(POST_ACTION_TYPES.EDIT_POST_SUCCESS, post);
}

export const editPostFailed = (error) => {
    return createAction(POST_ACTION_TYPES.EDIT_POST_FAILED, error);
}

export const deletePostStart = (postId) => {
    return createAction(POST_ACTION_TYPES.DELETE_POST_START, postId);
}

export const deletePostSuccess = () => {
    return createAction(POST_ACTION_TYPES.DELETE_POST_SUCCESS);
}

export const deletePostFailed = (error) => {
    return createAction(POST_ACTION_TYPES.DELETE_POST_FAILED, error);
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
    return createAction(POST_ACTION_TYPES.ADD_COMMENT_TO_POST, { postId, commentId });
}

export const addCommentToFullPost = (postId, comment) => {
    return createAction(POST_ACTION_TYPES.ADD_COMMENT_TO_FULL_POST, { postId, comment });
}

export const editCommentToPost = (postId, commentId, text) => {
    return createAction(POST_ACTION_TYPES.EDIT_COMMENT_TO_POST, { postId, commentId, text });
}

export const removeCommentFromPost = (postId, commentId) => {
    return createAction(POST_ACTION_TYPES.REMOVE_COMENT_FROM_POST, { postId, commentId });
}

export const fetchSelectedPostStart = (postId) => {
    return createAction(POST_ACTION_TYPES.FETCH_SELECTED_POST_START, postId);
}
export const fetchSelectedPostSuccess = (post) => {
    return createAction(POST_ACTION_TYPES.FETCH_SELECTED_POST_SUCCES, post);
}
export const fetchSelectedPostFailed = (error) => {
    return createAction(POST_ACTION_TYPES.FETCH_SELECTED_POST_FAILED, error);
}