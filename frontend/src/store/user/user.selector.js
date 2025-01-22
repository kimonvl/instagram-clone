import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.currentUser
);

export const selectIsLoading = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.isLoading
)

export const selectNavigateToHome = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.navigateToHome
)

export const selectSuggestedUsers = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.suggestedUsers
)