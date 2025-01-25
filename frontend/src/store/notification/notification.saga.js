import { all, call, put, select, takeLatest } from "redux-saga/effects";
import NOTIFICATION_ACTION_TYPES from "./notification.types";
import { sendAxiosPostJson } from "@/utils/api-requests/axios.utils";
import { toast } from "sonner";
import { fetchOfflineUnseenNotificationsFailed, fetchOfflineUnseenNotificationsSuccess, fetchSeenNotificationsFailed, fetchSeenNotificationsSuccess, markAsSeenNotificationFailed, markAsSeenNotificationSuccess } from "./notification.action";
import { selectUnseenNotifications } from "./notification.selector";

export function* markAsSeenNotifications() {
    const unseenNotifications = yield select(selectUnseenNotifications);
    const notificationIds = unseenNotifications.map((notification) => notification._id)
    try {
        const res = yield call(sendAxiosPostJson, "notification/markasseennot", notificationIds);
        if(res && res.data.success) {
            yield put(markAsSeenNotificationSuccess())
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(markAsSeenNotificationFailed(error))
        toast.error(error.response.data.message);
    }
}

export function* fetchOfflineUnseenNotifications() {
    try {
        const res = yield call(sendAxiosPostJson, "notification/getofflineunseennot");
        if(res && res.data.success) {
            yield put(fetchOfflineUnseenNotificationsSuccess(res.data.notifications))
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(fetchOfflineUnseenNotificationsFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* fetchSeenNotifications() {
    try {
        const res = yield call(sendAxiosPostJson, "notification/getseennot");
        if(res && res.data.success) {
            yield put(fetchSeenNotificationsSuccess(res.data.notifications))
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(fetchSeenNotificationsFailed(error));
        toast.error(error.response.data.message); 
    }
}

export function* onMarkAsSeenNotificationStart() {
    yield takeLatest(NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_NOTIFICATIONS_START, markAsSeenNotifications);
}

export function* onFetchOfflineUnseenNotificationsStart() {
    yield takeLatest(NOTIFICATION_ACTION_TYPES.FETCH_OFFLINE_UNSEEN_NOTIFICATIONS_START, fetchOfflineUnseenNotifications);
}

export function* onFetchSeenNotificationsStart() {
    yield takeLatest(NOTIFICATION_ACTION_TYPES.FETCH_SEEN_NOTIFICATIONS_START, fetchSeenNotifications);
}

export function* notificationSagas() {
    yield all([call(onMarkAsSeenNotificationStart), call(onFetchOfflineUnseenNotificationsStart), call(onFetchSeenNotificationsStart)]);
}