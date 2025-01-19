import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.cuerrentUser
);

export const selectIsLoading = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.isLoading
)

export const selectNavigateToLogin = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.navigateToLogin
)