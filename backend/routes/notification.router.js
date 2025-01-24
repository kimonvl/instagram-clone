import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getOfflineUnseenLikeNotifications, markAsSeenLikeNotifications } from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.route('/markasseenlikenot').post(isAuthenticated, markAsSeenLikeNotifications);
notificationRouter.route('/getofflineunseenlikenot').post(isAuthenticated, getOfflineUnseenLikeNotifications);

export default notificationRouter;
