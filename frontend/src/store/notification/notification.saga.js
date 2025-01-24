import { all, call, put, select, takeLatest } from "redux-saga/effects";
import NOTIFICATION_ACTION_TYPES from "./notification.types";
import { sendAxiosPostJson } from "@/utils/api-requests/axios.utils";
import { selectUnseenLikeNotifications } from "./notification.selector";
import { fetchOfflineUnseenLikeNotificationsFailed, fetchOfflineUnseenLikeNotificationsSuccess, markAsSeenLikeNotificationFailed, markAsSeenLikeNotificationSuccess } from "./notification.action";
import { toast } from "sonner";

export function* markAsSeenLikeNotification() {
    const unseenLikeNotifications = yield select(selectUnseenLikeNotifications);
    const notificationIds = unseenLikeNotifications.map((notification) => notification._id)
    try {
        const res = yield call(sendAxiosPostJson, "notification/markasseenlikenot", notificationIds);
        if(res && res.data.success) {
            yield put(markAsSeenLikeNotificationSuccess())
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(markAsSeenLikeNotificationFailed(error))
        toast.error(error.response.data.message);
    }
}

export function* fetchOfflineUnseenNotifications() {
    try {
        const res = yield call(sendAxiosPostJson, "notification/getofflineunseenlikenot");
        if(res && res.data.success) {
            yield put(fetchOfflineUnseenLikeNotificationsSuccess(res.data.notifications))
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(fetchOfflineUnseenLikeNotificationsFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* onMarkAsSeenLikeNotificationStart() {
    yield takeLatest(NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_LIKE_NOTIFICATIONS_START, markAsSeenLikeNotification);
}

export function* onFetchOfflineUnseenLikeNotifications() {
    yield takeLatest(NOTIFICATION_ACTION_TYPES.FETCH_OFFLINE_UNSEEN_LIKE_NOTIFICATIONS_START, fetchOfflineUnseenNotifications);
}

export function* notificationSagas() {
    yield all([call(onMarkAsSeenLikeNotificationStart), call(onFetchOfflineUnseenLikeNotifications)]);
}