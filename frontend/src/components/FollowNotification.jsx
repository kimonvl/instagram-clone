import React from 'react';

const FollowNotification = ({ username, userImage }) => {
    return (
        <div className="p-3 border rounded-lg shadow-sm flex items-center gap-4">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
                <img
                    src={userImage}
                    alt={username}
                    className="w-10 h-10 rounded-full"
                />
            </div>

            {/* Notification Message */}
            <div className="flex-grow">
                <p className="text-sm">
                    <strong>{username}</strong> started following you.
                </p>
            </div>

            {/* Follow Button */}
            <button className="px-1 py-1 text-sm text-white bg-blue-500 rounded-lg">
                Follow
            </button>
        </div>
    );
};

export default FollowNotification;
