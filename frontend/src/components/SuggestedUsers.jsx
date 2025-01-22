import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, selectSuggestedUsers } from '@/store/user/user.selector'
import { sendFollowRequestStart, sendUnfollowRequestStart } from '@/store/user/user.action'

const SuggestedUsers = () => {
    const suggestedUsers = useSelector(selectSuggestedUsers);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const followUser = (targetUserId) => {
        dispatch(sendFollowRequestStart(targetUserId));
    }

    const unfollowUser = (targetUserId) => {
        dispatch(sendUnfollowRequestStart(targetUserId));
    }

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See all</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div key={user._id} className='flex items-center justify-between my-5'>
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
                            {
                                currentUser?.following.includes(user._id) ? 
                                    (<span onClick={() => unfollowUser(user._id)} className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Unfollow</span>) :
                                    (<span onClick={() => followUser(user._id)} className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span>)
                            }
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SuggestedUsers