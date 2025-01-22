import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart } from 'react-icons/fa'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/store/user/user.selector'

const Post = ({post}) => {
    const user = useSelector(selectCurrentUser);
    const postAuthorUsername = post.author.username;
    const postAuthorImage = post.author.profilePicture;
    const postImage = post.image;
    const postLikes = post.likes.length;
    const postCaption = post.caption;
    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={postAuthorImage} alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex items-center gap-3'>
                        <h1>{postAuthorUsername}</h1>
                        {
                            user && user.username == postAuthorUsername && <Badge variant="secondary">Author</Badge>
                        }
                        
                    </div>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                        <Button variant="ghost" className="cursot-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
                        <Button variant="ghost" className="cursot-pointer w-fit">Delete</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <img
                className='rounded-sm my-2 w-full aspect-square object-cover'
                src={postImage}
                alt="post_image"
            />

            <div className='flex items-center justify-between my-2'>
                <div className='flex items-center gap-3'>
                    <FaHeart size={'24'} />

                    <MessageCircle 
                    className='cursor-pointer hover:text-gray-600'
                    />
                    <Send className='cursor-pointer hover:text-gray-600'/>
                </div>
                <Bookmark className='cursor-pointer hover:text-gray-600'/>
            </div>
            <span className='font-medium block mb-2'>{`${postLikes} Likes`} </span>
            <p>
                <span className='font-medium mr-2'>{postAuthorUsername}</span>
                {postCaption}
            </p>
            <span className='cursor-pointer text-sm text-gray-400'>
                View All comments
            </span>

            <div className='flex items-center justify-between'>
                <input
                    type="text"
                    placeholder='Add a comment...'
                    className='outline-none text-sm w-full'
                />
                <span className='text-[#3BADF8] cursor-pointer'>Post</span>

            </div>
        </div>
    )
}

export default Post