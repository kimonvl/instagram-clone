import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

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