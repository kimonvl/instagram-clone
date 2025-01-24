import NOTIFICATION_ACTION_TYPES from "./notification.types";

const NOTIFICATION_INITIAL_STATE = {
    unseenLikeNotifications: [],
    error: null
}

const notificationReducer = (state = NOTIFICATION_INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case NOTIFICATION_ACTION_TYPES.ADD_NEW_LIKE_NOTIFICATION:
            return {
                ...state,
                unseenLikeNotifications: [...state.unseenLikeNotifications, payload]
            };
        case NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_LIKE_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                unseenLikeNotifications: []
            };
        case NOTIFICATION_ACTION_TYPES.MARK_AS_SEEN_LIKE_NOTIFICATIONS_FAILED:
            return {
                ...state,
                error: payload
            };
        case NOTIFICATION_ACTION_TYPES.FETCH_OFFLINE_UNSEEN_LIKE_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                unseenLikeNotifications: [...state.unseenLikeNotifications, ...payload]
            };
        case NOTIFICATION_ACTION_TYPES.FETCH_OFFLINE_UNSEEN_LIKE_NOTIFICATIONS_FAILED:
            return {
                ...state,
                error: payload
            };
    
        default:
            return state;
    }
}

export default notificationReducer;