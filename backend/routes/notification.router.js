import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { markAsSeenLikeNotifications } from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.route('/markasseenlikenot').post(isAuthenticated, markAsSeenLikeNotifications);

export default notificationRouter;
