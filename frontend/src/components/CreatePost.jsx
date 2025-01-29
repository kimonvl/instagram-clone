import React, { useRef } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '@/store/user/user.selector'
import { useState } from 'react'
import { createPostStart } from '@/store/post/post.action'
import { selectLoadingCreatePost } from '@/store/post/post.selector'

const CreatePost = ({ open, setOpen }) => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const imageRef = useRef();

    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [file, setFile] = useState("");
    //replace the loading with redux state var
    const loading = useSelector(selectLoadingCreatePost);
    const imageChangeHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result); // Update preview
            };
            reader.readAsDataURL(file); // Convert file to a base64 URL
        }
    };

    const createPostHandler = () => {
        const formData = new FormData();
        formData.append("caption", caption);
        if (imagePreview) formData.append("image", file);
        dispatch(createPostStart(formData, setOpen));
        setCaption("");
        setImagePreview("");
        setFile("");
    }

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="text-center font-semibold">Create new post</DialogHeader>
                <div className='flex items-center gap-3'>
                    <Avatar>
                        <AvatarImage src={currentUser?.profilePicture} alt="img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>{currentUser?.username}</h1>
                        <span className='text-gray-600 text-xs'>{currentUser?.bio}</span>
                    </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write your caption here ..." />
                {
                    imagePreview && (
                        <div className='w-full h-64 items-center justify-center'>
                            <img src={imagePreview} alt="post_image_preview" className='object-cover h-full w-full rounded-md' />
                        </div>
                    )
                }
                <input ref={imageRef} type="file" className='hidden' onChange={imageChangeHandler} />
                <Button onClick={() => imageRef.current.click()} className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]">Select from computer</Button>
                {
                    imagePreview && (
                        loading ? (
                            <Button>
                                <Loader2 />
                                Please wait
                            </Button>
                        ) : (
                            <Button onClick={createPostHandler}>Post</Button>
                        )
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost