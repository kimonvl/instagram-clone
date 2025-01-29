import mongoose from "mongoose";
import CommentNotification from "../models/commentNotification.model.js";
import LikeNotification from "../models/likeNotification.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";
import FollowNotification from "../models/followNotification.model.js";

export const markAsSeenNotifications = async (req, res) => {
    const notificationIds = req.body;
    console.log("markasseen", req.body);
    //implement mark as seen like notification and possibly move create notification to this file from likePost
    try {
        const resultLike = await LikeNotification.updateMany(
            { _id: { $in: notificationIds } },
            { $set: { seen: true } }
        );

        const resultFollow = await FollowNotification.updateMany(
            { _id: { $in: notificationIds } },
            { $set: { seen: true } }
        );

        const resultComment = await CommentNotification.updateMany(
            { _id: { $in: notificationIds } },
            { $set: { seen: true } }
        );

        if ((resultLike || resultFollow || resultComment) && (resultLike.acknowledged || resultFollow.acknowledged || resultComment.acknowledged)) {
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

export const getOfflineUnseenNotifications = async (req, res) => {
    const recieverId = req.id;
    try {
        const likeNotifications = await LikeNotification.find({ receiverId: recieverId, seen: false }).populate(
            'senderId',
            'username profilePicture'
        );

        const followNotifications = await FollowNotification.find({ receiverId: recieverId, seen: false }).populate(
            'senderId',
            'username profilePicture'
        );

        const commentNotifications = await CommentNotification.find({ receiverId: recieverId, seen: false }).populate(
            'senderId',
            'username profilePicture'
        );

        // Merge the two arrays
        const allNotifications = [...likeNotifications, ...followNotifications, ...commentNotifications];

        // Sort the combined array by createdAt in descending order
        // @ts-ignore
        const notifications = allNotifications.sort((a, b) => b.createdAt - a.createdAt);

        if (notifications.length == 0) {
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

export const getSeenNotifications = async (req, res) => {
    const recieverId = req.id;
    try {
        const likeNotifications = await LikeNotification.find({ receiverId: recieverId, seen: true }).populate(
            'senderId',
            'username profilePicture'
        );
        const followNotifications = await FollowNotification.find({ receiverId: recieverId, seen: true }).populate(
            'senderId',
            'username profilePicture'
        );
        const commentNotifications = await CommentNotification.find({ receiverId: recieverId, seen: true }).populate(
            'senderId',
            'username profilePicture'
        );

        // Merge the two arrays
        const allNotifications = [...likeNotifications, ...followNotifications, ...commentNotifications];

        // Sort the combined array by createdAt in descending order
        // @ts-ignore
        const notifications = allNotifications.sort((a, b) => b.createdAt - a.createdAt);

        if (notifications.length == 0) {
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

export const createLikeNotification = async (userId, post) => {
    try {
        const receiverId = new mongoose.Types.ObjectId(post.author.toString());
        console.log("creating notification with recieverId: ", post.author);
        const likeNotification = await LikeNotification.create({ senderId: userId, receiverId, postId: post._id });

        if (likeNotification) {
            // Populate sender details if needed
            const populatedNotification = await LikeNotification.findById(likeNotification._id).populate(
                'senderId',
                'username profilePicture'
            );

            // Check if the receiver is online
            const receiverSocketId = getRecieverSocketId(post.author.toString());
            if (receiverSocketId) {
                // Emit the notification directly as the populated object
                io.to(receiverSocketId).emit("newNotification", populatedNotification.toObject());
            } else {
                console.log("Receiver is not online, notification stored in DB");
            }
        } else {
            console.log("Failed to create and send notification");
        }
    } catch (error) {
        console.log(error);
    }

}

export const deleteLikeNotification = async (userId, post) => {
    try {
        const deleted = await LikeNotification.findOneAndDelete({ senderId: userId, receiverId: post.author, postId: post._id });

        if (deleted) {
            console.log('Notification deleted:', deleted);
        } else {
            console.log('Notification not found');
        }
    } catch (error) {
        console.log(error);
    }

}

export const createFollowNotification = async (senderId, recieverId) => {
    try {
        console.log("creating notification with recieverId: ", recieverId);
        recieverId = new mongoose.Types.ObjectId(recieverId.toString());
        const followNotification = await FollowNotification.create({ senderId, receiverId: recieverId });

        if (followNotification) {
            // Populate sender details if needed
            const populatedNotification = await FollowNotification.findById(followNotification._id).populate(
                'senderId',
                'username profilePicture'
            );

            // Check if the receiver is online
            const receiverSocketId = getRecieverSocketId(recieverId.toString());
            if (receiverSocketId) {
                // Emit the notification directly as the populated object
                io.to(receiverSocketId).emit("newNotification", populatedNotification.toObject());
            } else {
                console.log("Receiver is not online, notification stored in DB");
            }
        } else {
            console.log("Failed to create and send notification");
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteFollowNotification = async (senderId, receiverId) => {
    try {
        const deleted = await FollowNotification.findOneAndDelete({ senderId, receiverId });

        if (deleted) {
            console.log('Notification deleted:', deleted);
        } else {
            console.log('Notification not found');
        }
    } catch (error) {

    }
}

export const createCommentNotification = async (userId, receiverId, commentId) => {
    try {
        const commentNotification = await CommentNotification.create({ senderId: userId, receiverId, commentId });
        console.log("comment notification", commentNotification)
        if (commentNotification) {
            // Populate sender details if needed
            const populatedNotification = await CommentNotification.findById(commentNotification._id).populate(
                'senderId',
                'username profilePicture'
            );

            console.log("Comment notification created")

            // Check if the receiver is online
            const receiverSocketId = getRecieverSocketId(receiverId.toString());
            if (receiverSocketId) {
                // Emit the notification directly as the populated object
                io.to(receiverSocketId).emit("newNotification", populatedNotification.toObject());
            } else {
                console.log("Receiver is not online, notification stored in DB");
            }
        } else {
            console.log("Failed to create and send notification");
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteCommentNotification = async (senderId, receiverId) => {
    try {
        const deleted = await CommentNotification.findOneAndDelete({ senderId, receiverId });

        if (deleted) {
            console.log('Notification deleted:', deleted);
        } else {
            console.log('Notification not found');
        }
    } catch (error) {

    }
}