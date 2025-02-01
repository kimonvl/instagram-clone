import USER_ACTION_TYPES from "../user/user.types";
import CHAT_ACTION_TYPES from "./chat.types";

const CHAT_INITIAL_STATE = {
    selectedConversation: null,
    selectedConversationOpen: false,
    loadingSelectedConversation: false,
    existingConversations: [],
    loadingExistingConversations: false,
    loadingSendMessage: false,
    potentialConversation: null,
    unseenMessages: [],
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
                selectedConversationOpen: true,
                selectedConversation: payload,
            }
        case CHAT_ACTION_TYPES.FETCH_SELECTED_CONVERSATION_FAILED:
            return {
                ...state,
                loadingSelectedConversation: false,
                error: payload,
            }
        case CHAT_ACTION_TYPES.FETCH_EXISTING_CONVERSATIONS_START:
            return {
                ...state,
                loadingExistingConversations: true,
            }
        case CHAT_ACTION_TYPES.FETCH_EXISTING_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                loadingExistingConversations: false,
                existingConversations: payload,
            }
        case CHAT_ACTION_TYPES.FETCH_EXISTING_CONVERSATIONS_FAILED:
            return {
                ...state,
                loadingExistingConversations: false,
                error: payload,
            }
        case CHAT_ACTION_TYPES.FETCH_UNSEEN_MESSAGES_SUCCESS:
            return {
                ...state,
                unseenMessages: payload,
            }
        case CHAT_ACTION_TYPES.FETCH_UNSEEN_MESSAGES_FAILED:
            return {
                ...state,
                error: payload,
            }
        case CHAT_ACTION_TYPES.MARK_AS_SEEN_MESSAGES_SUCCESS:
            return {
                ...state,
                unseenMessages: state.unseenMessages.filter((msg) => msg.conversation != payload),
            }
        case CHAT_ACTION_TYPES.FETCH_UNSEEN_MESSAGES_FAILED:
            return {
                ...state,
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
        case CHAT_ACTION_TYPES.ADD_TO_EXISTING_CONVERSATIONS:
            return {
                ...state,
                existingConversations: [...state.existingConversations, payload]
            }
        case CHAT_ACTION_TYPES.CLEAR_POTENTIAL_CONVERSATION:
            return {
                ...state,
                potentialConversation: null,
            }
        case CHAT_ACTION_TYPES.CLEAR_SELECTED_CONVERSATION:
            return {
                ...state,
                selectedConversationOpen: false,
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
        case CHAT_ACTION_TYPES.RECIEVE_MESSAGE:
            return {
                ...state,
                selectedConversation: state.selectedConversation && state.selectedConversationOpen && state.selectedConversation._id == payload.conversation ?
                    {
                        ...state.selectedConversation,
                        messages: [...state.selectedConversation.messages, payload],
                    } :  state.selectedConversation,
                unseenMessages : state.selectedConversation && state.selectedConversationOpen && state.selectedConversation._id == payload.conversation ?
                    state.unseenMessages : [...state.unseenMessages, payload],
                existingConversations : state.existingConversations.map((conv) => {
                    if(conv._id == payload.conversation) {
                        return {
                            ...conv,
                            lastMessage: payload
                        }
                    } else {
                        return conv;
                    }
                })
            }
        case USER_ACTION_TYPES.LOGIN_SUCCESS:
            return CHAT_INITIAL_STATE;

        default:
            return state;
    }
}