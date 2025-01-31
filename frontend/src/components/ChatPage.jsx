import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { selectExistingConversations, selectPotentialConversation, selectSelectedConversation } from "@/store/chat/chat.selector";
import { useEffect, useState } from "react";
import { clearPotentialConversation, sendMessageStart } from "@/store/chat/chat.action";
import { selectCurrentUser } from "@/store/user/user.selector";

const ChatPage = () => {
    const dispatch = useDispatch();
    const existingConversations = useSelector(selectExistingConversations);
    const selectedConversation = useSelector(selectSelectedConversation);
    const potentialConversation = useSelector(selectPotentialConversation);
    const currentUser = useSelector(selectCurrentUser);

    const [message, setMessage] = useState("");

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const joinedObj = potentialConversation ? { ...potentialConversation, type: "potential" } : { selectedConversation, type: "selected" };

    let activeConversation;
    if(selectedConversation || potentialConversation) {
        activeConversation = joinedObj.type == "potential" ? {
            recieverId: potentialConversation.recieverId,
            recieverImage: potentialConversation.profilePicture,
            recieverUsername: potentialConversation.username,
            messages: []
        } : {
            recieverId: selectedConversation.participants.find((participant) => participant._id != currentUser._id)._id,
            recieverImage: selectedConversation.participants.find((participant) => participant._id != currentUser._id).profilePicture,
            recieverUsername: selectedConversation.participants.find((participant) => participant._id != currentUser._id).username,
            messages: selectedConversation.messages,
        }
    } else {
        activeConversation = null;
    }

    useEffect(() => {
        return () => {
            dispatch(clearPotentialConversation());
        };
    }, [dispatch]);

    const sendMessageHnadler = () => {
        //dispatch sending the message
        console.log("sending message to ", activeConversation.recieverId);
        dispatch(sendMessageStart(activeConversation.recieverId, message));
        setMessage("");
    }

    return (
        <div className="flex ml-[16%] h-screen">
            <section className="w-full md:w-1/4 my-8">
                <h1 className="font-bold mb-4 px-3 text-xl">{currentUser?.username}</h1>
                <hr className="mb-4 border-gray-300" />
                <div className="overflow-y-auto h-[80vh]">
                    {
                        potentialConversation && (
                            <div className="flex gap-3 items-center p-3 bg-gray-100 cursor-pointer">
                                <Avatar className="w-14 h-14">
                                    <AvatarImage src={potentialConversation.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium">{potentialConversation.username}</span>
                                </div>
                            </div>
                        )
                    }
                    {
                        existingConversations && existingConversations.map((conversation) => {
                            const otherParticipant = conversation.participants.find((participant) => participant._id != currentUser._id)
                            return (
                                <div className={`flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer ${conversation._id == selectedConversation._id ? 'bg-gray-100' : ''}`}>
                                    <Avatar className="w-14 h-14">
                                        <AvatarImage src={otherParticipant?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{otherParticipant?.username}</span>
                                        <span className={`text-sm font-bold ${true ? 'text-green-600' : 'text-red-600'}`}>{true ? 'online' : offline}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            {
                activeConversation ? (
                    <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
                        <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
                            <Avatar>
                                <AvatarImage src={activeConversation.recieverImage} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span>{activeConversation.recieverUsername}</span>
                            </div>
                        </div>
                        <Messages friendId={activeConversation.recieverId} friendImage={activeConversation.recieverImage} friendUsername={activeConversation.recieverUsername} messages={activeConversation.messages}/>
                        <div className="flex items-center p-4 border-t border-t-gray-300">
                            <Input value={message} onChange={handleMessageChange} type="text" className="flex-1 mr-2 focus-visible:ring-transparent" placeholder="Messages...." />
                            <Button onClick={sendMessageHnadler}>Send</Button>
                        </div>
                    </section>) : (
                    <div className="flex flex-col items-center justify-center mx-auto">
                        <MessageCircle className="w-32 h-32 my-4" />
                        <h1 className="font-medium">Your messages</h1>
                        <span>Send a message to start a chat</span>
                    </div>
                )
            }

        </div>
    )
}

export default ChatPage;