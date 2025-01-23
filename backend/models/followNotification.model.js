import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const followNotificationSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        seen: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const FollowNotification = model('FollowNotification', followNotificationSchema);

export default FollowNotification;
