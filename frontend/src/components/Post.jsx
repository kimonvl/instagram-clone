import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart } from 'react-icons/fa'
import { Badge } from './ui/badge'

const Post = () => {
    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex items-center gap-3'>
                        <h1>Username</h1>
                        <Badge variant="secondary">Author</Badge>
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
                src="https://res.cloudinary.com/dsvnmjmve/image/upload/v1736430625/zwds6ccsaful8lqsuuvr.jpg"
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
            <span className='font-medium block mb-2'>24 Likes</span>
            <p>
                <span className='font-medium mr-2'>Username</span>
                Caption
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