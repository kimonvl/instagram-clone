import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { selectSuggestedUsers } from '@/store/user/user.selector'

const SuggestedUsers = () => {
    const suggestedUsers = useSelector(selectSuggestedUsers);

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See all</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link>
                                    <Avatar>
                                        <AvatarImage src={user.profilePicture} alt="profile_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link>{user?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{user?.bio}</span>
                                </div>
                            </div>
                            <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SuggestedUsers