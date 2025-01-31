import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/user/user.selector";

const Messages = ({ friendId, friendUsername, friendImage, messages }) => {
    const currentUser = useSelector(selectCurrentUser);
    return (
        <div className="overflow-y-auto flex-1 p-4">
            <div className="flex justify-center">
                <div className="flex flex-col items-center justify-center">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={friendImage}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{friendUsername}</span>
                    <Link to={`/profile/${friendId}`}><Button className="h-8 my-2">View profile</Button></Link>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {
                    messages.map((msg) => {
                        return (
                            <div className={`flex ${msg.sender == currentUser._id ? 'justify-end' : 'justify-sart'}`}>
                                <div className={`p-2 rounded-2xl max-w-xs break-words ${msg.sender == currentUser._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    {msg.message}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Messages;