
const LikeNotification = ({ username, userImage }) => {
    return (
        <div className="p-3 border rounded-lg shadow-sm flex items-center gap-4">
            <img
                src={userImage}
                alt={username}
                className="w-10 h-10 rounded-full"
            />
            <div className="flex-grow">
                <p className="text-sm">
                    <strong>{username}</strong> liked your post.
                </p>
            </div>
        </div>
    );
};

export default LikeNotification;
