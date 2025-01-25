import { createAction } from "@/utils/reducer/reducer.utils"
import COMMENT_ACTION_TYPES from "./comment.types"

export const createCommentStart = (postId, text) => {
    return createAction(COMMENT_ACTION_TYPES.CREATE_COMMENT_START, {postId, text});
}

export const createCommentSuccess = () => {
    return createAction(COMMENT_ACTION_TYPES.CREATE_COMMENT_SUCCESS);
}

export const createCommentFailed = (error) => {
    return createAction(COMMENT_ACTION_TYPES.CREATE_COMMENT_FAILED, error);
}