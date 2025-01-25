import { createAction } from "@/utils/reducer/reducer.utils"
import NOTIFICATION_ACTION_TYPES from "./notification.types"

export const addNewNotification = (notification) => {
    return createAction(NOTIFICATION_ACTION_TYPES.ADD_NEW_NOTIFICATION, notification);
}

export const markAsSeenNotificationStart = () => {
    return createAction(NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_NOTIFICATIONS_START);
}

export const markAsSeenNotificationSuccess = () => {
    return createAction(NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_NOTIFICATIONS_SUCCESS);
}

export const markAsSeenNotificationFailed = (error) => {
    return createAction(NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_NOTIFICATIONS_FAILED, error);
}

export const fetchOfflineUnseenNotificationsStart = () => {
    return createAction(NOTIFICATION_ACTION_TYPES.FETCH_OFFLINE_UNSEEN_NOTIFICATIONS_START);
}

export const fetchOfflineUnseenNotificationsSuccess = (notifications) => {
    return createAction(NOTIFICATION_ACTION_TYPES.FETCH_OFFLINE_UNSEEN_NOTIFICATIONS_SUCCESS, notifications);
}

export const fetchOfflineUnseenNotificationsFailed = (error) => {
    return createAction(NOTIFICATION_ACTION_TYPES.FETCH_OFFLINE_UNSEEN_NOTIFICATIONS_FAILED, error);
}

export const fetchSeenNotificationsStart = () => {
    return createAction(NOTIFICATION_ACTION_TYPES.FETCH_SEEN_NOTIFICATIONS_START);
}

export const fetchSeenNotificationsSuccess = (notifications) => {
    return createAction(NOTIFICATION_ACTION_TYPES.FETCH_SEEN_NOTIFICATIONS_SUCCESS, notifications);
}

export const fetchSeenNotificationsFailed = (error) => {
    return createAction(NOTIFICATION_ACTION_TYPES.FETCH_SEEN_NOTIFICATIONS_FAILED, error);
}

export const clearUnseenNotificationForView = () => {
    return createAction(NOTIFICATION_ACTION_TYPES.CLEAR_UNSEEN_NOTIFICATION_FOR_VIEW);
}

