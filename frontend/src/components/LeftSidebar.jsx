import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/store/user/user.selector'



const LeftSidebar = () => {
    const user = useSelector(selectCurrentUser);

    const sidebarItems = [
        {icon: <Home/>, text: "Home"},
        {icon: <Search/>, text: "Search"},
        {icon: <TrendingUp/>, text: "Explore"},
        {icon: <MessageCircle/>, text: "Messages"},
        {icon: <Heart/>, text: "Notifications"},
        {icon: <PlusSquare/>, text: "Create"},
        {
            icon:(
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        {icon: <LogOut/>, text: "Logout"},
    ];
    return (
    <div className='fixed top-0 z-10 px-4 border-r border-gray-300 w-[16%] h-screen'>
        <div className='flex flex-col'>
            <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
            <div>
                {
                    sidebarItems.map((item, index) => {
                        return(
                            <div className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3' key={index}>
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
    )
}

export default LeftSidebar