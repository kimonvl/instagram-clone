import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';
import { logoutUserStart } from '@/store/user/user.action';
import CreatePost from './CreatePost';
import LikeNotification from './LikeNotification';
import FollowNotification from './FollowNotification';
import { selectUnseenLikeNotifications } from '@/store/notification/notification.selector';
import { markAsSeenLikeNotificationStart } from '@/store/notification/notification.action';

const LeftSidebar = () => {
    const [open, setOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    const user = useSelector(selectCurrentUser);
    const unseenLikeNotification = useSelector(selectUnseenLikeNotifications);
    const dispatch = useDispatch();

    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ];

    const logoutHandler = () => {
        dispatch(logoutUserStart());
    };

    const handleNotificationsOpen = () => {
        setNotificationOpen((prev) => !prev);
        if(unseenLikeNotification.length > 0) {
            dispatch(markAsSeenLikeNotificationStart());
        }
    }

    const leftSidebarClickHandler = (type) => {
        switch (type) {
            case "Logout":
                logoutHandler();
                break;
            case "Create":
                setOpen(true);
                break;
            case "Notifications":
                handleNotificationsOpen();
                break;
            default:
                break;
        }
    };

    return (
        <div
            className={`fixed top-0 z-10 border-r border-gray-300 h-screen flex transition-all duration-300 ease-in-out ${notificationOpen ? 'w-[16%]' : 'w-[16%]'
                }`}
        >
            {/* Icons Section */}
            <div
                className={`flex flex-col transition-all duration-300 ease-in-out ${notificationOpen ? 'w-1/3' : 'w-full'
                    } px-4`}
            >
                <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
                <div>
                    {sidebarItems.map((item, index) => (
                        <div
                            onClick={() => leftSidebarClickHandler(item.text)}
                            className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
                            key={index}
                        >
                            {/* Render item icon with badge for Notifications */}
                            {item.text === "Notifications" ? (
                                <div className="relative w-6 h-6">
                                    {item.icon}
                                    {unseenLikeNotification.length > 0 && (
                                        <span
                                            className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center"
                                            style={{
                                                transform: 'translate(50%, -50%)',
                                            }}
                                        >
                                            {unseenLikeNotification.length}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                item.icon
                            )}
                            {/* Render item text if sidebar is open */}
                            {!notificationOpen && <span>{item.text}</span>}
                        </div>
                    ))}

                </div>
            </div>

            {/* Notifications Section */}
            <div
                className={`bg-gray-50 overflow-y-auto transition-all duration-300 ease-in-out ${notificationOpen ? 'w-2/3 opacity-100' : 'w-0 opacity-0'
                    }`}
            >
                {notificationOpen && (
                    <div className="px-4 py-6">
                        <h2 className="font-bold text-lg mb-4">Notifications</h2>
                        <div className="flex flex-col gap-3">
                            <LikeNotification username="Kimon" userImage={"https://res.cloudinary.com/dsvnmjmve/image/upload/v1737588183/c8miraf3wfikwqsoq72s.jpg"} />
                            <FollowNotification username="Kimon" userImage={"https://res.cloudinary.com/dsvnmjmve/image/upload/v1737588183/c8miraf3wfikwqsoq72s.jpg"} />
                        </div>
                    </div>
                )}
            </div>
            <CreatePost open={open} setOpen={setOpen} />
        </div>
    );
};

export default LeftSidebar;
