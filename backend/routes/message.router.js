
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getConversation, getExistingConversations, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.route('/sendmessage/:id').post(isAuthenticated, sendMessage);
messageRouter.route('/getconversation/:id').post(isAuthenticated, getConversation);
messageRouter.route('/getexistintconversations').post(isAuthenticated, getExistingConversations);

export default messageRouter;
