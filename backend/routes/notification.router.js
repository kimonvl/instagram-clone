import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getOfflineUnseenNotifications, getSeenNotifications, markAsSeenNotifications } from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.route('/markasseennot').post(isAuthenticated, markAsSeenNotifications);
notificationRouter.route('/getofflineunseennot').post(isAuthenticated, getOfflineUnseenNotifications);
notificationRouter.route('/getseennot').post(isAuthenticated, getSeenNotifications);

export default notificationRouter;
