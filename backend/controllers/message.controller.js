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
        let conversation = await Conversation.findOne({ participants: { $all: [senderId, recieverId] } });
        //initiate conversation if doesnt exist
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, recieverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            recieverId,
            message
        });

        if(newMessage) conversation.messages.push(newMessage._id);

        await conversation.save();

        //implement websocket for real time notification

        return res.status(200).json({
            success: true,
            newMessage
        });

    } catch (error) {
        console.log(error);
    }
}

export const getConversation = async (req, res) => {
    try {
        const senderId = req.id;
        const recieverId = req.params.id;

        const conversation = await Conversation.find({participants:{$all:[senderId, recieverId]}}).populate({path:"messages", select:"message"});
        if(!conversation) return res.status(200).json({message:"empty conversation", success:false, conversation:{}});

        return res.status(200).json({
            success: true,
            conversation
        }); 
    } catch (error) {
        console.log(error);
    }
}