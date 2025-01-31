import USER_ACTION_TYPES from "../user/user.types";
import CHAT_ACTION_TYPES from "./chat.types";

const CHAT_INITIAL_STATE = {
    selectedConversation: null,
    loadingSelectedConversation: false,
    existingCnversations: [],
    loadingExistingConversations: false,
    loadingSendMessage: false,
    potentialConversation: null,
}

export const chatReducer = (state = CHAT_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CHAT_ACTION_TYPES.FETCH_SELECTED_CONVERSATION_START:
            return {
                ...state,
                loadingSelectedConversation: true,
            }
        case CHAT_ACTION_TYPES.FETCH_SELECTED_CONVERSATION_SUCCESS:
            return {
                ...state,
                loadingSelectedConversation: false,
                selectedConversation: payload,
            }
        case CHAT_ACTION_TYPES.FETCH_SELECTED_CONVERSATION_FAILED:
            return {
                ...state,
                loadingSelectedConversation: false,
                error: payload,
            }
        case CHAT_ACTION_TYPES.SEND_MESSAGE_START:
            return {
                ...state,
                loadingSendMessage: true,
            }
        case CHAT_ACTION_TYPES.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loadingSendMessage: false,
            }
        case CHAT_ACTION_TYPES.SEND_MESSAGE_FAILED:
            return {
                ...state,
                loadingSendMessage: false,
                error: payload,
            }
        case CHAT_ACTION_TYPES.ADD_POTENTIAL_CONVERSATION:
            return {
                ...state,
                potentialConversation: payload,
            }
        case CHAT_ACTION_TYPES.CLEAR_POTENTIAL_CONVERSATION:
            return {
                ...state,
                potentialConversation: null,
            }
        case CHAT_ACTION_TYPES.CLEAR_SELECTED_CONVERSATION:
            return {
                ...state,
                selectedConversation: null,
            }
        case CHAT_ACTION_TYPES.ADD_MESSAGE_TO_SELECTED_CONVERSATION:
            return {
                ...state,
                selectedConversation: {
                    ...state.selectedConversation,
                    messages: [...state.selectedConversation.messages, payload],
                }
            }
        case USER_ACTION_TYPES.LOGIN_SUCCESS:
            return CHAT_INITIAL_STATE;

        default:
            return state;
    }
}