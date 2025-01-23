import { createAction } from "@/utils/reducer/reducer.utils"
import NOTIFICATION_ACTION_TYPES from "./notification.types"

export const addNewLikeNotification = (notification) => {
    return createAction(NOTIFICATION_ACTION_TYPES.ADD_NEW_LIKE_NOTIFICATION, notification);
}

export const markAsSeenLikeNotificationStart = () => {
    return createAction(NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_LIKE_NOTIFICATIONS_START);
}

export const markAsSeenLikeNotificationSuccess = () => {
    return createAction(NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_LIKE_NOTIFICATIONS_SUCCESS);
}

export const markAsSeenLikeNotificationFailed = (error) => {
    return createAction(NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_LIKE_NOTIFICATIONS_FAILED, error);
}


