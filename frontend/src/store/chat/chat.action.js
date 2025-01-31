import { createAction } from "@/utils/reducer/reducer.utils"
import CHAT_ACTION_TYPES from "./chat.types"

export const fetchSelectedConversationStart = (otherId) => {
    return createAction(CHAT_ACTION_TYPES.FETCH_SELECTED_CONVERSATION_START, otherId);
}

export const fetchSelectedConversationSuccess = (conversation) => {
    return createAction(CHAT_ACTION_TYPES.FETCH_SELECTED_CONVERSATION_SUCCESS, conversation);
}

export const fetchSelectedConversationFailed = (error) => {
    return createAction(CHAT_ACTION_TYPES.FETCH_SELECTED_CONVERSATION_FAILED, error);
}

export const fetchExistingConversationsStart = () => {
    return createAction(CHAT_ACTION_TYPES.FETCH_EXISTING_CONVERSATIONS_START);
}

export const fetchExistingConversationsSuccess = (conversations) => {
    return createAction(CHAT_ACTION_TYPES.FETCH_EXISTING_CONVERSATIONS_SUCCESS, conversations);
}

export const fetchExistingConversationsFailed = (error) => {
    return createAction(CHAT_ACTION_TYPES.FETCH_EXISTING_CONVERSATIONS_FAILED, error);
}

export const sendMessageStart = (recieverId, messageText) => {
    return createAction(CHAT_ACTION_TYPES.SEND_MESSAGE_START, { recieverId, messageText });
}

export const sendMessageSuccess = () => {
    return createAction(CHAT_ACTION_TYPES.SEND_MESSAGE_SUCCESS);
}

export const sendMessageFailed = (error) => {
    return createAction(CHAT_ACTION_TYPES.SEND_MESSAGE_FAILED, error);
}

export const addPotentialConversation = (recieverId, username, profilePicture) => {
    return createAction(CHAT_ACTION_TYPES.ADD_POTENTIAL_CONVERSATION, { recieverId, username, profilePicture });
}

export const addToExistingConversations = (conversation) => {
    return createAction(CHAT_ACTION_TYPES.ADD_TO_EXISTING_CONVERSATIONS, conversation);
}

export const clearPotentialConversation = () => {
    return createAction(CHAT_ACTION_TYPES.CLEAR_POTENTIAL_CONVERSATION);
}

export const clearSelectedConversation = () => {
    return createAction(CHAT_ACTION_TYPES.CLEAR_SELECTED_CONVERSATION);
}

export const addMessageToSelectedConversation = (_id, sender, message) => {
    return createAction(CHAT_ACTION_TYPES.ADD_MESSAGE_TO_SELECTED_CONVERSATION, { _id, sender, message });
}