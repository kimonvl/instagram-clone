import { createAction } from "@/utils/reducer/reducer.utils"
import COMMENT_ACTION_TYPES from "./comment.types"

export const createCommentStart = (postId, text, fullPostOpen) => {
    return createAction(COMMENT_ACTION_TYPES.CREATE_COMMENT_START, {postId, text, fullPostOpen});
}

export const createCommentSuccess = () => {
    return createAction(COMMENT_ACTION_TYPES.CREATE_COMMENT_SUCCESS);
}

export const createCommentFailed = (error) => {
    return createAction(COMMENT_ACTION_TYPES.CREATE_COMMENT_FAILED, error);
}

export const editCommentStart = (postId, commentId, text) => {
    return createAction(COMMENT_ACTION_TYPES.EDIT_COMMENT_START, {postId, commentId, text});
}

export const editCommentFailed = (error) => {
    return createAction(COMMENT_ACTION_TYPES.EDIT_COMMENT_FAILED, error);
}

export const deleteCommentStart = (postId, commentId) => {
    return createAction(COMMENT_ACTION_TYPES.DELETE_COMMENT_START, {postId, commentId});
}

export const deleteCommentSuccess = () => {
    return createAction(COMMENT_ACTION_TYPES.DELETE_COMMENT_SUCCESS);
}

export const deleteCommentFailed = (error) => {
    return createAction(COMMENT_ACTION_TYPES.DELETE_COMMENT_FAILED, error);
}
