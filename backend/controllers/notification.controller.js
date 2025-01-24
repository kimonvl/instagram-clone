import LikeNotification from "../models/likeNotification.model.js";

export const markAsSeenLikeNotifications = async (req, res) => {
    const notificationIds = req.body;
    console.log("markasseen", req.body);
    //implement mark as seen like notification and possibly move create notification to this file from likePost
    try {
        const result = await LikeNotification.updateMany(
            { _id: { $in: notificationIds } },
            { $set: { seen: true } }
        );

        if (result && result.acknowledged) {
            return res.status(200).json({
                message: "Notifications marked as seen",
                success: true,
            });
        } else {
            return res.status(400).json({
                message: "Notifications not marked as seen",
                success: false,
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Notifications not marked as seen",
            success: false,
        });
    }
}

export const getOfflineUnseenLikeNotifications = async (req, res) => {
    const recieverId = req.id;
    try {
        const notifications = await LikeNotification.find({receiverId: recieverId, seen: false});
        if(notifications.length == 0) {
            return res.status(200).json({
                message: "0 notifications",
                success: true,
                notifications
            });
        } else {
            return res.status(200).json({
                message: `${notifications.length} notifications`,
                success: true,
                notifications
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Failed to fetch notifications",
            success: false,
        });
    }
}