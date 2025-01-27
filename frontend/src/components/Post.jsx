import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Badge } from './ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '@/store/user/user.selector'
import { dislikePostStart, fetchSelectedPostStart, likePostStart } from '@/store/post/post.action'
import { useNavigate } from 'react-router-dom'
import { createCommentStart } from '@/store/comment/comment.action'
import CommentDialog from './CommentDialog'

const Post = ({ post }) => {
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [])

    const dispatch = useDispatch();
    const postAuthorUsername = post.author.username;
    const postAuthorImage = post.author.profilePicture;
    const postImage = post.image;
    const postLikes = post.likes.length;
    const postCaption = post.caption;
    const postId = post?._id;
    const postComments = post?.comments;

    const [liked, setLiked] = useState(post.likes.includes(user?._id) ? true : false);
    const [commentText, setCommentText] = useState('');
    const [openCommentDialog, setOpenCommentDialog] = useState(false);

    const handleOpenCommentDialog = () => {
        dispatch(fetchSelectedPostStart(postId));
        setOpenCommentDialog(true);
    }

    const handleChangeCommentText = (e) => {
        setCommentText(e.target.value);
    }

    const likeOrDislikeHandler = () => {
        if (liked) {
            dispatch(dislikePostStart(postId));
            setLiked(false);
        } else {
            dispatch(likePostStart(postId));
            setLiked(true);
        }
    }

    const createCommentHandler = () => {
        if (commentText) {
            dispatch(createCommentStart(postId, commentText, false));
            setCommentText("");
        }
    }

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
                        <Button variant="ghost" className="cursot-pointer w-fit text-[#ED4956] font-bold">Add to favourites</Button>
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
                    {
                        liked ? <FaHeart onClick={likeOrDislikeHandler} size={'24'} className='cursor-pointer text-red-600' /> : <FaRegHeart onClick={likeOrDislikeHandler} size={'22px'} className='cursor-pointer hover:text-gray-600' />
                    }

                    <MessageCircle
                        onClick={handleOpenCommentDialog}
                        className='cursor-pointer hover:text-gray-600'
                    />
                    <Send className='cursor-pointer hover:text-gray-600' />
                </div>
                <Bookmark className='cursor-pointer hover:text-gray-600' />
            </div>
            <span className='font-medium block mb-2'>{`${postLikes} Likes`} </span>
            <p>
                <span className='font-medium mr-2'>{postAuthorUsername}</span>
                {postCaption}
            </p>
            {
                postComments.length > 0 && (
                    <span onClick={handleOpenCommentDialog} className='cursor-pointer text-sm text-gray-400'>View All {postComments.length} comments</span>
                )
            }

            <CommentDialog openCommentDialog={openCommentDialog} setOpenCommentDialog={setOpenCommentDialog} />

            <div className='flex items-center justify-between'>
                <input
                    type="text"
                    placeholder='Add a comment...'
                    value={commentText}
                    onChange={handleChangeCommentText}
                    className='outline-none text-sm w-full'
                />
                <span onClick={createCommentHandler} className={`text-[#3BADF8] cursor-pointer ${commentText ? '' : 'hidden'}`}>Send</span>

            </div>
        </div>
    )
}

export default Post