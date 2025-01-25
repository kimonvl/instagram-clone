import USER_ACTION_TYPES from "../user/user.types";
import NOTIFICATION_ACTION_TYPES from "./notification.types";

const NOTIFICATION_INITIAL_STATE = {
    unseenNotifications: [],
    unseenNotificationsForView: [],
    seenNotifications: [],
    error: null
}

const notificationReducer = (state = NOTIFICATION_INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case NOTIFICATION_ACTION_TYPES.ADD_NEW_NOTIFICATION:
            return {
                ...state,
                unseenNotifications: [...state.unseenNotifications, payload],
                unseenNotificationsForView: [...state.unseenNotificationsForView, payload],
            };
        case NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                unseenNotifications: []
            };
        case NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_NOTIFICATIONS_FAILED:
            return {
                ...state,
                error: payload
            };
        case NOTIFICATION_ACTION_TYPES.FETCH_OFFLINE_UNSEEN_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                unseenNotifications: [...state.unseenNotifications, ...payload],
                unseenNotificationsForView: [...state.unseenNotificationsForView, ...payload],
            };
        case NOTIFICATION_ACTION_TYPES.FETCH_OFFLINE_UNSEEN_NOTIFICATIONS_FAILED:
            return {
                ...state,
                error: payload
            };
        case NOTIFICATION_ACTION_TYPES.FETCH_SEEN_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                seenNotifications: payload,
            };
        case NOTIFICATION_ACTION_TYPES.FETCH_SEEN_NOTIFICATIONS_FAILED:
            return {
                ...state,
                error: payload
            };
        case NOTIFICATION_ACTION_TYPES.CLEAR_UNSEEN_NOTIFICATION_FOR_VIEW:
            return {
                ...state,
                unseenNotificationsForView: [],
            };
        case USER_ACTION_TYPES.LOGOUT_SUCCESS:
            return NOTIFICATION_INITIAL_STATE;
    
        default:
            return state;
    }
}

export default notificationReducer;