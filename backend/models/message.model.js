import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    message: { type: String, required: true },
    seen: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});
export const Message = mongoose.model("Message", messageSchema);