import { all, call, select, takeLatest } from "redux-saga/effects";
import NOTIFICATION_ACTION_TYPES from "./notification.types";
import { sendAxiosPostJson } from "@/utils/api-requests/axios.utils";
import { selectUnseenLikeNotifications } from "./notification.selector";
import { markAsSeenLikeNotificationFailed, markAsSeenLikeNotificationSuccess } from "./notification.action";
import { toast } from "sonner";

export function* markAsSeenLikeNotification() {
    const unseenLikeNotifications = yield select(selectUnseenLikeNotifications);
    const notificationIds = unseenLikeNotifications.map((notification) => notification._id)
    try {
        const res = yield call(sendAxiosPostJson, "notification/markasseenlikenot", notificationIds);
        if(res && res.data.success) {
            yield put(markAsSeenLikeNotificationSuccess())
            toast.success("Notifications marked as seen");
        }
    } catch (error) {
        yield put(markAsSeenLikeNotificationFailed(error))
        toast.error("Failed to  marke notifications as seen");
    }
}

export function* onMarkAsSeenLikeNotificationStart() {
    yield takeLatest(NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_LIKE_NOTIFICATIONS_START, markAsSeenLikeNotification);
}

export function* notificationSagas() {
    yield all([call(onMarkAsSeenLikeNotificationStart)]);
}