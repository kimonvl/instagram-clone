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

export const selectSelectedPost = createSelector(
    [selectPostReducer],
    (postSlice) => postSlice.selectedPost
);

export const selectLoadingSelectedPost = createSelector(
    [selectPostReducer],
    (postSlice) => postSlice.loadingSelectedPost
);


