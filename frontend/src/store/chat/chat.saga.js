import { all, call, put, select, takeLatest } from "redux-saga/effects";
import CHAT_ACTION_TYPES from "./chat.types";
import { addMessageToSelectedConversation, addPotentialConversation, clearPotentialConversation, fetchSelectedConversationFailed, fetchSelectedConversationStart, fetchSelectedConversationSuccess, sendMessageSuccess } from "./chat.action";
import { selectSelectedProfile } from "../user/user.selector";
import { toast } from "sonner";
import { sendAxiosPostJson } from "@/utils/api-requests/axios.utils";

export function* fetchConversation(action) {
    try {
        const {_id, username, profilePicture} = yield select(selectSelectedProfile);
        
        const res = yield call(sendAxiosPostJson, `message/getconversation/${action.payload}`);
        if(res && res.data.success) {
            const conversation = res.data.conversation;
            console.log("chat saga ", conversation);
            if(conversation && Object.keys(conversation).length > 0){
                yield put(fetchSelectedConversationSuccess(conversation));
            } else {
                yield put(addPotentialConversation(_id, username, profilePicture));
            }
            toast.success(res.data.message);
        }
    } catch (error) {
        yield put(fetchSelectedConversationFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* sendMessage(action) {
    const {recieverId, messageText} = action.payload;
    console.log("sending message saga", messageText);
    try {        
        const res = yield call(sendAxiosPostJson, `message/sendmessage/${recieverId}`, {message: messageText});
        if(res && res.data.success) {
            const conversation = res.data.conversation;
            const message = res.data.message;
            console.log("chat saga ", conversation);
            if(conversation && Object.keys(conversation).length > 0){
                yield put(sendMessageSuccess());
                yield put(fetchSelectedConversationStart(recieverId));
                yield put(clearPotentialConversation());
            } else {
                yield put(addMessageToSelectedConversation(message._id, message.sender, message.message));
            }
            toast.success("Message sent successfully");
        }
    } catch (error) {
        yield put(fetchSelectedConversationFailed(error));
        toast.error(error.response.data.message);
    }
}

export function* onFetchSelectedConversation() {
    yield takeLatest(CHAT_ACTION_TYPES.FETCH_SELECTED_CONVERSATION_START, fetchConversation);
}

export function* onSendMessage() {
    yield takeLatest(CHAT_ACTION_TYPES.SEND_MESSAGE_START, sendMessage);
}

export function* chatSagas() {
    yield all([call(onFetchSelectedConversation), call(onSendMessage)]);
}