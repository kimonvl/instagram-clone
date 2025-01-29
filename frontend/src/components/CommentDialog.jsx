import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedPost } from '@/store/post/post.selector'
import { createCommentStart, editCommentStart } from '@/store/comment/comment.action'
import { selectCurrentUser } from '@/store/user/user.selector'
import EditPost from './EditPost'
import DeletePost from './DeletePost'

const CommentDialog = ({ openCommentDialog, setOpenCommentDialog }) => {
    const dispatch = useDispatch();
    const selectedPost = useSelector(selectSelectedPost);
    const currentUser = useSelector(selectCurrentUser);

    const [commentText, setCommentText] = useState("");
    const [commentId, setCommentId] = useState("");
    const [editCommentFlag, setEditCommentFlag] = useState(false);
    const [editPostOpen, setEditPostOpen] = useState(false);
    const [deletePostOpen, setDeletePostOpen] = useState(false);

    useEffect(() => {
        if(!selectedPost) {
            setOpenCommentDialog(false);
        }
    }, [selectedPost])

    const handleCommentTextChange = (e) => {
        setCommentText(e.target.value);
    }

    const sendComment = () => {
        if (commentText.trim()) {
            dispatch(createCommentStart(selectedPost._id, commentText.trim(), true));
            setCommentText("");
        }
    }

    const editComment = () => {
        if (commentText.trim()) {
            dispatch(editCommentStart(selectedPost._id, commentId, commentText.trim()));
            setCommentText("");
        }
    }


    return (
        <Dialog  open={openCommentDialog}>
            <DialogContent onInteractOutside={() => setOpenCommentDialog(false)} className="max-w-5xl p-0 flex flex-col">
                <div className='flex flex-1'>
                    <div className='w-1/2'>
                        <img
                            src={selectedPost?.image}
                            alt=""
                            className='w-full h-full object-cover rounded-l-lg'
                        />
                    </div>
                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex items-center gap-3'>
                                <Link>
                                    <Avatar>
                                        <AvatarImage src={selectedPost?.author.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='fonst-semibold text-xs'>{selectedPost?.author.username}</Link>
                                </div>

                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center">
                                    {
                                        
                                        currentUser._id == selectedPost?.author._id ?
                                            (
                                                <div>
                                                    <div onClick={() => setEditPostOpen(true)} className='cursor-pointer w-full font-bold'>Edit</div>
                                                    <div onClick={() => setDeletePostOpen(true)} className='my-1 cursor-pointer text-[#ED4956] font-bold w-full'>Delete</div>
                                                </div>
                                            ) :
                                            (
                                                <div>
                                                    <div className='cursor-pointer w-full text-[#ED4956] font-bold'>Unfollow</div>
                                                    <div className='cursor-pointer w-full'>Add to favourites</div>
                                                </div>
                                            )
                                    }
                                </DialogContent>
                            </Dialog>
                            <EditPost editPostOpen={editPostOpen} setEditPostOpen={setEditPostOpen} post={selectedPost}/>
                            <DeletePost deletePostOpen={deletePostOpen} setDeletePostOpen={setDeletePostOpen} postId={selectedPost?._id} setOpenCommentDialog={setOpenCommentDialog}/>
                        </div>
                        <div className='mb-2 px-4 w-full break-words'>{selectedPost?.caption}</div>
                        <hr />
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            {
                                selectedPost && selectedPost.comments.map((comment) => <Comment key={comment._id} comment={comment} setEditCommentFlag={setEditCommentFlag} setCommentText={setCommentText} setCommentId={setCommentId} />)
                            }


                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <input value={commentText} onChange={handleCommentTextChange} type="text" placeholder='Add a comment here' className='w-full outline-none border text-sm border-gray-300 p-2 rounded' />
                                {
                                    editCommentFlag ? (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    editComment(); // Update the comment
                                                    setEditCommentFlag(false); // Reset edit flag
                                                    setCommentId("");
                                                }}
                                                variant="outline"
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setEditCommentFlag(false)
                                                    setCommentText("");
                                                    setCommentId("");
                                                }}
                                                variant="ghost"
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button onClick={sendComment} variant="outline">Send</Button>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog