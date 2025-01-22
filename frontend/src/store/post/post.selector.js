import { createSelector } from "reselect";

const selectPostReducer = (state) => state.post;

export const selectFeedPosts = createSelector(
    [selectPostReducer],
    (postSlice) => postSlice.feedPosts
);