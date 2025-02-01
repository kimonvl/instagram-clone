import mongoose from "mongoose";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const recieverId = req.params.id;
        const { message } = req.body;

        if(senderId === recieverId) return res.status(400).json({message:"Cannot send a message to your self", success: false});

        if(!message) return res.status(400).json({message:"Text is missing", success: false});

        //retrieve the conversation
        let newConv = false;
        let conversation = await Conversation.findOne({ participants: { $all: [senderId, recieverId] } });
        //initiate conversation if doesnt exist
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, recieverId]
            });
            newConv = true;
        }

        const newMessage = await Message.create({
            sender: senderId,
            reciever: recieverId,
            conversation: conversation._id,
            message
        });

        if(newMessage) conversation.messages.push(newMessage._id);

        await conversation.save();

        //implement websocket for real time notification
        // Check if the receiver is online
        const receiverSocketId = getRecieverSocketId(newMessage.reciever.toString());
        if (receiverSocketId) {
            // Emit the notification directly as the populated object
            io.to(receiverSocketId).emit("newMessage", newMessage.toObject());
        } else {
            console.log("Receiver is not online, message stored in DB");
        }

        return res.status(200).json({
            success: true,
            message: newMessage,
            conversation: newConv ? conversation : null,
        });

    } catch (error) {
        console.log(error);
    }
}

export const getConversation = async (req, res) => {
    try {
        const senderId = req.id;
        const recieverId = req.params.id;

        const conversation = await Conversation.findOne({participants:{$all:[senderId, recieverId]}})
        .populate({path:"messages", select:"message sender"})
        .populate({path:"participants", select:"username profilePicture"});
        if(!conversation) return res.status(200).json({message:"empty conversation", success:true, conversation:{}});

        return res.status(200).json({
            success: true,
            conversation
        }); 
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message:"Error while fetching conversation"
        }); 
    }
}

export const getExistingConversations = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.id); // Ensure ObjectId

        const conversations = await Conversation.aggregate([
            // Step 1: Match conversations where the user is a participant
            { $match: { participants: userId } },

            // Step 2: Unwind the messages array to process sorting properly
            { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },

            // Step 3: Lookup messages and sort by createdAt descending (latest message first)
            {
                $lookup: {
                    from: "messages",
                    localField: "messages",
                    foreignField: "_id",
                    as: "messageDetails"
                }
            },

            { $unwind: { path: "$messageDetails", preserveNullAndEmptyArrays: true } },

            { $sort: { "messageDetails.createdAt": -1 } }, // Sort messages by latest first

            // Step 4: Group back to keep only the latest message per conversation
            {
                $group: {
                    _id: "$_id",
                    participants: { $first: "$participants" }, // Keep the same participants array
                    lastMessage: { $first: "$messageDetails" } // Only keep the latest message
                }
            },

            // Step 5: Populate participants
            {
                $lookup: {
                    from: "users",
                    localField: "participants",
                    foreignField: "_id",
                    as: "participants"
                }
            },

            // Step 6: Return only required fields
            {
                $project: {
                    _id: 1,
                    participants: {
                        _id: 1,
                        username: 1,
                        profilePicture: 1
                    },
                    lastMessage: {
                        _id: "$lastMessage._id",
                        message: "$lastMessage.message",
                        sender: "$lastMessage.sender",
                        createdAt: "$lastMessage.createdAt"
                    }
                }
            }
        ]);

        if(!conversations) {
            return res.status(200).json({
                success: true,
                message: "No existing conversations found",
                conversations: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: `${conversations.length} conversations found`,
            conversations,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message:"Error while fetching conversations"
        });
    }
}

export const getUnseenMessages = async (req, res) => {
    try {
        const userId = req.id;

        const unseenMessages = await Message.find({seen: false, reciever: userId})
        if(unseenMessages.length == 0) {
            return res.status(200).json({
                success: true,
                message: "0 unseen messages found",
                unseenMessages,
            });
        }

        return res.status(200).json({
            success: true,
            message: `${unseenMessages.length} unseen messages found`,
            unseenMessages,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message:"Error while fetching unseen messages",
        });
    }
}

export const markAsSeenMessages = async (req, res) => {
    try {
        const userId = req.id;
        const convId = req.params.id;

        const result = await Message.updateMany({reciever: userId, conversation: convId, seen: false},
            {$set: {seen: true}}
        )

        if(result) {
            return res.status(200).json({
                success: true,
                message: "Messages marked as seen",
            });
        }else {
            return res.status(400).json({
                success: false,
                message: "Messages not found",
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message:"Error while marking messages as seen",
        });
    }
}