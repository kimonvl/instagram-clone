import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const CommentDialog = ({ openCommentDialog, setOpenCommentDialog }) => {
    return (
        <Dialog open={openCommentDialog}>
            <DialogContent onInteractOutside={() => setOpenCommentDialog(false)} className="max-w-5xl p-0 flex flex-col">
                <div className='flex flex-1'>
                    <div className='w-1/2'>
                        <img
                            src="https://res.cloudinary.com/dsvnmjmve/image/upload/v1737756669/vfvepq1esvyfh4f3tsdx.jpg"
                            alt=""
                            className='w-full h-full object-cover rounded-l-lg'
                        />
                    </div>
                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex items-center gap-3'>
                                <Link>
                                    <Avatar>
                                        <AvatarImage src="https://res.cloudinary.com/dsvnmjmve/image/upload/v1737756669/vfvepq1esvyfh4f3tsdx.jpg" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='fonst-semibold text-xs'>Username</Link>
                                </div>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer'/>
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center">
                                    <div className='cursor-pointer w-full text-[#ED4956] font-bold'>Unfollow</div>
                                    <div className='cursor-pointer w-full'>Add to favourites</div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <hr />
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            <div>Cooments here</div>
                            <div>Cooments here</div>
                            <div>Cooments here</div>
                       
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <input type="text" placeholder='Add a comment here' className='w-full outline-none border text-sm border-gray-300 p-2 rounded'/>
                                <Button variant="outline">Send</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog