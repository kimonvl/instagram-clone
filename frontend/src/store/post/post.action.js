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