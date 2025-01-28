import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CommentNotification = ({ username, userImage }) => {
    return (
        <div className="p-3 border rounded-lg shadow-sm flex items-center gap-4">
            <Avatar className='w-6 h-6'>
                <AvatarImage src={userImage} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                <p className="text-sm">
                    <strong>{username}</strong> commented your post.
                </p>
            </div>
        </div>
    );
};

export default CommentNotification;
