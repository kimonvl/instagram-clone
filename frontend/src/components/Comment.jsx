import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { MoreVertical } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '@/store/user/user.selector'
import { deleteCommentStart } from '@/store/comment/comment.action'

const Comment = ({ comment , setEditCommentFlag, setCommentText, setCommentId}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        setCommentId(comment._id);
        setEditCommentFlag(true);
        setCommentText(comment.text);
        setOpen(false);
    }

    const handleDelete = () => {
        //delete action
        dispatch(deleteCommentStart(comment.post, comment._id));
        setOpen(false);
    }
    return (
        <div className='my-2'>
            <div className='flex gap-3 items-center'>
                <Avatar>
                    <AvatarImage src={comment.author.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className='font-bold text-sm'>
                    {comment.author.username} <span className='font-normal pl-1'>{comment.text}</span>
                </h1>
                {
                    currentUser._id == comment.author._id && (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <MoreVertical className='cursor-pointer' />
                            </DialogTrigger>
                            <DialogContent
                                className="w-1/2 max-w-screen-lg p-4 flex flex-col items-start text-sm text-center"
                            >
                                <div className="w-full flex flex-col gap-2">
                                    <Button onClick={handleEdit} variant="ghost" className="cursor-pointer w-full text-[#ED4956] font-bold">Edit</Button>
                                    <Button onClick={handleDelete} variant="ghost" className="cursor-pointer w-full">Delete</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )
                }

            </div>
        </div>
    )
}

export default Comment
