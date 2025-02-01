import { createSelector } from "reselect";

const selectChatReducer = (state) => state.chat;

export const selectSelectedConversation = createSelector(
    [selectChatReducer],
    (chatSlice) => chatSlice.selectedConversation
);

export const selectExistingConversations = createSelector(
    [selectChatReducer],
    (chatSlice) => chatSlice.existingConversations
);

export const selectPotentialConversation = createSelector(
    [selectChatReducer],
    (chatSlice) => chatSlice.potentialConversation
);

export const selectLoadingSelectedConversation = createSelector(
    [selectChatReducer],
    (chatSlice) => chatSlice.loadingSelectedConversation
);

export const selectLoadingExistingConversations = createSelector(
    [selectChatReducer],
    (chatSlice) => chatSlice.loadingExistingConversations
);

export const selectLoadingSendMessage = createSelector(
    [selectChatReducer],
    (chatSlice) => chatSlice.loadingSendMessage
);

export const selectUnseenMessages = createSelector(
    [selectChatReducer],
    (chatSlice) => chatSlice.unseenMessages
);