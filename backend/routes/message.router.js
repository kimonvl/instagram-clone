
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getConversation, getExistingConversations, getUnseenMessages, markAsSeenMessages, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.route('/sendmessage/:id').post(isAuthenticated, sendMessage);
messageRouter.route('/getconversation/:id').post(isAuthenticated, getConversation);
messageRouter.route('/getexistintconversations').post(isAuthenticated, getExistingConversations);
messageRouter.route('/getunseenmessages').post(isAuthenticated, getUnseenMessages);
messageRouter.route('/markasseenmessages/:id').post(isAuthenticated, markAsSeenMessages);

export default messageRouter;
