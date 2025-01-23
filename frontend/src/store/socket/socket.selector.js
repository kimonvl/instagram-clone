import { createSelector } from "reselect";

const selectSocketReducer = (state) => state.socket;

export const selectSocket = createSelector(
    [selectSocketReducer],
    (socketSlice) => socketSlice.socket
);