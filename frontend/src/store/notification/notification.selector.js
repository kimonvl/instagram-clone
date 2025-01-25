import { createSelector } from "reselect";

const selectNotificationReducer = (state) => state.notification;

export const selectUnseenNotifications = createSelector(
    [selectNotificationReducer],
    (notificationSlice) => notificationSlice.unseenNotifications
)

export const selectUnseenNotificationsForView = createSelector(
    [selectNotificationReducer],
    (notificationSlice) => notificationSlice.unseenNotificationsForView
)

export const selectSeenNotifications = createSelector(
    [selectNotificationReducer],
    (notificationSlice) => notificationSlice.seenNotifications
)
