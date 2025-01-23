import { createSelector } from "reselect";

const selectPostReducer = (state) => state.post;

export const selectFeedPosts = createSelector(
    [selectPostReducer],
    (postSlice) => postSlice.feedPosts
);

export const selectLoadingCreatePost = createSelector(
    [selectPostReducer],
    (postSlice) => postSlice.loadingCreatePost
);