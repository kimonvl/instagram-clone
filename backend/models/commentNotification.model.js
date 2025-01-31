import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentNotificationSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reciever: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        commentId: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            required: true,
        },
        seen: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'comment',
            immutable: true, // Makes the field immutable
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const CommentNotification = model('CommentNotification', commentNotificationSchema);

export default CommentNotification;
