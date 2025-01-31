import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const followNotificationSchema = new Schema(
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
        seen: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'follow',
            immutable: true, // Makes the field immutable
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const FollowNotification = model('FollowNotification', followNotificationSchema);

export default FollowNotification;
