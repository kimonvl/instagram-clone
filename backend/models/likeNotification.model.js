import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const likeNotificationSchema = new Schema(
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
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
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

const LikeNotification = model('LikeNotification', likeNotificationSchema);

export default LikeNotification;
