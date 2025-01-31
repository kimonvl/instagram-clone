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