import { createSelector } from "reselect";

const selectNotificationReducer = (state) => state.notification;

export const selectUnseenLikeNotifications = createSelector(
    [selectNotificationReducer],
    (notificationSlice) => notificationSlice.unseenLikeNotifications
)
